
const jwt = require('jsonwebtoken');
require('dotenv').config();

const token = (user, key, role) => {
    return {token:jwt.sign({ id: user._id, role: role }, key, { expiresIn: '1h' }),
            id:user._id,
            role:role
            };
}


function authenticateRole(role) {
    return (req, res, next) => {
        const token = req.body.token;
        
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        jwt.verify(token, process.env.KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            const userRoles = decoded.role;

            if (userRoles && userRoles === 'user') {
                next();
            } else {
                res.status(403).json({ error: 'Forbidden' });
            }
        });
    };
}
module.exports = { token, authenticateRole }




