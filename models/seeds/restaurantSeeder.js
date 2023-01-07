const mongoose = require('mongoose')
require('dotenv').config()

const Restaurant = require('../restaurant') //import restaurant model
const restaurant_list = require('../../restaurant.json') //import restaurant.json data
const restaurant = require('../restaurant')

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.once('open', () => {
  const data = restaurant_list.results
  console.log('DB connceted')
  // console.log(data.length)
  for(let i = 0; i < data.length; i++){
    Restaurant.create({
      name: data[i].name,
      name_en: data[i].name_en,
      category: data[i].category,
      image: data[i].image,
      location: data[i].location,
      phone: data[i].phone,
      google_map: data[i].google_map,
      rating: data[i].rating,
      description: data[i].description
    })
  }
})

db.on('error', () => {
  console.log('connect error')
})
