import moongoose from 'mongoose';
import User from '../models/userModel.js';
import validator  from 'validator';

const TOKEN_EXPIRATION = '24h'; // Token expiration time
const JWT_SECRET='your_jwt_secret_here'; 

//REGISTER
export async function registerUser(req, res) {
    try{
        const { name, email, password } = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                succes:false,
                 message: 'Please provide all required fields'
                 });
        }
        if

    }catch(error){

    }
}