const {
  createPhotoDB,
  getPhotosByUserDB,
  replacePhotoDB,
  deletePhotoDB,
} = require("../database");
const path = require("path");

const createPhoto = async (req, res, next) => {
  try {
    const { user_id, bird_id, place, date, order, name } = req.body;
    const { photo } = req.files;
    const pathPhoto = req.pathPhoto;

    //Se guarda la foto en el servidor (usamos path.join para juntar rutas)
    photo.mv(
      path.join(__dirname, "../public/birdsphotos/", pathPhoto),
      (err) => {
        if (err) return next("No se puede guardar la imagen.");
      }
    );

    //Se guarda el nombre de la foto y el resto de info en la DB
    const response = await createPhotoDB({
      pathPhoto,
      user_id,
      bird_id,
      place,
      date,
      order,
      name,
    });

    if (!response.ok) {
      throw new Error(response.error);
    }

    return res.json({
      ok: true,
    });
  } catch (error) {
    if (error.message) {
      return res.status(400).json({
        ok: false,
        error: error.message,
      });
    } else {
      return res.status(400).json({
        ok: false,
        error: error,
      });
    }
  }
};

const getPhotosByUser = async (req, res) => {
  try {
    const { userid } = req.params;
    const response = await getPhotosByUserDB(userid);
    if (!response.ok) {
      return res.status(500).json({ error: response.error });
    }
    return res.json({ ok: true, data: response.data });
  } catch (e) {
    return res.status(400).json({
      ok: false,
      error: error.message,
    });
  }
};

//El siguiente método debe modoficar una foto en la DB, borrar la foto anterior en el servidor y agregar la nueva foto
const replacePhoto = async (req, res) => {
  try {
    const { photoid } = req.params;
    const { user_id, bird_id, place, date, order, name } = req.body;
    const { photo } = req.files;
    const pathPhoto = req.pathPhoto;

    //Se guarda la foto en el servidor (usamos path.join para juntar rutas)
    photo.mv(
      path.join(__dirname, "../public/birdsphotos/", pathPhoto),
      (err) => {
        if (err) return next("No se puede guardar la imagen.");
      }
    );

    //Se guarda el nombre de la foto y el resto de info en la DB
    const response = await replacePhotoDB({
      photoid,
      pathPhoto,
      user_id,
      bird_id,
      place,
      date,
      order,
      name,
    });

    if (!response.ok) {
      throw new Error(response.error);
    }

    return res.json({
      ok: true,
    });
  } catch (error) {
    if (error.message) {
      return res.status(400).json({
        ok: false,
        error: error.message,
      });
    } else {
      return res.status(400).json({
        ok: false,
        error: error,
      });
    }
  }
};

//El siguiente método debe eliminar la foto tanto del sercidor como de la DB
const deletePhoto = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await deletePhotoDB(id);
    if (!response.ok) {
      throw new Error(response.error);
    }
    return res.json({
      ok: true,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error: error.message,
    });
  }
};

module.exports = {
  createPhoto,
  getPhotosByUser,
  replacePhoto,
  deletePhoto,
};
