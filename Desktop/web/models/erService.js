const mongoose = require('./database');
const { Schema } = mongoose;

const erServiceSchema = new Schema({
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

const erService = mongoose.model('er_service', erServiceSchema);
module.exports = erService;