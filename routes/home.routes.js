const app=require('express').Router()
const postModel=require('../models/post.model')
var jwt = require('jsonwebtoken')
const auth=require('../middleware/auth')

app.post('/addPost',auth,async(req,res)=>{
    const{title,desc,userID}=req.body
    await postModel.insertMany({title,desc,userID:req.userID})
    res.json({message:'Post added'})
})

app.get('/home',auth,async(req,res)=>{
    let posts=await postModel.find({}).populate('userID')
    console.log(posts);
    res.json({posts})
})

module.exports=app
