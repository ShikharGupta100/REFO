const userModel = require("../models/user.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


/**
 * @name
 * @desc Register a new user
 * @access Public
 */

async function registerUserController(req,res){

    const {username,password,email} = req.body;
    if(!username || !password || !email){
        return res.status(400).json({
            message:"All fields are required"
        })
    }

    const isUserAlreadyExist = await userModel.findOne({
        $or:[{username},{email}]
    })
    if(isUserAlreadyExist){
        return res.status(400).json({
            message:"Username or email is already taken"
        })
    }

    const hash = await bcrypt.hash(password,10);

    const user = new userModel({
        username,
        password:hash,
        email
    })
    await user.save();

    const token = jwt.sign({
        id:user._id,
        username:user.username,
    },process.env.JWT_SECRET,{
        expiresIn:"1d"
    })

    res.cookie("token",token)

    res.status(201).json({//201 Created ✅
        message:"User registerd successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
} 


/**
 * @name loginUserController
 
 * @desc Login a user
 * @access Public
 */
async function loginUserController(req,res) {
    const {email,password} = req.body;

    const user = await userModel.findOne({
        email
    })
    
    if(!user){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }

    const isValidPassword = await bcrypt.compare(password,user.password);

    if(!isValidPassword){
        return res.status(400).json({
            message:"Invalid email or passowrd"
        })

    }

    const token = jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT_SECRET,
    {expiresIn:"1d"}
)
   res.cookie("token",token);

   res.status(200).json({//User authenticated 200 OK ✅
    message:"User Logged In Successfully",
    user:{
        email:user.email,
        username:user.username,
        id:user._id
    }
   })
}

module.exports = {registerUserController,
    loginUserController}