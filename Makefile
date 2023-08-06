#-----------------------------------------------------------
# 初期セットアップ
#-----------------------------------------------------------
start-up:
	@make build
	@make up

#-----------------------------------------------------------
# 個々のコマンド
#-----------------------------------------------------------
build:
	docker compose build

build-nc:
	docker compose build --no-cache

up:
	docker compose up -d

down:
	docker compose down

reset:
	@make down
	@make up

node:
	docker compose exec node ash

ps:
	docker compose ps