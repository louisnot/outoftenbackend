const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const token = req.header('auth-token');
  // check si le token existe 
  if (!token) return res.status(401).send('Access denied!'); // No access 401
  // Ajouter si il est admin ou pas 
  try{
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch(err) {
    res.status(400).send('Invalid token is here!'); // 400 bad request
  }
}