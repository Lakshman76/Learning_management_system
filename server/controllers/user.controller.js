const User = require('../models/user.model');
const { default: AppError } = require('../utils/appError');

const cookieoptions = {
    secure: true,
    maxAge: 7*24*60*60*1000, // 7 days
    httpOnly: true
}

const register = async (req, res)=>{
    const { fullName, email, password } = req.body;

    if(!fullName || !email || !password){
        return next(new AppError('All fields are required', 400));
    }

    const userExists = await User.findOne({email});
    if (userExists) {
        return next(new AppError('Email already Exists', 400));
    }

    const user = await User.create({
        fullName,
        email,
        password,
        avatar:{
            public_id: email,
            secure_url: 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='
        }
    });

    if(!User){
        return next(new AppError('User registration failed, please try again!', 400))
    }
    // TODO: upload user picture

    await user.save();

    // TODO: set JWT token in cookie

    user.password = undefined;

    res.status(200).json({
        success:true,
        message:'User registered successfully',
        user
    })
}

const login = async ()=>{
    const {email, password} = req.body;

    if(!email || !password){
        return next(new AppError('All fields are required', 400));
    }
    const user = await User.findOne({
        email
    }).select('+password');

    if(!user || !user.comparePassword(password)){
        return next(new AppError('Email or password doesnot match', 400));
    }

    const token = await user.generateJWTToken;

    user.password = undefined;

    res.cookie('token', token, cookieoptions);

    res.status(201).json({
        success: true,
        message: "User Regisered Successfully",
        user
    })
}

const logout = async ()=>{

}
const getProfile = async ()=>{

}

module.exports = {
    register,
    login,
    logout,
    getProfile
}