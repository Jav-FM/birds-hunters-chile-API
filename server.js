require("dotenv").config();
const express = require("express");
var cors = require("cors");
const app = express();

//Expresss Cors Middleware (intento para restringir a 3 rutas el acceso)
const allowList = [
  "https://birdshunters-chile.firebaseapp.com",
  "https://birdshunters-chile.web.app",
  "http://localhost:3000",
];
const corsOptionsDelegate = function (req, callback) {
  const allowed = allowList.includes(origin);
  if (allowed) callback(null, true);
  else callback(new Error("No permitido por Cors."));
};

var corsOptions = {
  origin: corsOptionsDelegate,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// app.use(cors());

//Habilitar req.body:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Directorios estáticos:
app.use(express.static(__dirname + "/public"));

app.use("/api/v1/", require("./routes/users.route"));
app.use("/api/v1/", require("./routes/photos.route"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server ON in port http://localhost:${PORT}`);
});
