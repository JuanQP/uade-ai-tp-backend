# UADE - Aplicaciones Interactivas - TP

University project for a PC products store

Members of the team:

* **FIORDILINO**, Martín Alberto
* **QUINTEROS PARADA**, Juan Ignacio

## I just want to see the app

Everything settled up with:

```sh
docker-compose up
```

## Development

In development is necessary to have a `DATABASE_URL` env variable set to connect to a MongoDB, then you can just run it with:

```sh
npm run dev
```

## Deploy

In *production* you would need a running MongoDB, the env variable `DATABASE_URL` set and then:

```sh
npm run build
npm start
```
