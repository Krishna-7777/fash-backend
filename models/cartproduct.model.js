const { default: mongoose } = require("mongoose");

const productSchema = mongoose.Schema({
    productID:String,
    userID:String
});

const CProductModel=mongoose.model('cart',productSchema);

module.exports={
    CProductModel
}