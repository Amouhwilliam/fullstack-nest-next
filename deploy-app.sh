docker compose -f docker-compose.prod.yml down
git pull
git reset --hard origin/main
cp .env.prod .env
cd frontend
sudo rm -rf node_modules
yarn install
yarn build
cd ../api
sudo rm -rf node_modules
yarn install
yarn build
cd ..
docker compose -f docker-compose.prod.yml up -d
