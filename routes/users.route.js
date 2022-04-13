const express = require('express');
// const expressFileUpload = require('express-fileupload');
const {
  createUser,
  loginUser,
  getUserById,
  editUser,
  deleteUser
} = require('../controllers/users.controllers');
const { requireAuth } = require('../middlewares/requireAuth');
const { requireUserData } = require('../middlewares/requireUserData');
const router = express.Router();

//Middleware a aplicar cuando se implementen fotos de perfil
// router.use(
//   expressFileUpload({
//     abortOnLimit: true,
//     limits: { fileSize: 5 * 1024 * 1024 },
//   })
// );

router.post('/users', requireUserData, createUser);
router.post('/login', loginUser);
router.get('/users/:id', requireAuth, getUserById);
router.put('/users/:id', requireAuth, editUser);
router.delete('/users/:id', requireAuth, deleteUser);

module.exports = router;
