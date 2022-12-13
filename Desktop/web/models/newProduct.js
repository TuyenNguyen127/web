const mongoose = require('./database');
const { Schema } = mongoose;

const newProductSchema = new Schema({
    id_product: String,
    id_user: String,
    producer: String,
    time:{
        type: Date,
        default: Date.now()
    }
})

const newProduct = mongoose.model('new_product', newProductSchema);
module.exports = newProduct;