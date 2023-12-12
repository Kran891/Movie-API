const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const secretKey = 'your_secret_key';


const token = (user,key,roles)=>{
  return  jwt.sign({ id: user.id, username: user.username, roles: roles }, key, { expiresIn: '1h' });
}

app.get('/admin', authenticateRole('Admin'), (req, res) => {
  res.json({ message: 'Access granted for Admin role' });
});

// Protected route requiring "User" role
app.get('/user', authenticateRole('User'), (req, res) => {
  res.json({ message: 'Access granted for User role' });
});

// Middleware for role-based authentication
function authenticateRole(role) {
  return (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const userRoles = decoded.roles;

      if (userRoles && userRoles.includes(role)) {
        next();
      } else {
        res.status(403).json({ error: 'Forbidden' });
      }
    });
  };
}
module.exports={token,}




