const { BAD_REQUEST } = require("../config/HttpStatusCodes");
const erBackFactory = require("../models/erBackFactory");
const erBackProduction = require("../models/erBackProduction");
const product = require("../models/product");
const svFixed = require("../models/svFixed");
const svFixing = require("../models/svFixing");

//Lấy ra tất cả sản phẩm đang được sửa chữa của 1 trung tâm bảo hành
const getAllFixingProduct = async (req,res) => {
    if (!req.querry.id_user) {
        return res.status(BAD_REQUEST).json({ success: 0 });
      }
    
    try {
        const fixing_product = await svFixing.find({id_user: req.querry.id_user});
    
        return res.json({
          success: 1,
          list: fixing_product
        });
    
    } catch (error) {
        console.log(error);
        return res.status(UNKNOWN).json({ success: 0});
    }
}

//Trả sản phẩm về cho đại lý
const letBackProductToAgent = async (req,res) => {
    if (!req.body.id_product) {
        return res.status(BAD_REQUEST).json({ success: 0 });
      }
    
    try {
        const fixed_product = await product.find({id_product: req.body.id_product});
        await new svFixed({
            id_product: fixed_product.id_product,
            id_user: fixed_product.id_sv,
            agent_status: "Chưa nhận"
        })

        return res.json({
          success: 1
        });
    
    } catch (error) {
        console.log(error);
        return res.status(UNKNOWN).json({ success: 0});
    }
}

//Trả sản phẩm về cho cơ sở sản xuất do không sửa được
const letBackProductToFactory = async (req,res) => {
    if (!req.body.id_product) {
        return res.status(BAD_REQUEST).json({ success: 0 });
      }
    
    try {
        const fixed_product = await product.find({id_product: req.body.id_product});
        await new erBackFactory({
            id_product: fixed_product.id_product,
            id_user: fixed_product.id_pr
        }).save();
        await product.findByIdAndUpdate({_id: req.body.id_product}, {status: "er_back_factory"});

        return res.json({
          success: 1
        });
    
    } catch (error) {
        console.log(error);
        return res.status(UNKNOWN).json({ success: 0});
    }
}

//Lấy ra tất cả sản phẩm đã sửa chữa xong của 1 trung tâm bảo hành mà chưa trả về đại lý
const getFixedProducts = async (req,res) => {
    if (!req.body.id_user) {
        return res.status(BAD_REQUEST).json({ success: 0 });
      }
    
    try {
        const fixed_product = await svFixed.find({id_user: req.body.id_user});

        return res.json({
          success: 1,
          list: fixed_product
        });
    
    } catch (error) {
        console.log(error);
        return res.status(UNKNOWN).json({ success: 0});
    }
}

module.exports = {
    getAllFixingProduct,
    getFixedProducts,
    letBackProductToAgent,
    letBackProductToFactory
}