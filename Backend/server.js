const express = require('express')
const app = express()
const dotenv = require('dotenv')
const connectDB=require('./Database/connection')
const morgan = require('morgan')
const userRouter = require('./Router/userRouter')
const cors=require('cors')


dotenv.config({path:'.env'})
const port=process.env.PORT


//Mongodb Connect 
connectDB()


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors({  
    origin: 'http://localhost:3000'
}));



app.use("/",userRouter)

app.listen(port,()=>console.log(`server running on http://localhost:${port}`))