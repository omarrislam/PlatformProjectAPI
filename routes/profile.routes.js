const app=require('express').Router()
const postModel=require('../models/post.model')
const auth=require('../middleware/auth')

app.get('/profile',auth,async(req,res)=>{
    console.log(req.userID);
   let posts= await postModel.find({userID:req.userID}).populate('userID')
   res.json({posts})
})

app.delete('/delete',auth,async(req,res)=>{

try {
    await postModel.findOneAndDelete({_id:req.body.id})
    res.json({message:'deleted'})
} catch (error) {
    res.json({message:'catch error',error})
    
}
    })

app.put('/edit',auth,async(req,res)=>{
    try {
        const {title,desc,_id}=req.body
    await postModel.findOneAndUpdate({_id},{title,desc,userID:req.userID})
    res.json({message:"Updated"})
    } catch (error) {
         res.json({message:"catch error",error})
        
    }
})
module.exports=app