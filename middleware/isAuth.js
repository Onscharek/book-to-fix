  const jwt = require("jsonwebtoken");
  const User = require("../model/User")
 
 
 const isAuth = async (req,res,next)=> {
    try {
        // tokenn
        const token =req.headers ["authorization"]
        if(!token){
            return res.status(401).send({errors :[{msg:"not authorized1!.."}]});
        }
        const decoded = jwt.verify (token,process.env.SECRET_KEY)  ;
    const foundUser = await User.findOne({ _id :decoded.id})
    if (!foundUser){

        return res.status(401).send({errors :[{msg:"not authorized2!.."}]});
    }
        req.User = foundUser;
        next();
    } catch (error) {
        return res.status(401).send({errors :[{msg:"not authorized3!.."}]});

        
    }
}
module.exports = isAuth;