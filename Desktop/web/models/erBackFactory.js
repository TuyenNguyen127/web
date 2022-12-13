const mongoose = require('./database');
const { Schema } = mongoose;

const erBackFactorySchema = new Schema({
    id_product: String,
    id_user: String,
    time:{
        type: Date,
        default: Date.now()
    }
})

const erBackFactory = mongoose.model('er_back_factory', erBackFactorySchema);
module.exports = erBackFactory;