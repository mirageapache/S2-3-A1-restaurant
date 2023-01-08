const mongoose = require('mongoose')
require('dotenv').config()

const Category = require('../category') //import category model
const category_list = [
  { name: '請選擇餐廳類型', value: 'default'},
  { name: '中東料理', value: '中東料理'},
  { name: '日本料理', value: '日本料理'},
  { name: '義式料理', value: '義式料理'},
  { name: '美式料理', value: '美式料理'},
  { name: '酒吧', value: '酒吧'},
  { name: '咖啡廳', value: '咖啡廳'},
  { name: '速食餐廳', value: '速食餐廳'}]

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.once('open', () => {
  const data = category_list
  console.log('DB connceted')
  for(let i = 0; i < data.length; i++){
    Category.create({
      name: data[i].name,
      value: data[i].value,
    })
  }
})

db.on('error', () => {
  console.log('connect error')
})
