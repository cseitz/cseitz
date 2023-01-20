#!/bin/bash

# Environment Variables
CWD=$( pwd );
REPO=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && git rev-parse --show-toplevel );
PM2_PROJECT=$PM2_PREFIX-$PROJECT

echo "building $PROJECT"
BUILD_DIR=.next-build npm run build -- --only -vvv --filter=$PROJECT

cd $REPO/$PROJECT
PWD=$( pwd );

if [ -d ".next-build" ]; then

    # Move old dist folder
    mv .next .next-old

    # Copy over the new one
    if mv .next-build .next; then
    #   Start the project
        if pm2 show $PM2_PROJECT; then
            echo "pm2: start $PM2_PROJECT"
            NODE_ENV=production pm2 restart $PM2_PROJECT --update-env
        else
            echo "pm2: initialize $PM2_PROJECT"
            cd $REPO
            pm2 start --name $PM2_PROJECT "npm run start -- --only --filter=$PROJECT"
            cd $PWD
        fi
        pm2 show $PM2_PROJECT
        rm -rf .next-old
    else
        mv .next-old .next
        exit 1
    fi

fi


# Update NGINX configuration
cd $REPO
npm run gh nginx

