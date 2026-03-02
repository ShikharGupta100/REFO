const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is alrady taken"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is alrady taken"],
    },
    email:{
        type:String,
        required:[true,"Email is alrady taken"],
        unique:true
    }
})

const userModel = mongoose.model("users",userSchema);

module.exports = userModel;