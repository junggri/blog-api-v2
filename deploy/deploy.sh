aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin 583571304569.dkr.ecr.ap-northeast-2.amazonaws.com/junggri
yarn build
docker build -t blog-api .
docker tag blog-api 583571304569.dkr.ecr.ap-northeast-2.amazonaws.com/junggri:blog-api
docker push 583571304569.dkr.ecr.ap-northeast-2.amazonaws.com/junggri:blog-api
#docker-compose up
