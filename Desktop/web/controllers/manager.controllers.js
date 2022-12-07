const { UNKNOWN, BAD_REQUEST } = require('../config/HttpStatusCodes');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {user, userType} = require('../models/user');
const product = require('../models/product');
const listProduct = require('../models/listProduct');
const { USERTYPE_INVALID } = require('../config/ErrorMessages');

const getAllUser = async (req, res) => {
    try {
        const users = await user.find({});
        console.log(users.length);
        return res.json({
            success: 1,
            users: users
        });
    }
    catch (error) {
        console.log(error);
        return res.status(UNKNOWN).json({success: 0})
    }
}

const getListProduct = async (req, res) => {
    await listProduct.deleteMany({namespace:'Đại lý'});
    await listProduct.deleteMany({namespace:'Cơ sở sản xuất'});
    await listProduct.deleteMany({namespace:'Trung tâm bảo hành'});

    try {
        const products = await product.find({});

        for (let i = 0; i < products.length; i++) {
            const product_ = await listProduct.find({name: products[i].name});

            if (product_.length == 0) {
                await new listProduct({
                    name: products[i].name,
                    namespace: products[i].namespace,
                    any: 1
                }).save();
            } else {
                const pd1 = await listProduct.find({name: products[i].name, namespace: products[i].namespace })
                if (pd1.length == 0) {
                    await new listProduct({
                        name: products[i].name,
                        namespace: products[i].namespace,
                        any: 1
                    }).save();
                } else {
                    await listProduct.findOneAndUpdate({name: products[i].name, namespace: products[i].namespace },{ $inc : { any : 1 } });
                } 
            }
        }

        return res.json({
            success: 1,
            listProduct: await listProduct.find({})
        });
        
    }
    catch (error) {
        console.log(error);
        return res.status(UNKNOWN).json({success: 0})
    }
}

const createAccount = async (req, res) => {
    if (!req.body.username || !req.body.password || !req.body.repassword || !req.body.user_type) {
      return res.status(BAD_REQUEST).json({ success: 0 });
    }
    if (!validator.isEmail(req.body.email)) {
      return res.status(BAD_REQUEST).json({ success: 0, errorMessage: EMAIL_INVALID });
    }
    if (req.body.password !== req.body.repassword) {
      return res.status(BAD_REQUEST).json({ success: 0, errorMessage: REPASSWORD_INCORRECT });
    }

    const ut = req.body.user_type;
    if (ut != userType.agent || ut != userType.production_unit || ut != userType.service_center) {
        return res.status(BAD_REQUEST).json({ success: 0, errorMessage: USERTYPE_INVALID });
    }
    
    try {
      const users = await user.findOne({ email: req.body.username });
      if (users) {
        return res.status(CONFLICT).json({ success: 0, errorMessage: USERNAME_EXISTS });
      }

      await new user({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        user_type: ut
      }).save();
  
  
      return res.json({ success: 1 });
    
    } catch (error) {
      res.status(UNKNOWN).json({ success: 0 });
      return console.log(error);
    }
  }

module.exports = {
    getAllUser,
    getListProduct,
    createAccount
}