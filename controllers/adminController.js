const User = require('../models/user');

const { roles } = require('../models/user');

exports.getAllUsers = async (req, res) => {
    try{
        const users = await User.find({ deleted: false }).select('-password');
        res.status(200).json(users);

    } catch(err) {
        res.status(500).json({error: 'Error retriving users'})
    }
    
}

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        if(!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        if(user.role === 1 && req.user.role !== 2) {
            return res.status(403).json({ error: 'Only superman and delete admin'})
        }

        user.deleted = true;
        await user.save(); 

        res.status(200).json({ message: 'User deleted successfully (soft deleted)', user})

    } catch (err) {
        res.status(500).json({ error: 'Error deleting user'})

    }
}

