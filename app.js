
const express = require('express');
const app = express()
const port = 3000

app.get("/", (req,res)=>{
  res.status(200).json("Home in server side.")
})

app.post("/",(req,res)=>{
  res.send("POST REQUEST")
})


app.listen(port,()=>{
  console.log("listening on port " + port )
})
