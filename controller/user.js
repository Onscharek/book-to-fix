const User = require("../model/User");
const bcrypt =require("bcrypt")
const jwt= require("jsonwebtoken")

    //   register
exports.register= async (req,res)=>{
try {
    // req body
    const{name ,email ,password,phone} = req.body;
    const foundUser = await User.findOne({email});
    //   error if email exist
    if (foundUser ) {
        return res 
        .status(400)
        .send({errors:[{msg:"Email already exist please try again..."}]})
    }
    // decriptage
    
    const saltRounds = 1
    const hashedpassword= await bcrypt.hash(password,saltRounds )

    // new user declaration

    const  newUser= new User({...req.body});
    // haching pass 2
newUser.password= hashedpassword;

    // new user register
    await newUser.save();

    // token
    const token =jwt.sign(
      {  id: newUser._id ,},
      process.env.SECRET_KEY,
        {expiresIn: "84h"}
    );
     
    

    res.status(200)
    .send({msg:"registered succ...", User :newUser , token})
} catch (error) {
    res
    .status(400)
    .send({errors:[{msg:"not registared  please try again..."}]})

}}



// login

exports.login= async (req,res)=>{
   try {
    const{email ,password} = req.body;
    const foundUser = await User.findOne({email});

    if (!foundUser ) {
        return res 
        .status(400)
        .send({errors:[{msg:" Wrong email or password "}]})
    }

    const checkPassword = await bcrypt.compare ( password, foundUser.password)
if (!checkPassword)
    return res 
.status(400)
.send({errors:[{msg:" Wrong email or password"}]})


    // token
    const token =jwt.sign(
        {  id: foundUser._id ,},
        process.env.SECRET_KEY,
          {expiresIn: "84h"}
      );
       

res.status(200).send ({msg:"login succ.." , user :foundUser ,token})
   } catch (error) {
    res 
.status(400)
.send({errors:[{msg:" can not login "}]})
    
   }
};

