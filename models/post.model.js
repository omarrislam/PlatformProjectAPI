const mongoose=require('mongoose')

const postSchema=mongoose.Schema({
    title:String,
    desc:String,
    userID:{type:mongoose.Schema.Types.ObjectId,ref:'user'}
})

module.exports=mongoose.model('post',postSchema)