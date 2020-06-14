import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';
import App from '../src/components/App';
import { indexHtml } from './indexHtml';

export const renderServerSideApp = (req, res) => {
    renderApp(App, req, res);
};

function renderApp(ServerApp, req, res) {

  const markup = ReactDOMServer.renderToString(
    <ServerApp />
  );

  const fullMarkup = indexHtml({
    helmet: Helmet.renderStatic(),
    markup
  });

  res.status(200).send(fullMarkup);
}
