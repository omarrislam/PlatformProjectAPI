const app=require('express').Router()
const { validationResult } = require('express-validator')
const userModel=require('../models/user.model')
const bcrypt=require('bcrypt')
const validation=require('../validation/login.validation')
var jwt = require('jsonwebtoken');
app.post('/handleLogin',validation,async(req,res)=>{
    const{email,password}=req.body
    let errors=validationResult(req)
try {
    if(errors.isEmpty()){
        let user=await userModel.findOne({email})
        if(user){
            let match=bcrypt.compare(password,user.password)
            if(match){
                if(user.confirmation){

                    var token = jwt.sign({userID:user._id,fname:user.fname,isLoggedIn:true}, 'omarr');
                    res.header({token})
                    res.json({message:"You're successfully logged in"})
                    
                }else{
                    res.json({message:"Please, confirm your account first"})

                }
            }else{
                res.json({message:"Incorrect password",oldInputs:{email,password}})

            }
        }else{
            res.json({message:"Account doesn't exist"})
        }
    }else{
        res.json({message:"Validation error",error:errors.errors})
    }
} catch (error) {
    res.json({message:"catch error",error})
    
}
})

module.exports=app