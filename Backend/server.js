const express = require('express')
const app = express()
const dotenv = require('dotenv')
const connectDB=require('./Database/connection')
const morgan = require('morgan')
const userRouter = require('./Router/userRouter')
const cors=require('cors')


dotenv.config({path:'.env'})
const port=5000


//Mongodb Connect 
connectDB()


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors({  
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
}));


app.use(morgan('dev'))
app.use("/",userRouter)

app.listen(port,()=>console.log(`server running on http://localhost:${port}`))