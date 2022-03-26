# essas variáveis irão acelerar as compilações, para docker-compose >= 1.25
export COMPOSE_DOCKER_CLI_BUILD=1
export DOCKER_BUILDKIT=1


.PHONY: down build up
all: down docker
docker: build up

down:
	docker-compose down --remove-orphans

build:
	docker-compose build

up:
	docker-compose up -d
