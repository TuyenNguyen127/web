const { model } = require('mongoose');
const backAgent = require('../models/backAgent');
const product = require('../models/product');
const sold = require('../models/sold');

//Lấy ra tất cả sản phẩm mới nhập về ở trong kho
const getNewProducts = async (req,res) => {
    if (!req.querry._id) {
        return res.status(BAD_REQUEST).json({ success: 0 });
    }

    try {
        const backAgents = backAgent.find({id_user: req.querry._id, agent_status: 'Đã nhận'});
        return res.json({
            success: 1,
            back_agent: backAgents 
        })
    } catch(error) {
        console.log(error);
        return res.status(BAD_REQUEST).json({ success: 0 });
    }
}

//Bán sản phẩm cho khách hàng
const letProductSold = async (req,res) => {
    if (!req.body.id || !req.body.customer || !req.body.address || !req.body.phoneNumber) {
        return res.status(BAD_REQUEST).json({ success: 0 });
    }

    try {
        const sold_ = await backAgent.findOne({id: req.body.id});
        await new sold({
            id: sold_.id,
            id_user: sold_.id_user,
            customer: req.body.customer,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address
        }).save();
        await product.findOneAndUpdate({id: req.body.id}, {status: 'Đã bán'});
         

    } catch(error) {
        console.log(error);
        return res.status(BAD_REQUEST).json({ success: 0 });
    }
}


module.exports = {
    getNewProducts,
    letProductSold,

}