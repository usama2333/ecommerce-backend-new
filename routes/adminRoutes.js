const express = require('express');

const verifyToken = require('../middleware/authMiddleware');
const { verifyAdmin } = require('../middleware/verifyAdmin');
const { roles } = require('../models/user');
const { getAllUsers, deleteUser } = require('../controllers/adminController');
const router = express.Router();

router.get('/dashboard', verifyToken, verifyAdmin, (req, res) => {
    if(req.user.role === roles.SUPER_ADMIN) {
        return res.status(201).json({message: 'Welcome to the Super admin Dashboard'});
    }

    return res.status(201).json({message: 'Welcome to the Admin Dashboard'});
}) 

// getAll users
router.get('/users', verifyToken, verifyAdmin, getAllUsers);

// Route to delete a user
router.delete('/users/:id', verifyToken, verifyAdmin, deleteUser);

module.exports = router;