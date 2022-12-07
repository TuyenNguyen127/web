const mongoose = require('./database');
const { Schema } = mongoose;

const svFixedSchema = new Schema({
    id: String,
    arr: [
        {
            service_name: String,
            time:{
                type: Date,
                default: Date.now()
            }
        }
    ]
})

const svFixed = mongoose.module('sv_fixed', svFixedSchema);

module.exports = svFixed;