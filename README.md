# UADE - Aplicaciones Interactivas - TP

> This project is the backend of this frontend project: [uade-ai-tp-backend](https://github.com/JuanQP/uade-ai-tp)

University project for a PC products store

This is a remake of an old university project. I've just added typescript and some minor changes to remake the frontend.

## I just want to see the app

If you want to run this app with example data, first clone this repo and then run:

```sh
docker-compose up --build
```

Then, in another terminal, when the database is up, run:

```sh
docker-compose exec backend /bin/sh -c "npm run db:seed"
```

That's all. **Next step is to run frontend**, which is just two commands as well. [Click here to see that repo](https://github.com/JuanQP/uade-ai-tp).

### Users

Now you can login with the client user `inewton@uade.edu.ar` or admin user `juanquinteros@uade.edu.ar`. In both cases the password is `A$d12345`.

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
