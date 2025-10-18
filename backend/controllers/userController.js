import moongoose from 'mongoose';
import User from '../models/userModel.js';
import validator  from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
        if(!validator.isEmail(email)){
            return res.status(400).json({
                succes:false,
                 message: 'Invalid email'
                 });
        }
        const exist= await User.findOne({ email }).lean();

        if(exist)
            return res.status(400).json({
                succes:false,
                 message: 'Email already in use'
                 });

        const newId= moongoose.Types.ObjectId();
        const hashedPassword= await bcrypt.hash(password, 10);
        
        const user= new User({
            _id: newId,
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        if(!JWT_SECRET)throw new Error('JWT_SECRET is not defined');

        const token= jwt.sign({id:newId.toString()}, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });

        return res.status(201).json({
            succes:true,
             message: 'User registered successfully',
              token,
                user: {id:user._id, name: user.name, email: user.email}
            }); 
    }
    catch(err){
        console.error('Error registering user:', err);
        return res.status(500).json({
            succes:false,
             message: 'Server error'
             });

    }
}

export async function loginUser(req, res) {
    try{
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({
                succes:false,
                 message: 'Please provide all required fields'
                 });
        }
        const user= await User.findOne({ email }).lean();
        if(!user){
            return res.status(401).json({
                succes:false,
                 message: 'Invalid email or password'
                 });
        }
        const isMatch= await bcrypt.compare(password, user.password);
        if(!isMatch)
            return res.status(401).json({
                succes:false,
                 message: 'Invalid email or password'
                 });
        
    
        const token= jwt.sign({id:user_id.toString()}, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });

        return res.status(201).json({
            succes:true,
             message: 'Login successfully',
              token,
                user: {id:user._id, name: user.name, email: user.email}
            }); 
        
    }
    catch(err){
          console.error('Logging error :', err);
        return res.status(500).json({
            succes:false,
             message: 'Server error'
             });

    }

    }