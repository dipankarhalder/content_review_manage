const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const { routes, msg } = require('./constant');
const { env, db } = require('./config');
const { comutils } = require('./utils');
const { RootApiRouter } = require('./routes');

/* initial express app */
const app = express();

/* CORS configuration */
const corsOptions = {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
};

/* all important middleware */
app.use(morgan(env.PLATFORM));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* application main endpoint */
app.use(routes.paths.base, RootApiRouter);

/* handled missing routes and globally errors */
app.use((req, res, next) => comutils.missingRoutes(next));
app.use((error, req, res) => comutils.globalError(res, error));

/* connect database and started server */
db
  .dbConnect()
  .then(() => {
    app.listen(env.PORT, () => {
      console.log(`${msg.server.success} ${env.PORT}`);
    });
  })
  .catch((err) => {
    console.error(msg.db.failed, err);
    process.exit(1);
  });