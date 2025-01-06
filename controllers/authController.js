const User = require('../models/user');
const { roles } = require('../models/user');

exports.registerUser = async (req, res) => {
    try{
        const { name, email, password, role } = req.body;
        
        // Default role to 'USER' if not provided
        const userRole = role !== undefined ? role : roles.USER;

        // Ensure the role is valid
        if(![roles.USER, roles.ADMIN, roles.SUPER_ADMIN].includes(userRole)) {
            res.status(400).json({error : 'Invalid role'});
        }

        const user = await User.create({name, email, password, role: userRole});
        res.status(201).json({message : 'User register successfully', user});

    } catch (err) {
        res.status(400).json({ error: err.message })
    }

}