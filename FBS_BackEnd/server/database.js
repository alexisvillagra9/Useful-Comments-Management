const mongoose = require("mongoose");

const db_connect = "mongodb://localhost:27017/FB_Scrap";

mongoose
  .connect(db_connect, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(db => console.log("Base de datos Conectada"))
  .catch(err => console.error(err));

module.exports = mongoose;
