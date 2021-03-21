const express=require('express')
const mongoose=require('mongoose')

const morgan=require('morgan')
const bodyParser=require('body-parser')
var cors=require('cors')
const path=require('path')
require('dotenv').config()
const wordRoutes=require('./routes/word')
// app
const app=express()
// middlewares
app.use(bodyParser.json())
app.use(morgan('dev'))
if(process.env.NODE_ENV=='development'){
    app.use(cors({origin:`${process.env.CLIENT_URL}`}))
}
// if(process.env.NODE_ENV==='production'){
//     app.use(express.static(path.join(__dirname,'/build')))
//     app.get('*',(req,res)=>{
//         res.sendFile(path.resolve(__dirname, 'build','index.html'))
//     }) 
// }else{
//     app.get('/',(req,res)=>{
//         res.send('API is running')
//     })
// }y
// routing middlewares
app.use('/api',wordRoutes)
// db
mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(process.env.PORT,()=>console.log('running on port 8000')))
.catch(err=>console.log(err))