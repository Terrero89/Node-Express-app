
const express = require('express');
const app = express()
const port = 3000
const host = '127.0.0.1'

app.get('/api/v1/tours', (req, res) =>{
  res.send("Hello")
})


app.listen(port,()=>{
  console.log(`starting server on http://${host}/${port}` )
})
