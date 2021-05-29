import path from 'path';
import { Request, Response } from 'express';
import { renderToString } from 'react-dom/server';
import React from 'react';
import { ChunkExtractor } from '@loadable/server';

const statsFile = path.resolve('./build/client/loadable-stats.json');
const extractor = new ChunkExtractor({ statsFile, publicPath: '/build' });

import App from 'client/components/App/App';

export default function render(req: Request, res: Response) {
  const jsx = extractor.collectChunks(React.createElement(App));
  const appHtml = renderToString(jsx);

  const linkTags = extractor.getLinkTags();
  const styleTags = extractor.getStyleTags();
  const scriptTags = extractor.getScriptTags();

  return res.send(`
<html>
    <head>
        <title>Распределяй онлайн</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width">
        <link rel="icon" type="image/x-icon" href="/public/favicon.ico">
        ${linkTags}
        ${styleTags}
    </head>

    <body>
        <div id="root">${appHtml}</div>

        ${scriptTags}
    </body>
</html>
    `);
}
