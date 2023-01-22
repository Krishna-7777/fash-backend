const { default: mongoose } = require("mongoose");

const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    ratings: Number,
    mrp:Number,
    brand:String,
    category:String,
    sub_category:String,
    discount:String,
    image:String
});

const ProductModel=mongoose.model('product',productSchema);

module.exports={
    ProductModel
}