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

app.get('/restaurants/:restaurant_id', (req,res) => {
  const show_data = restaurant_list.results.filter(item => item.id === Number(req.params.restaurant_id))
  console.log(show_data)
  res.render('show',{stylesheet: 'show.css', data: show_data[0]})
})


app.listen(port, () => {
  console.log(`Server is ready , http://localhost:${port}`)
})