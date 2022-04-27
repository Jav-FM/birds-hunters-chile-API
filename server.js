require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

//Expresss Cors Middleware (intento para restringir a 3 rutas el acceso)
const whitelist = [
  "https://birdshunters-chile.firebaseapp.com",
  "https://birdshunters-chile.web.app",
  "http://localhost:3000",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

//Habilitar cors
app.use(cors(corsOptions));

//Habilitar req.body:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Directorios estáticos:
app.use(express.static(__dirname + "/public"));

app.use("/api/v1/", cors(corsOptions), require("./routes/users.route"));
app.use("/api/v1/", cors(corsOptions), require("./routes/photos.route"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server ON in port http://localhost:${PORT}`);
});
