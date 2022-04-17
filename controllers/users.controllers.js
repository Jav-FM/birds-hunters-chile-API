const {
  createUserDB,
  getUserByEmailDB,
  getUserByIdDB,
  editUserDB,
  deleteUserDB,
} = require("../database");
const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  try {
    const {
      userTypeId,
      names,
      firstLastName,
      secondLastName,
      rut,
      adress,
      phoneNumber,
      email,
      password,
    } = req.body;

    //Se encripta contraseña
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //Se guarda al usuario en la DB
    const response = await createUserDB({
      userTypeId,
      names,
      firstLastName,
      secondLastName,
      rut,
      adress,
      phoneNumber,
      email,
      hashPassword,
    });

    if (!response.ok) {
      throw new Error(response.error);
    }

    const payload = { id: response.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return res.json({
      ok: true,
      token,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Validacion de campos del body
    if (!password?.trim() || !email?.trim()) {
      throw new Error("Uno o más campos obligatorios viene en blanco.");
    }

    //Revisar si email existe en DB
    const response = await getUserByEmailDB(email);

    if (!response.ok) {
      throw new Error(response.error);
    }

    const { data } = response;
    const comparePassword = await bcrypt.compare(password, data.password);

    if (!comparePassword) {
      throw new Error("Contraseña incorrecta");
    }

    //Se genera JWT
    const payload = { id: data.id, email: data.email, names: data.names };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({
      ok: true,
      token,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
       const response = await getUserByIdDB(id);
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

const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      userTypeId,
      names,
      firstLastName,
      secondLastName,
      rut,
      adress,
      phoneNumber,
      email,
    } = req.body;
    const response = await editUserDB({
      id,
      userTypeId,
      names,
      firstLastName,
      secondLastName,
      rut,
      adress,
      phoneNumber,
      email,
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

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await deleteUserDB(id);
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
  createUser,
  loginUser,
  getUserById,
  editUser,
  deleteUser,
};
