const { roles } = require('../models/user');

const verifyAdmin = (req, res, next) => {
    if( req.user && (req.user.role === roles.ADMIN) || req.user.role === roles.SUPER_ADMIN) {
        return next();
    } else {
        return res.status(403).json({error: 'Access denied Admin and super Admin only'});
    }
}

const verifySuperAdmin = (req, res, next) => {
    if( req.user && (req.user.role === roles.SUPER_ADMIN)) {
        return next();
    } else {
        return res.status(403).json({error: 'Access denied super Admin only'});
    }
}

module.exports = { verifyAdmin, verifySuperAdmin };