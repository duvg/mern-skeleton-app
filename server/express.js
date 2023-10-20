import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter} from 'react-router-dom/server';
import MainRouter from './../client/MainRouter';

import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles';
import theme from './../client/theme';

import path from 'path';

import devBundle from './devBundle';

// Routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import categoryRoutes from './routes/category.routes';
import productRoutes from './routes/product.routes'

import Template from './../template';


const CURRENT_WORKING_DIR = process.cwd();
const app = express();
devBundle.compile(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/', categoryRoutes);
app.use('/', productRoutes);



app.get('*', (req, res) => {
  const sheets = new ServerStyleSheets();
  const context = {};
  const markup = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <ThemeProvider theme={theme}>
        <MainRouter />
      </ThemeProvider>
    </StaticRouter>
  );

  if (context.url) {
    return res.redirect(303, context.url);
  }

  const css = sheets.toString();
  res.status(200).send(Template({
    markup,
    css
  }))
});

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ "error": `${err.name}: ${err.message}`})
  } else if (err) {
    res.status(400).json({ "error": `${err.name}: ${err.message}`});
    console.log(err);
  }
});

export default app;
