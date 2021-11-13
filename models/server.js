const express = require('express');
const cors = require('cors');

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersRoutePath = '/api/users';

    // Middlewares
    this.middlewares();

    // Rutas de mi app
    this.routes();
  }

  middlewares() {

    // CORS
    this.app.use( cors() );

    // Directorio público
    this.app.use( express.static('public') );
  }

  routes() {
    this.app.use(this.usersRoutePath, require('../routes/user'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening at http://localhost:${this.port}`);
    });    
  }

}

module.exports = Server;
