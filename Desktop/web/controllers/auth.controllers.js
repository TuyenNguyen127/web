const bcrypt = require('bcrypt');

const { BAD_REQUEST, UNKNOWN, UNAUTHORIZED, CONFLICT } = require('../config/HttpStatusCodes');
const { EMAIL_INVALID, USERNAME_INCORRECT, PASSWORD_INCORRECT, EMAIL_EXISTS, EMAIL_ERROR, TOKEN_INCORRECT, TOKEN_EXPIRED, REPASSWORD_INCORRECT, OTP_CODE_INCORRECT } = require('../config/ErrorMessages');

const {user} = require('../models/user');
const regitEmail = require('../models/regitEmail');

const login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    if (!username || !password) {
        console.log(req.body);
        return res.status(BAD_REQUEST).json({ success: 0 });
    } 
    
    try {
        const users = await user.findOne({ username: username });
        if (!users) {
          return res.status(UNAUTHORIZED).json({ success: 0, username: username, errorMessage: USERNAME_INCORRECT });
        }
        
        const match = bcrypt.compare(password, users.password);
        if (!match) {
          return res.status(UNAUTHORIZED).json({ success: 0, errorMessage: PASSWORD_INCORRECT });
        }
    
        //const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: 24 * 60 * 60 * 1000 });
        return res.json({
          success: 1,
          id: users._id,
          username: users.username,
          user_type: users.type_user,
          profile: users.profile,
          //accessToken: token,
          redirectTo: ''
        });
      
    } catch (error) {
      res.status(UNKNOWN).json({ success: 0, djtme: 1 })
      return console.log(error);
    }
    
}

//Nhập thông tin email
const confirmEmail = async (req,res) => {
  if (!req.body.id || !req.body.email) {
    return res.status(BAD_REQUEST).json({ success: 0 });
  }

  try {
    await user.findByIdAndUpdate({id: req.body.id}, {email: req.body.email});
    await regitEmail.deleteMany({id_user: req.body.id});
    const token = 123213;
    await new regitEmail({
      id_user: req.body.id,
      otp: token
    }).save();
    return res.json({
      success: 1,
      newEmail: req.body.email
    });
  } catch (error) {
    console.log(error);
    return res.status(UNKNOWN).json({ success: 0});
  }
}

//Mã xác nhận email
const regitEmail = async (req,res) => {
  if (!req.body.id || !req.body.otp) {
    return res.status(BAD_REQUEST).json({ success: 0 });
  } 

  try {
    const regitEmail_ = regitEmail.findOne({id_user: req.body.id});
    if (!regitEmail_) {
      return res.status(UNAUTHORIZED).json({ success: 0, errorMessage: USERNAME_INCORRECT });
    }
    const match = bcrypt.compare(regitEmail_.otp, req.body.otp);
    if (match) {
      return res.json({
        success: 1,
        regit_email: true 
      });
    } else return res.json({success: 1, regit_email: false, errorMessage: OTP_CODE_INCORRECT});
  } catch (error) {
    console.log(error);
    return res.status(UNKNOWN).json({ success: 0});
  }
}

//Lấy lại mật khẩu
const forgetPassword = async (req,res) => {

}



module.exports = {
    login,
    regitEmail,
    confirmEmail,
    forgetPassword
}