const express = require("express");
const jwt=require("jsonwebtoken")
const { authenticate } = require("../middlewares/auth.middleware");
const { CProductModel } = require("../models/cartproduct.model");
const { ProductModel } = require("../models/product.model");

const cartRouter=express.Router();

cartRouter.use(authenticate)

cartRouter.post('/:productID',async (ask,give)=>{
    let productID=ask.params.productID;
    let userID= await jwt.verify(ask.headers.authorization,process.env.secret);
    try {
    let cartproduct=new CProductModel({productID,userID});
        await cartproduct.save()
        give.send({msg:"product added"})
    } catch (error) {
         give.send({msg:"Error occured"})
    }
})

cartRouter.get('/',async (ask,give)=>{
    let userID= await jwt.verify(ask.headers.authorization,process.env.secret);
    try {
        let productIds= await CProductModel.find({userID});
        if(productIds.length){
            let products=[];
            for(let i of productIds){
                let product= await ProductModel.findById(i.productID);
                products.push(product);
            }
            give.send(products);
        }else{
            give.send([]);
        }
       
    } catch (error) {
        give.send({msg:"Something went Wrong"})
    }
})

module.exports={
    cartRouter
}