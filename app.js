// 載入框架、套件工具
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()

const restaurant_list = require('./restaurant.json') //import restaurant.json data
const Restaurant = require('./models/restaurant.js') //import restaurant model

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

// URL解析 (body parser)
app.use(bodyParser.urlencoded({extended: true}))

// 樣板引擎(view engine)
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//static files[設定自定義檔案(js,css etc...)的載入點(public)資料夾]
app.use(express.static('public'))


// ====== 路由設定 ======
// 首頁
app.get('/', (req,res) => {
  // 從資料庫取得資料
  Restaurant.find().lean()
    .then((result) => {
      res.render('index', {index_page: true, data: result})
    }).catch((error) => {
      console.log(error)
    });
})

// 首頁-search
app.get('/search', (req,res) => {
  let keyword = req.query.keyword
  if(keyword.length === 0){
    res.redirect('/')
    return
  }

  Restaurant.find({$or: [{name: {$regex: keyword.toLowerCase()}}, {name: {$regex: keyword.toUpperCase()}}]}).lean()
    .then(result => {
      let no_result = ""
      if(result.length === 0){
        no_result = `<h2 style="text-align:center">您搜尋的關鍵字「${keyword}」，找不到相關的餐廳!!</h2>`
      }
      res.render('index', {index_page: true, data: result, keyword:req.query.keyword, no_result})
    })
    .catch(error => {
      console.log('search function error')
    })
})

// 詳細資料頁
app.get('/restaurants/:id', (req,res) => {
  const id = req.params.id
  Restaurant.findById(id).lean()
    .then((result) => {
      res.render('detail',{stylesheet: 'detail.css', data: result})
    }).catch((error) => {
      console.log(error)
    });

})

// 新增資料頁
app.get('/restaurant/create', (req, res) => {
  res.render('create', {stylesheet: 'create.css', create_page: true})
})

// 新增資料
app.post('/restaurant/create', (req, res) => {
  const data = req.body
  return Restaurant.create({ 
      name: data.name,
      name_en: data.name_en,
      category: data.category,
      image: data.image,
      location: data.location,
      phone: data.phone,
      google_map: data.google_map,
      rating: data.rating,
      description: data.description
    })
    .then(() => {res.redirect('/')})
    .catch(error => console.log(error))
})


// 監聽伺服器
app.listen(port, () => {
  console.log(`Server is ready , http://localhost:${port}`)
})