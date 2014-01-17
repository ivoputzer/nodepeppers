NodePeppers
===

Nodepeppers is a boilerplate application for my fellows at [xpeppers](http://xpeppers.com). The tecnologies involved besides nodejs itself are:

- [express](http://expressjs.com) development framework
- [jade](http://jade-lang.com) template engine with a slick markup
- [stylus](http://learnboost.github.io/stylus) css preprocessor for linear stylesheets
- [forever](https://github.com/nodejitsu/forever) script execution monitor
- [mocha](http://visionmedia.github.io/mocha/) testing framework along with
- [should](https://github.com/visionmedia/should.js) awesome assertion library

Yet to come:
- [cluster](http://nodejs.org/api/cluster.html) support for multiple workers

Install
===

```
$ git clone https://github.com/ivoputzer/nodepeppers.git <dirname>
$ cd <dirname>
$ npm install
```

You can start application through npm direcly. Whenever `node-dev` is found on the machine, the command is used instead of `node` automatically
```
$ npm start

```

Once again, you can use npm to launch the entire test suite. This way `should` assertion library gets loaded automatically
```
$ npm test
```

In order to set the proper application environment you need to assign `NODE_ENV` to one of the following values, `development` is default.

```
  export NODE_ENV=development
  export NODE_ENV=integration
  export NODE_ENV=production
```