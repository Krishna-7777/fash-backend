const express=require("express");
const cors=require("cors");

const { authenticate } = require("./middlewares/auth.middleware");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/userRouter");
const { productRouter } = require("./routes/productRouter");
const { cartRouter } = require("./routes/cartRouter");
require("dotenv").config();

const app=express();
app.use(cors());

app.get('/',(ask,give)=>{
    give.send('Welcome to Fash.com Backend')
})

app.use('/user',userRouter);
app.use('/products',productRouter )
app.use('/cart',cartRouter)

app.listen(process.env.port,()=>{
    try {
        connection
        console.log(`Connected to the DB and server is running at ${process.env.port}`)
    } catch (error) {
        console.log(error);
        console.log("Error in connecting to the DB")
    }
})