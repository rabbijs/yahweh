docker login --username $DOCKER_USER \
             --password $DOCKER_PASSWORD 

docker push anypay/yahweh:$CIRCLE_BRANCH
