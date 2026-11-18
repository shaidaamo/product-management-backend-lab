const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        max: 500
    },
    category:{
        type:String,
        enum: ["electronics", "food", "clothing", "furniture", "other"],
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:0.1},
    quantity:{
         type:Number,
        required:true,
        min:0
    }
},{timestamps: true})

const Product = mongoose.model("Product",productSchema)

module.exports = Product
