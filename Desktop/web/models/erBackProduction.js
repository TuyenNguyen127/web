const mongoose = require('./database');
const { Schema } = mongoose;

const erBackProductionSchema = new Schema({
    id: String,
    id_user: String,
    time:{
        type: Date,
        default: Date.now()
    }
})

const erBackProduction = mongoose.model('er_back_production', erBackProductionSchema);
module.exports = erBackProduction;