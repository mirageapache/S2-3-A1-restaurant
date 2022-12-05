const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')

//view engine
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//static files
app.use(express.static('public'))

// index page
app.get('/', (req,res) => {
  // res.send('initialize success')
  res.render('index', {stylesheet: 'index.css'})
})



app.listen(port, () => {
  console.log(`Server is ready , http://localhost:${port}`)
})