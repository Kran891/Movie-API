
const jwt = require('jsonwebtoken');
require('dotenv').config();

const token = (user, key, roles) => {
    return jwt.sign({ id: user._id, username: user.username, roles: roles }, key, { expiresIn: '1h' });
}


function authenticateRole(role) {
    return (req, res, next) => {
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        jwt.verify(token, process.env.KEY, (err, decoded) => {
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
module.exports = { token, authenticateRole }




