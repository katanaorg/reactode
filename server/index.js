import path from 'path';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import responseTime from 'response-time';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { renderServerSideApp } from './server';

const { PUBLIC_URL = '' } = process.env;

// This export is used by our initialization code in /scripts
export const app = express();

app.use(compression());
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve generated assets
app.use(
  PUBLIC_URL,
  express.static(path.resolve(__dirname, '../build'))
);

// Serve static assets in /public
app.use(
  PUBLIC_URL,
  express.static(path.resolve(__dirname, '../public'))
);

app.use(morgan('tiny'));

app.use(
  responseTime((_req, res, time) => {
    res.setHeader('X-Response-Time', time.toFixed(2) + 'ms');
    res.setHeader('Server-Timing', `app;dur=${time}`);
  })
);

app.use(renderServerSideApp);
