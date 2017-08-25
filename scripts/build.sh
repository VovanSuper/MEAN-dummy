#!/bin/sh
echo Building mean_dummy:build

docker build --build-arg https_proxy=$https_proxy --build-arg http_proxy=$http_proxy \  
    -t vovansuper/mean_dummy:build . -f ../Dockerfile.build

docker create --name drop vovansuper/mean_dummy:build  
docker cp drop:/usr/local/bin/build ./app  
docker rm -f drop

echo Building vovansuper/mean_dummy:latest

docker build --no-cache -t vovansuper/mean_dummy:latest .  