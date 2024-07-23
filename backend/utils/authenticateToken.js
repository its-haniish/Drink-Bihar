const jwt = require('jsonwebtoken');

// Middleware to authenticate requests using JWT token

function authenticateToken(req, res, next) {

    // Extract the Authorization header from the request
    const authorizationHeader = req.headers['authorization'];
    // Check if Authorization header is missing
    if (!authorizationHeader) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Extract the token from the Authorization header
    const token = authorizationHeader.split(' ')[1];

    // Check if token is missing
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        // Verify and decode the JWT token
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        // Attach the decoded user information to the request object
        req.user = decoded;

        // Move to the next middleware in the chain
        next();
    } catch (error) {
        console.log("Forbidden");
        // Return a Forbidden response if token verification fails
        return res.status(403).json({ message: 'Forbidden' });
    }
}

module.exports = authenticateToken;
