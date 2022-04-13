const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  try {
    if (!req.headers?.authorization) {
      throw new Error('No autorizado');
    }

    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      throw new Error('Formato de token no valido (utilizar Bearer)');
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.id = payload.id;
    next();
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error: error.message,
    });
  }
};

module.exports = { requireAuth };
