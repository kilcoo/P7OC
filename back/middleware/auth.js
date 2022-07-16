const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    console.log(req.header.authorization)
    const token = req.headers.authorization;                      
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');              
    const userId = decodedToken.userId;   
    const role = decodedToken.role;
    console.log(role)
    console.log(userId)
    req.auth ={userId,role}
    if (req.body.userId && req.body.userId !== userId) {                        
      throw 'Invalid user ID';     
    } else {
      next();                                                              
    }
  } catch {                                   
    res.status(401).json({
      error:'Invalid request!'
    });
  }
};