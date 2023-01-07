// 載入框架、套件工具
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
require('dotenv').config()

const restaurant_list = require('./restaurant.json') //import restaurant.json data

// 宣告
const app = express()
const port = 3000
  
// 資料庫連線設定
mongoose.set("strictQuery", false)
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

// 連線成功
db.once('open', () => { console.log('mongodb connected!')})
// 連線失敗
db.on('error', () => { console.log('connect error!')})

//view engine
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//static files
app.use(express.static('public'))

// index page
app.get('/', (req,res) => {
  res.render('index', {stylesheet: 'index.css',data: restaurant_list.results})
})

//index - search
app.get('/search', (req,res) => {
  let keyword = req.query.keyword
  let datas = restaurant_list.results.filter(item => {
    return item.name.toLowerCase().includes(keyword.toLowerCase())
  })
  let no_result = ""
  if(datas.length === 0){
    no_result = `<h2 style="text-align:center">您搜尋的關鍵字「${keyword}」，找不到相關的餐廳!!</h2>`
  }
  
  res.render('index', {stylesheet: 'index.css',data: datas, keyword:req.query.keyword, no_result})


})


//show page
app.get('/restaurants/:restaurant_id', (req,res) => {
  const show_data = restaurant_list.results.filter(item => item.id === Number(req.params.restaurant_id))
  res.render('show',{stylesheet: 'show.css', data: show_data[0]})
})


app.listen(port, () => {
  console.log(`Server is ready , http://localhost:${port}`)
})