import User from '../models/user.js';

export const register = async (req, res) => {
    try {
        let user = await User.findOne({email: req.body.email});
        if (user) {
            return res.status(409).json({data: null, message: `User with email ${req.body.email} already exists`});
        }
        user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            birthdate: req.body.birthdate,
            occupation: req.body.occupation,
            phone: req.body.phone
        };

        user = new User(user);
        await user.save();
        const token = await user.generateToken();
        console.log(token)
        res.status(201).json({data: user, message: `User created successfully`, token});
    } catch (e) {
        res.status(500).json({message: `${e.message}`});
    }
}

export const login = async (req, res) => {
    try {
        let user = await User.findOne({email: req.body.email});
        if (!user) {
            return res.status(409).json({message: `User with email ${req.body.email} does not exists`});
        }
        const correctPassword = await user.comparePassword(req.body.password);
        if (!correctPassword) {
            return res.status(401).json({data: null, message: `Incorrect password`});
        }
        const token = await user.generateToken();
        console.log(token)
        res.status(200).json({data: user, token, message: `Login successful`});
    } catch (e) {
        res.status(500).json({message: `${e.message}`});
    }
}

export const updateProfile = async (req, res) => {
    try {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['email', 'occupation', 'name', 'password', 'role', 'image', 'birthdate', 'phone'];
        const isAllowed = updates.every(update => allowedUpdates.includes(update));
        if (!isAllowed) {
            return res.status(400).json({data: null, message: 'Update not allowed'});
        }
        for (let key of updates) {
            req.user[key] = req.body[key];
        }
        await req.user.save();
        res.status(200).json({data: req.user, message: 'User updated successfully'});
    } catch (e) {
        res.status(500).json({message: `${e.message}`});
    }
}

export const resetPassword = async (req, res) => {
    try {

    } catch (e) {
        res.status(500).json({message: `${e.message}`});
    }
}

export const deleteAccount = async (req, res) => {
    try {
        req.user.status = 'DELETED';
        await req.user.save();
        res.status(200).json({data: req.user, message: 'Account deleted'});
    } catch (e) {
        res.status(500).json({message: `${e.message}`});
    }
}

export const getLoggedInAccount = async (req, res) => {
    try {
        res.status(200).json({data: req.user, token: req.token});
    } catch (e) {
        res.status(500).json({message: `${e.message}`});
    }
}

export const verifyAccount = async (req, res) => {
    try {

    } catch (e) {
        res.status(500).json({message: `${e.message}`});
    }
}

export const forgotPassword = async (req, res) => {
    try {

    } catch (e) {
        res.status(500).json({message: `${e.message}`});
    }
}