require('dotenv').config();
const express = require('express');
const app = express();

//Habilitar req.body:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//VER SI ESTO SE NECESITA:
//Directorios estáticos:
app.use(express.static(__dirname + '/public'));

// app.use('/api/v1/', require('./routes/users.route'));
// app.use('/api/v1/', require('./routes/photos.route'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server ON in port http://localhost:${PORT}`);
});
