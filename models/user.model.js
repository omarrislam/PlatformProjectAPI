const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    fname:String,
    lname:String,
    uname:String,
    email:String,
    password:String,
    confirmation:{type:Boolean,default:false}
})

module.exports=mongoose.model('user',userSchema)