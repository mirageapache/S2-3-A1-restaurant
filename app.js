const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')

app.get('/', (req,res) => {
  res.send('initialize success')
})


app.listen(port, () => {
  console.log(`Server is ready , http://localhost:${port}`)
})