const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersRoutePath = '/api/users';

    // Connect to database
    this.connectDB();

    // Middlewares
    this.middlewares();

    // Rutas de mi app
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {

    // CORS
    this.app.use( cors() );

    // Lectura y parseo de Body
    this.app.use( express.json() );

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
