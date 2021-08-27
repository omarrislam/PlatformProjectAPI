var jwt = require('jsonwebtoken')

module.exports=(req,res,next)=>{
    const token=req.header('token')
    let decoded=  jwt.verify(token,'omarr')
try {
    if(token&&token!=undefined&&token!=null){
        if(decoded.isLoggedIn){
            req.userID=decoded.userID
            req.fname=decoded.fname
            next()
        }else{
            res.json({message:'please login first'})
        }
    }else{
        res.json({message:'invalid token '})

    }
} catch (error) {
    res.json({message:'catch error ',error})
    
}
    
}