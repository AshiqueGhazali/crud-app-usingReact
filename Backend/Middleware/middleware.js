
const jwt = require('jsonwebtoken');


const routeProtect = (req, res, next) => {
  
  const authHeader = req.headers.authorization; 
    
    
  if (!authHeader || !authHeader.startsWith('Bearer ')) {        
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];
  
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      
      if (err) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
      }

      req.user = decoded; 
      console.log('Token verified:', decoded);
      next();
  });
};


module.exports={
   routeProtect
}