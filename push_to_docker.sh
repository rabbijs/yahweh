docker login --username $DOCKER_USER \
             --password $DOCKER_PASSWORD 

docker push rabbijs/yahweh:$CIRCLE_BRANCH
