import {Schema, model} from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
    fullName:{
        type:String,
        required:[true, "Name is required"],
        minLength:[5, "Name must be atleast 5 character"],
        maxLength:[30, "Name must be less than 30 character"],
        trim:true
    },
    email:{
        type:String,
        required:[true, "Email is required"],
        lowercase:true,
        unique:true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Invalid email address'
          ]
    },
    password:{
        type:String,
        required:[true, "Password is required"],
        select:false
    },
    role:{
        type:String,
        enum:["USER", "ADMIN"],
        default:"USER"
    },
    avatar:{
        public_id:{
            type:String
        },
        secure_url:{
            type:String
        }
    },
    forgotPasswordToken: String,
    forgotPasswordExpiryDate: Date 
}, {
    timestamps:true
})

userSchema.pre('save', async function(){
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 8);
});

userSchema.methods = {
    comparePassword: async function(plainTextPassword){
        return await bcrypt.compare(plainTextPassword, this.password);
    },
    generateJWTToken:function(){
        return jwt.sign(
            {id: this._id, role: this.role, email:this.email, subscription: this.subscription},
            process.env.SECRET,
            {expiresIn: process.env.JWT_EXPIRY}
        )
    }
}

const User = model('User', userSchema);

export default User;