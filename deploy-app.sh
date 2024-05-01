git pull
cp .env.prod .env
<<<<<<< HEAD
docker compose -f docker-compose.prod.yml down
docker compose -f docker-compose.prod.yml up -d
=======
docker compose down
docker compose -f docker-compose.prod.yml up -d
>>>>>>> 876fc1d (provide new server)
