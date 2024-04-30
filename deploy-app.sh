git pull
cp .env.prod .env
docker compose -f docker-compose.prod.yml down
docker compose -f docker-compose.prod.yml up -d
