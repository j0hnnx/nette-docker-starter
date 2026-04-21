include .env.local
export

MIGRATIONS_DIR := .docker/build/db/migrations
COMPOSE_FILE := .docker/docker-compose.yml
ENV_FILE := .env.local

.PHONY: migrate migrate-fresh up down help

help:
	@echo "Available commands:"
	@echo "  make up            - Start all containers"
	@echo "  make down          - Stop all containers"
	@echo "  make migrate       - Run all pending migrations"
	@echo "  make migrate-fresh - Drop and recreate the database, then run all migrations"

up:
	docker compose --env-file $(ENV_FILE) -f $(COMPOSE_FILE) up -d

down:
	docker compose --env-file $(ENV_FILE) -f $(COMPOSE_FILE) down

migrate:
	@echo "Running migrations..."
	@for file in $(MIGRATIONS_DIR)/*.sql; do \
		echo "Applying $$file..."; \
		docker exec -i $(CONTAINER_NAME) mariadb -u$(DB_USER) -p$(DB_PASSWORD) $(DB_NAME) < $$file; \
	done
	@echo "Migrations complete."

migrate-fresh:
	@echo "Dropping and recreating database..."
	@docker exec -i $(CONTAINER_NAME) mariadb -u$(DB_USER) -p$(DB_PASSWORD) -e "DROP DATABASE IF EXISTS $(DB_NAME); CREATE DATABASE $(DB_NAME);"
	@$(MAKE) migrate
	@echo "Fresh migration complete."