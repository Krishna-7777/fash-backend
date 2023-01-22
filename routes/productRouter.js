const { json } = require("express");
const express = require("express");
const { ProductModel } = require("../models/product.model");

const productRouter = express.Router();

productRouter.use(express.json());

productRouter.get('/',async (ask,give)=>{
    let page=ask.query.page;
    let products=await ProductModel.find().limit(16).skip((page-1)*16);
    give.send(products);
})

productRouter.get('/:search',async (ask,give)=>{
    let page=ask.query.page||1;
    let products=await ProductModel.find({"name":{"$regex":(ask.params.search) ,$options:"i"}}).limit(16).skip((page-1)*16);
    give.send(products);
})

productRouter.post('/add', async (ask,give)=>{
    let product=new ProductModel(ask.body);
    try {
        await product.save();
    give.send({"status":true})
    } catch (error) {
        give.send({"status":false})
    }
})

productRouter.delete('/delete/:id',async (ask,give)=>{
    try {
        await ProductModel.findByIdAndDelete(ask.params.id)
    give.send({"status":true})
    } catch (error) {
        give.send({"status":false})
    }
})

productRouter.patch("/update/:id",async (ask,give)=>{
    try {
        await ProductModel.findByIdAndUpdate(ask.params.id, ask.body)
        give.send({"status":true})
    } catch (error) {
        give.send({"status":false})
    }
})

module.exports={
    productRouter
}