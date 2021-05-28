import { Request, Response } from 'express';
import { renderToString } from 'react-dom/server';
import React from 'react';

import App from 'client/components/App/App';

export default function render(req: Request, res: Response) {
  const app = renderToString(React.createElement(App));

  return res.send(`
<html>
    <head>
        <title>Распределяй онлайн</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width">
        <link rel="icon" type="image/x-icon" href="/public/favicon.ico">
    </head>

    <body>
        <div id="root">${app}</div>

        <script src="/build/client.js"></script>
    </body>
</html>
    `);
}
