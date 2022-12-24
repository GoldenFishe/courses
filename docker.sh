docker build . -t courses
docker tag courses us-central1-docker.pkg.dev/courses-372013/courses/courses
docker push us-central1-docker.pkg.dev/courses-372013/courses/courses