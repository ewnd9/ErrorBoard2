# ErrorBoard2

> Track and fix JavaScript errors fired by your visitor's browsers.

WIP fork of https://github.com/Lapple/ErrorBoard

## Install

```
$ git clone https://github.com/ewnd9/ErrorBoard2.git && cd ErrorBoard2
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

```
$ npm start
```

## Roadmap

- [ ] Tests
- [ ] Browserify -> webpack
- [ ] Integrate [raven-js](https://github.com/getsentry/raven-js) 

## License

MIT © [ewnd9](http://ewnd9.com)
