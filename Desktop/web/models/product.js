const mongoose = require('./database');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: String,
    id: String,
    color: String,
    namespace: String,
    status: String
})

const product = mongoose.model('product', productSchema);
module.exports = product;