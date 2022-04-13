const requireUserData = (req, res, next) => {
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
      password } =
      req.body;
    // Validando que no hayan campos en blanco
    // La negación (!) de trim() devuelve true si el string se compone sólo de espacios
    if (
      !userTypeId?.trim() ||
      !names?.trim() ||
      !firstLastName?.trim() ||
      !secondLastName?.trim() ||
      !rut?.trim() ||
      !adress?.trim() ||
      !phoneNumber?.trim() ||
      !email?.trim() ||
      !password?.trim() 

    ) {
      throw new Error('Uno o más campos obligatorios viene en blanco.');
    }

    next();
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error: error.message,
    });
  }
};

module.exports = {
  requireUserData,
};
