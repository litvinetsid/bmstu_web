.PHONY: all clean init
all: clean
	sudo docker-compose up --build

clean:
	sudo docker-compose down -v

init:
	cp .env.dist .env
