require("dotenv").config();
const express = require("express");
var cors = require("cors");
const app = express();

//Expresss Cors Middleware
const allowList = [
  "https://birdshunters-chile.firebaseapp.com",
  "https://birdshunters-chile.web.app",
  "http://localhost:3000",
];
const corsOptionsDelegate = (req, callback) => {
  const corsOptions = { origin: allowList.includes(req.header("Origin")) };
  callback(null, corsOptions);
};

// app.use(cors(corsOptions))
app.use(cors(corsOptionsDelegate));

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
