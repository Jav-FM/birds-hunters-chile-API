const { createPhotoDB, deletePhotoDB } = require("../database");
const path = require("path");

const createPhoto = async (req, res) => {
  try {
    const { user_id, bird_id, place, date, order } = req.body;
    const { foto } = req.files;
    const pathPhoto = req.pathPhoto;

    //Se guarda la foto en el servidor (usamos path.join para juntar rutas)
    foto.mv(path.join(__dirname, "../public/avatars/", pathPhoto), (err) => {
      if (err) throw new Error("No se puede guardar la imagen.");
    });

    //Se guarda el nombre de la foto en la DB
    const response = await createPhotoDB({
      pathPhoto,
      user_id,
      bird_id,
      place,
      date,
      order,
    });

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

//El siguiente método debe modoficar una foto en la DB, borrar la foto anterior en el servidor y agregar la nueva foto
const editPhoto = () => {};

//El siguiente método debe eliminar la foto tanto del sercidor como de la DB
const deletePhoto = () => {};

module.exports = {
  createPhoto,
  editPhoto,
  deletePhoto,
};
