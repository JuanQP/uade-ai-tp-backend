# UADE - Aplicaciones Interactivas - TP

> This project is the backend of this frontend project: [uade-ai-tp-backend](https://github.com/JuanQP/uade-ai-tp)

University project for a PC products store

This is a remake of an old university project. I've just added typescript and some minor changes to remake the frontend.

## I just want to see the app

> **First step is to build frontend**, don't worry, is easy. Just run the command mentioned in the frontend repo. [Click here to see that repo](https://github.com/JuanQP/uade-ai-tp). Go to the section *I just want to see the app*.

Once you have built the frontend, run in this repo:

```sh
docker-compose up -d
docker-compose exec backend /bin/sh -c "npm run db:seed"
```

The first command start both the backend and the db. With the second command you will populate the DB with example data.

If you want to stop the app just run:

```
docker-compose stop
```

That's all. Now you can navigate the app in `http://localhost:4000/` with this credentials 👇

### Users

Now you can login with the client user `inewton@uade.edu.ar` or admin user `juanquinteros@uade.edu.ar`. In both cases the password is `A$d12345`.

## Development

TL;DR: Just run:

```sh
npm run dev
```

Longer explanation: In development is necessary to have a `DATABASE_URL` env variable set to connect to a MongoDB, then you can just run it with the above command. In dev mode, this server won't serve the react app. You should run the frontend with `npm run dev`.

## Deploy

In *production* you would need a running MongoDB, the env variable `DATABASE_URL` set and then:

```sh
npm run build
npm start
```
