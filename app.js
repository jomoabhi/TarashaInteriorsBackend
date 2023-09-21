const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;
const cors = require('cors');
// const swaggerUi = require('swagger-ui-express');
// const swaggerFile = require('./swagger_output.json');
const cookieParser = require('cookie-parser');
// const cookieParser = require('cookie-parser');
const formattedResponse = require('./src/utils/formatted-response');
require('dotenv').config();
const connectDB = require('./config/db');
connectDB();
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:5173', ''],
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
  })
);
app.use(
  '/user',
  formattedResponse,
  require('./src/user/routes/user.authorizationroutes')
);
app.use(
  '/calendar',
  formattedResponse,
  require('./src/calendar/routes/calendar')
);
module.exports = app;
