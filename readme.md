# Nette Docker Starter

## Requirements
- Docker
- Docker Compose

## Setup
1. Clone the repo
2. `cd docker && docker compose up --build`
3. Visit http://localhost

## Services
| Service  | URL                    |
|----------|------------------------|
| App      | http://localhost       |
| Adminer  | http://localhost:8080  |
| MariaDB  | localhost:3306         |

## Notes
- Edit `docker/docker-compose.yml` to change DB credentials
- Debug mode is enabled by default via `NETTE_DEBUG=1`