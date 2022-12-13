const mongoose = require('./database');
const { Schema } = mongoose;

const svFixingSchema = new Schema({
    id_product: String,
    id_user: String,
    service_name: String,
    time: {
        type: Date,
        default: Date.now()
    }
})

const svFixing = mongoose.model('sv_fixing', svFixingSchema);
module.exports = svFixing;