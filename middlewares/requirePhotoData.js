const { nanoid } = require("nanoid");

const requirePhotoData = (req, res, next) => {
  try {
    const { user_id, bird_id, place, date, order } = req.body;
    // Validando que no hayan campos en blanco
    // La negación (!) de trim() devuelve true si el string se compone sólo de espacios
    if (
      !user_id?.trim() ||
      !bird_id?.trim() ||
      !place?.trim() ||
      !date?.trim() ||
      !order?.trim() ||
      !req.files?.photo
    ) {
      throw new Error("Uno o más campos obligatorios viene en blanco.");
    }

    // Validando extensión y peso de foto
    const { photo } = req.files;
    const mimeTypes = ["image/jpeg", "image/png"];
    if (!mimeTypes.includes(photo.mimetype)) {
      throw new Error("La foto debe ser .jpg, .jpeg o .png.");
    }
    if (photo.size > 5 * 1024 * 1024) {
      throw new Error("La foto no puede pesar más de 5MB.");
    }

    // Construir nombre de foto
    const pathPhoto = `${nanoid()}.${photo.mimetype.split("/")[1]}`;
    req.pathPhoto = pathPhoto;

    next();
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error: error.message,
    });
  }
};

module.exports = {
  requirePhotoData,
};
