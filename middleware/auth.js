import jwt from "jsonwebtoken";
import User from "../models/user.js";

exports.auth = async (req, res, next) => {
    try {
        if(!req.headers){
            return res.status(400).json({message: `Invalid header format`});
        }

        if(!req.headers.get('Authorization')){
            return res.status(400).json({message: `Invalid header format`});
        }

        if(!req.headers.get('Authorization').startsWith('Bearer')){
            return res.status(400).json({message: `Invalid header format`});
        }

        const token = req.headers.get('Authorization').split(' ')[1];
        if(!token){
            return res.status(401).json({message: `Session expired`});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({_id: decoded._id, "logins.token": token});
        if(!user){
            return res.status(401).json({message: `Session expired`});
        }
        req.user = user;
        req.token = token;
        next();
    }catch (e) {
        res.status(500).json({message: `Error: ${e.message}`});
    }
}