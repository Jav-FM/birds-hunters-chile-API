const express = require("express");
const expressFileUpload = require('express-fileupload');
const {
  createPhoto,
  getPhotosByUser,
  replacePhoto,
  deletePhoto,
} = require("../controllers/photos.controllers");
const { requireAuth } = require("../middlewares/requireAuth");
const { requirePhotoData } = require("../middlewares/requirePhotoData");

const router = express.Router();

//OJO: Ruta para guardar foto deberia incluir un middleware requiredata especial,
//Revisar logica para validacion de foto en prueba skater

router.use(
  expressFileUpload({
    abortOnLimit: true,
    limits: { fileSize: 5 * 1024 * 1024 },
  })
);

router.post("/photos", requireAuth, requirePhotoData, createPhoto);
router.get('/photos/:userid', requireAuth, getPhotosByUser);
router.put("/photos/:photoid", requireAuth, requirePhotoData, replacePhoto);
router.delete("/photos/:id", requireAuth, deletePhoto);

module.exports = router;

