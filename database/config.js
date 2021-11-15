const mongoose = require('mongoose');

const dbConnection = async() => {
  
  try {
    
    await mongoose.connect( process.env.MONGODB_ATLAS, this.options );

    console.log('Database online');

  } catch (error) {
    console.log(error);
    throw new Error('Error starting database');
  }
}

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false
}

module.exports = {
  dbConnection
}
