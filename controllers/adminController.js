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

