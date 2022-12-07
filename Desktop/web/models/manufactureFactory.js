const mongoose =  require('./database');
const { Schema } = mongoose;

const manufactureFactorySchema = new Schema({
    
}) 

const manufactureFactory = mongoose.model('manufactureFactory', manufactureFactorySchema);

module.exports = manufactureFactory;