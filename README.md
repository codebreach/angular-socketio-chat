# Pizzeria App

I am using:

* [AngularJS](http://angularjs.org)
* [NodeJS](http://nodejs.org)
* [Express](http://expressjs.com) - NOTE I'm using 3.5
* [Socket.IO and Socket.IO Client](http://socket.io) for web socket
  support
* [Brian Ford's Angular Socket IO
  client](https://github.com/btford/angular-socket-io)
* [Twitter Bootstrap](http://getbootstrap.com) and both the
  [Express](https://www.npmjs.org/package/generator-express) and
  [AngularJS](https://www.npmjs.org/package/generator-angular) [Yeoman](http://yeoman.io) generators.

## Build instructions

`node app.js` or `DEBUG=sockets,queue,worker node app.js` to see interesting logs

`http://localhost:3000/` has the working client. `/angular_dev` has the live updating client. Unfortunately the upstream repo had some hackery around this :(

To build a new production ready binary:

```bash
cd angular-frontend
grunt --force
cd ..
node app.js
```
