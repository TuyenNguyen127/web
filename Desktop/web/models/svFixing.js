const mongoose = require('./database');
const { Schema } = mongoose;

const svFixingSchema = new Schema({
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

const svFixing = mongoose.model('sv_fixing', svFixingSchema);
module.exports = svFixing;