const {Schema, model} = require('mongoose');

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
            /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/,
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

const User = model('User', userSchema);

module.exports = User;