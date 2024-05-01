# Load nvm first to enable node, npm, npx, etc
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

docker compose -f docker-compose.prod.yml down
git pull
git reset --hard origin/main
cp .env.prod .env
cd frontend
sudo rm -rf node_modules
npm install
npm run build
cd ../api
sudo rm -rf node_modules
npm install
npm run build
cd ..
docker compose -f docker-compose.prod.yml up -d
