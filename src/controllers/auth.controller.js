const jwtService = require('../services/jwt.service');
const { usersDb } = require('../data/users.db');

function login(req, res) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      error: 'Petición incorrecta',
      message: 'El campo email es requerido.'
    });
  }

  const user = usersDb.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({
      error: 'Credenciales inválidas',
      message: 'El usuario no existe en el sistema.'
    });
  }

  const token = jwtService.signToken(user);
  return res.status(200).json({
    success: true,
    message: 'Token generado con éxito',
    token
  });
}

module.exports = { login };
