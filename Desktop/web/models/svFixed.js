const mongoose = require('./database');
const { Schema } = mongoose;

const svFixedSchema = new Schema({
    id_product: String,
    id_user: String,
    agent_status: String,
    time: {
        type: Date,
        default: Date.now()
    }
})

const svFixed = mongoose.module('sv_fixed', svFixedSchema);

module.exports = svFixed;