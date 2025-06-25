const jwt = require('jsonwebtoken');
const db = require('../config/db');

const authMiddleware = (req, res, next) => {

  const token = req.header('x-auth-token');
  
  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = db.users.find(u => u.id === decoded.user.id);
    
    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Token inválido' });
  }
};

module.exports = authMiddleware;