.PHONY: all clean init
all: clean
	docker-compose up --build

clean:
	docker-compose down -v

init:
	cp .env.dist .env