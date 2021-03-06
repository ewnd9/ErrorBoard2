# embedded-error-board

> Track and fix JavaScript errors fired by your visitor's browsers.

WIP fork of https://github.com/Lapple/ErrorBoard

## Install

```sh
$ npm install embedded-error-board --save
```

## Usage

- [`express-example/index.js`](example/express-app/index.js)

```js
const express = require('express');

const app = express();

const mount = '/error-board';
const dbFile = __dirname + '/errors.db';

const errorBoard = require('embedded-error-board')(dbFile, mount);
app.use(mount, errorBoard.app);

const server = http.createServer(app);
errorBoard.ws.installHandlers(server, { prefix: `${mount}/ws` });

app.use(function(err, req, res, next) { // always last
  if (!err) {
    return next();
  }

  console.log(err);

  errorBoard.agent.report(err, { family: 'backend' });
  res.status(err.status || 500).json({ status: 'error' });
});

server.listen(port);
console.log('Listening on port %s', port);
```


## Development

```sh
$ npm run start:dev
```

## License


(The MIT License)

Copyright (c) 2014 Aziz Yuldoshev &lt;yuldoshev.aziz@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

MIT © [ewnd9](http://ewnd9.com)
