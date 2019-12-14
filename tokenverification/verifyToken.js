const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const token = req.header('authorization').split(" ")[1];
  // check si le token existe 
  if (!token) return res.status(401).send('Access denied!'); // No access 401
  try{
    console.log(token)
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch(err) {
    res.status(400).send('Invalid token is here!'); // 400 bad request
  }
}