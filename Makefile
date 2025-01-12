.PHONY: all clean
all: clean
	docker-compose up --build

clean:
	docker-compose down -v