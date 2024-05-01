sudo docker compose -f docker-compose.prod.yml down
git pull
git reset --hard origin/main
cp .env.prod .env
cd frontend
cp .env.prod .env
sudo rm -rf node_modules
npm install
npm run build
cd ../api
sudo rm -rf node_modules
npm install
cd ..
sudo docker compose -f docker-compose.prod.yml up -d
