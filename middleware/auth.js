const jwt=require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");
const authenticationMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new CustomAPIError("No token provided", 401);
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const {id,number}=decoded;
        req.user = {id,number};
        next();
    } catch (error) {
        throw new CustomAPIError(error, 401);
    }
}

module.exports = authenticationMiddleware;