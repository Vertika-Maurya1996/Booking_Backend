const bcrypt = require('bcrypt');
const User = require("../models/User")
const jwt = require("jsonwebtoken");
// Registration route
const userRegister =  async (req, res) => {
  const { fullname, email, password,type } = req.body;
  try {
    // Check if user with the given email already exists
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.status(200).json({ message: 'User with this email already exists' });
    }
    
 
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      type
    });
    // Save the user to the database
    await newUser.save();
    res.status(201).json({status:true, message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({status:false, message: 'Internal server error' });
  }
}
const userLogin = async(req,res)=>{
const { email, password,type } = req.body;
let userType=Number(type)
try{

  const user = await User.findOne( {$and: [
    { email:email },
    { type: userType },
  ]});
  if(user){
    const match = await bcrypt.compare(password, user.password);
      if(!match){

        res.status(200).json({message:'Invalid credentials'});
        return;
      }
      const token = jwt.sign({ email }, 'secret');
      res.status(200).json({ token:token,userID:user._id });
  }
  else  {
    res.status(200).json({message:'Invalid credentials'});
  }
}
catch(err){
  console.log(err)
  res.status(500).json({status:false,message:"Internal server error"});
}


}
const getUserDetails = async(req,res)=>{
let {userID} = req.body
try{
    const userDetails = await User.find({_id:userID},{password:0})
    let userData = userDetails
    if(!userDetails){
      res.status(200).json({status:false,messgae:"User not found"})
      return;
    }
    res.status(200).json({status:true,userData,messgae:"Record found successfully"})
}
catch(err){
    console.log("error",err)
    res.status(500).json({status:false,message:"Internal server error"});
}
}

module.exports = {userRegister,userLogin,getUserDetails};
