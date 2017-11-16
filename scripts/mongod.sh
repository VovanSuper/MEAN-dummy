#!/bin/sh

if pgrep -q mongod; then
    echo running;
else
    echo starting;
    mongod --fork --bind_ip=$IP --dbpath=data --nojournal;
fi
exit 0;
