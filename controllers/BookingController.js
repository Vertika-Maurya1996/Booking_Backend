const UserBooking = require('../models/UserBookingMap')

const confirmBookingUser = async(req,res) =>{
    console.log("req.body",req.body)
    const {origin,destination,pickup_date,pickup_time,userID} = req.body
    try{
const bookingData =new UserBooking({
    origin:origin,
    destination:destination,
    pickupDate:pickup_date,
    pickupTime:pickup_time,
    userID:userID
})
await bookingData.save()
if(!bookingData)
    res.status(400).json({status:false,message:"Something went wrong"})
else
    res.status(200).json({status:true,message:"Booking Successful",bookingID:bookingData._id})
    }
    catch(error){
        console.log("Error",error)
        res.status(500).json({message:"Internal Server Error"})
    }

}
const getBooking = async(req,res)=>{
     const {userID} = req.params
console.log("sdffg",userID)
try{
if(!userID)
{res.status(400).json({status:false,message:"Something went wrong"})
    return;
}
const bookingData = await UserBooking.find({userID:userID})
let total = bookingData.length;
res.status(200).json({status:true,data:bookingData,total:total,message:"Records found successfully"})
}
catch(error){
    console.log(error)
    res.status(500).json({message:"Internal Server Error"})
}

}
module.exports = {confirmBookingUser,getBooking}