#!/bin/bash

# Environment Variables
CWD=$( pwd );
REPO=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && git rev-parse --show-toplevel );
# PM2_PROJECT=$PM2_PREFIX-$PROJECT

cd $REPO/$PROJECT
if [ -d ".next-old" ]; then
    rm -rf .next-old;
fi
if [ -d ".next" ]; then
#   Move old dist folder
    mv .next .next-old
fi
cd $CWD

echo "building $PROJECT"
npm run build -- --only -vvv --filter=$PROJECT

cd $REPO/$PROJECT
PWD=$( pwd );

if [ -d ".next" ]; then
#   Start the project
    if pm2 show $PM2_NAME; then
        echo "pm2: start $PM2_NAME"
        NODE_ENV=production pm2 restart $PM2_NAME --update-env
    else
        echo "pm2: initialize $PM2_NAME"
        cd $REPO
        pm2 start --name $PM2_NAME "npm run start -- --only --filter=$PROJECT"
        cd $PWD
    fi
    pm2 show $PM2_NAME
    rm -rf .next-old
else
    mv .next-old .next;
    exit 1
fi

# if [ -d ".next-build" ]; then

#     # Move old dist folder
#     mv .next .next-old

#     # Copy over the new one
#     if mv .next-build .next; then
#     #   Start the project
#         if pm2 show $PM2_NAME; then
#             echo "pm2: start $PM2_NAME"
#             NODE_ENV=production pm2 restart $PM2_NAME --update-env
#         else
#             echo "pm2: initialize $PM2_NAME"
#             cd $REPO
#             pm2 start --name $PM2_NAME "npm run start -- --only --filter=$PROJECT"
#             cd $PWD
#         fi
#         pm2 show $PM2_NAME
#         rm -rf .next-old
#     else
#         mv .next-old .next
#         exit 1
#     fi

# fi


# Update NGINX configuration
cd $REPO
sudo npm run gh nginx

