const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 建立資料結構
const categorySchema = new Schema({
  name:{
    type: String,
    require: true
  },
  value:{
    type: String,
    require: true
  }
})

module.exports = mongoose.model('Category', categorySchema)
