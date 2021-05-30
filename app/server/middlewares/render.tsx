import path from 'path';
import { Request, Response } from 'express';
import renderToString from 'preact-render-to-string';
import { h, FunctionalComponent } from 'preact';
import { ChunkExtractor } from '@loadable/server';
import { StaticRouter } from 'react-router-dom';

const statsFile = path.resolve('./build/client/loadable-stats.json');
const extractor = new ChunkExtractor({ statsFile, publicPath: '/build' });

import App from 'client/components/App/App';

interface IServerAppProps {
  url: string;
}

const ServerApp: FunctionalComponent<IServerAppProps> = (props) => {
  const { url } = props;

  return (
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
};

export default function render(req: Request, res: Response) {
  const jsx = extractor.collectChunks(<ServerApp url={req.url} />);
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
