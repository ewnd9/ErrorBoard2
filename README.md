# embedded-error-board

> Track and fix JavaScript errors fired by your visitor's browsers.

WIP fork of https://github.com/Lapple/ErrorBoard

## Install

```sh
$ git clone https://github.com/ewnd9/embedded-error-board.git && cd embedded-error-board
$ npm install
```

## Usage

Edit the `config` section of `package.json`:

```js
// ...
"config": {
  "dbfile": "db", // path to database file
  "port": 3000    // web application port
},
// ...
```

Start server by

```sh
$ npm start
```

## Development

```sh
$ npm run start:dev
```

## License

MIT © [ewnd9](http://ewnd9.com)
