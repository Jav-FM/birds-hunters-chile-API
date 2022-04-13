const express = require("express");
const expressFileUpload = require('express-fileupload');
const {
  createPhoto,
  editPhoto,
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

router.post("/photos", requirePhotoData, createPhoto);
router.put("/photos/:id", requireAuth, editPhoto);
router.delete("/photos/:id", requireAuth, deletePhoto);

module.exports = router;

