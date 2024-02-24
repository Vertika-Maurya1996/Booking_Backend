const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userBookingSchema = new Schema({
  origin:String,
  destination:String,
  pickupDate: String,
  pickupTime: String,
  price:Number,
  userID: String,
  },
  {
    collection: 'userBookingMap',
    timestamps:true,
  })

  const UserBookings = mongoose.model('UserBookings',userBookingSchema)
  module.exports= UserBookings