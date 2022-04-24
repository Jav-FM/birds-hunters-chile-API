require("dotenv").config();
const express = require("express");
var cors = require('cors')
const app = express();

//Expresss Cors Middleware
var corsOptions = {
  origin: ['https://birdshunters-chile.firebaseapp.com','http://localhost:5000', 'http://localhost:8080'],
  optionsSuccessStatus: 200 // 
}
app.use(cors(corsOptions))

//Habilitar req.body:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Directorios estáticos:
app.use(express.static(__dirname + "/public"));

app.use('/api/v1/', require('./routes/users.route'));
app.use('/api/v1/', require('./routes/photos.route'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server ON in port http://localhost:${PORT}`);
});