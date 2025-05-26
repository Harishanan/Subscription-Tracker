import User from '../models/user.model.js';
import jwt from "jsonwebtoken";

import {JWT_SECRET} from '../config/env.js';

const authorise = async (req, res, next) => {
    try{
        let token;

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token) return res.status(401).json({message: 'Unauthorised, token is needed'});

        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decoded.userId);

        if(!user) return res.status(401).json({message: 'Unauthorised, user is not found'});

        req.user = user;

        next();
    } catch(error){

        res.status(401).json({message: 'Unauthorised 3', error: error.message});
    }
}

export default authorise;