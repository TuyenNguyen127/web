const mongoose = require('./database');
const { Schema } = mongoose;

const backAgentSchema = new Schema({
    id: String,
    id_user: String,
    agent: String,
    agent_status: String,
    time:{
        type: Date,
        default: Date.now()
    }
})

const backAgent = mongoose.model('back_agent', backAgentSchema);

module.exports = backAgent;