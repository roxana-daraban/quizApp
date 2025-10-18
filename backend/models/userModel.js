import moongoose from 'mongoose';
import { trim } from 'validator';

const userSchema = new moongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true, 
        lowercase: true,
        trim: true
    },
    password:{
        type: String,
        required: true,

    },
},
    { timestamps: true    

});

export default moongoose.models.User || moongoose.model('User', userSchema);