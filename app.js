
const express= require('express');
const app=express()
app.use(express.json())
const mongoose= require('mongoose');
require('dotenv').config()
const port=8050

const routes=require('./router/route')


// mongoose connection
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE,{ autoIndex: true })
        .then(()=>{console.log('Database connect successfully')})
        .catch((err)=>{console.log(err)});




app.use('/admin',routes)

// server connection 
app.listen(port,(err)=>{
    if(err){
        console.log('faild ')
    }else{
        console.log('server connect succesfully ')
    }
})








