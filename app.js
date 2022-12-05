const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurant_list = require('./restaurant.json') //import restaurant.json data
  
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
  console.log(show_data)
  res.render('show',{stylesheet: 'show.css', data: show_data[0]})
})


app.listen(port, () => {
  console.log(`Server is ready , http://localhost:${port}`)
})