const app=require('express').Router()
const { validationResult } = require('express-validator')
const validation=require('../validation/register.validation')
const userModel=require('../models/user.model')
const bcrypt=require('bcrypt')
const nodemailer = require("nodemailer");
var jwt = require('jsonwebtoken');

app.post('/handleRegister',validation,async(req,res)=>{
    let protocol=req.protocol
    let host=req.headers.host
    let URL=protocol+"://"+host
    const {fname,lname,uname,email,password,passwordConfirmation}=req.body
    let errors=validationResult(req)
    try {
        if(errors.isEmpty()){
            let user= await userModel.findOne({email})
                if(user){
                res.json({message:"account already exists", oldInputs:{fname,lname,uname,email}})
                }else{

                    var token = jwt.sign({email}, 'omar');
                    //console.log(token);
                    let transporter = nodemailer.createTransport({
                        service:"gmail",
                        auth: {
                          user: 'omareslam07@gmail.com', // generated ethereal user
                          pass: 'Omar@1234', // generated ethereal password
                        },
                      });

                      let info = await transporter.sendMail({
                        from: 'omareslam07@gmail.com', // sender address
                        to: email, // list of receivers
                        subject: "Hello ✔", // Subject line
                        html: `<b><a href="${URL}/check/${token}" >Confirm Your Account</a></b>`, // html body
                      });


                    bcrypt.hash(password,7,async(err,hash)=>{
                        await userModel.insertMany({fname,lname,uname,email,password:hash})
                    })
                res.json({message:"registered"})
                }
            }else{
        
            res.json({message:"validation error",error:errors.errors,oldInputs:{fname,lname,uname,email}})
        
            }
    } catch (error) {
        res.json({error:"catch error", error})
        
    }
})

app.get('/check/:token',async(req,res)=>{
    let token=req.params.token
    var decoded = jwt.verify(token, 'omar');
    let email=decoded.email
    if(token&& token!=undefined&&token!=null){
        await userModel.findOneAndUpdate({email},{confirmation:true})
        res.json({message:"Confirmation succeded"})

    }else{
        res.json({message:"Invalid Token"})  
    }
})


module.exports=app