import bluebird from 'bluebird'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import logger from 'morgan'
import path from 'path'
import indexRouter from './routes'
import brandsRouter from './routes/brands'
import categoriesRouter from './routes/categories'
import ordersRouter from './routes/orders'
import productsRouter from './routes/products'
import usersRouter from './routes/users'
import utilRouter from './routes/utils'

//instancio el servidor
const app = express();

// view engine setup
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

//aplico cors
app.use(cors());
app.use(cookieParser());

const publicFolderPath = process.env.NODE_ENV === "Production" ? "../public" : "public"
app.use('/public', express.static(path.join(__dirname, publicFolderPath)));

//Indico las rutas de los endpoint
app.use('/api/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/utils/', utilRouter);
app.use('/api/categories/', categoriesRouter);
app.use('/api/brands/', brandsRouter);

// In production this server will also serve the built react app
if(process.env.NODE_ENV === "Production") {
  // Have Node serve the files for our built React app
  app.use(express.static(path.resolve(__dirname, '../frontend-dist')));
  // All other GET requests not handled before will return our React app
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend-dist/index.html'));
  });
}

//Database connection --
const mongoose = require('mongoose')
mongoose.Promise = bluebird;
const opts = {
  useNewUrlParser : true,
  connectTimeoutMS:20000,
  useUnifiedTopology: true
};

mongoose.connect(process.env.DATABASE_URL, opts)
.then(() => {
  console.log(`✅ Succesfully connected to MongoDB.`)
})
.catch((_e: any) => {
  console.log(`❌ Error connecting MongoDB.`),
  process.exit(1)
})

app.use(function (_req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Setup server port
const port = process.env.PORT || 8080;
// Escuchar en el puerto
app.listen(port,()=>{
    console.log(`✅ Server running on http://localhost:${port}`);
});
