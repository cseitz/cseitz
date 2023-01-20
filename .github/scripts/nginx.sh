#!/bin/bash

# Environment Variables
CWD=$( pwd );
REPO=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && git rev-parse --show-toplevel );
REPONAME=$( basename $REPO );

cd /etc/nginx

$OLD=/etc/nginx/old/$REPONAME

# 1. keep track of all files being replaced
# 2. copy old files over to old directory
# 3. replace files
# 4. run nginx -t
# success: reload nginx, deletec old files, store replaced file paths in .json for next deploy
# failure: bring back old files


if [ ! -d "$OLD" ]; then
    echo "backing up nginx"

    mkdir -p $OLD
    mkdir -p /etc/nginx/includes
    mkdir -p /etc/nginx/www
    if [ -d "/var/www/nginx" ]; then cp -R /var/www/nginx/* $OLD/www; fi
    if [ -d "includes" ]; then cp -R includes old-includes-$REPONAME; fi
    if [ -d "sites-enabled" ]; then mv sites-enabled old-sites-enabled; fi

else
    echo "?? nginx already backed up!"
fi





if [ ! -d "/etc/nginx/old-nginx-$REPONAME" ]; then
    echo "backing up nginx"

    mkdir -p /etc/nginx/includes
    mkdir -p /etc/nginx/www
    if [ -d "/var/www/nginx" ]; then cp -R /var/www/nginx/* /var/www/old-nginx-$REPONAME; fi
    if [ -d "includes" ]; then cp -R includes old-includes-$REPONAME; fi
    if [ -d "sites-enabled" ]; then mv sites-enabled old-sites-enabled; fi

else
    echo "?? nginx already backed up!"
fi

echo "copying nginx configuration from $REPO/.github/nginx to /var/www/nginx"
cp -R $REPO/.github/nginx/www /var/www/nginx
cp -R $REPO/.github/nginx/includes /etc/nginx/includes
cp -R $REPO/.github/nginx/sites-enabled /etc/nginx/sites-enabled
chmod 755 -R /var/www/nginx

echo "testing nginx"
if nginx -t; then
    echo "reloading nginx"
    service nginx reload
    if [ -d "/var/www/old-nginx" ]; then rm -rf /var/www/old-nginx; fi
    if [ -d "/etc/nginx/old-includes" ]; then rm -rf /etc/nginx/old-includes; fi
    if [ -d "/etc/nginx/old-sites-enabled" ]; then rm -rf /etc/nginx/old-sites-enabled; fi
else
    nginx -t
    if [ -d "/etc/nginx/www" ]; then rm -rf /etc/nginx/www; fi
    if [ -d "/etc/nginx/includes" ]; then rm -rf /etc/nginx/includes; fi
    if [ -d "/etc/nginx/sites-enabled" ]; then rm -rf /etc/nginx/sites-enabled; fi
    if [ -d "/var/www/old-nginx" ]; then mv /var/www/old-nginx /var/www/nginx; fi
    if [ -d "old-includes" ]; then mv old-includes includes; fi
    if [ -d "old-sites-enabled" ]; then mv old-sites-enabled sites-enabled; fi
    exit 1
fi

