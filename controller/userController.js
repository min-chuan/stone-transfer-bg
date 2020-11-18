const Ajv = require('ajv');
const userSchema = require('../validator/userValidator');
const {getUser, createUser} = require('../service/userService');
const {SuccessModel, ErrorModel} = require('../model/ResultModel');
const {userDataFail, userExistsFail, userRegisterFail, userLoginFail} = require('../config/errorConst');
const encryptData = require('../utils/crypto')



// 请求数据格式校验
const userValidator = (data) => {
    const ajv = new Ajv();
    let validate = ajv.compile(userSchema);
    const valid = validate(data);
    if(!valid){
        console.log(validate.errors);
    }
    return valid;
}

// 用户是否存在
const userExists = async (username) => {
    let users = await getUser(username);
    return users.length !== 0;
}

// 用户注册
const registerUser = async (data) => {
    const {username, password, gender} = data;
    // 数据校验
    const valid = userValidator(data);
    // 是否存在
    const exist = await userExists(username);
    if(!valid){
        return new ErrorModel(userDataFail);
    }
    if(exist){
        return new ErrorModel(userExistsFail);
    }
    if(valid && !exist){
        try {
            await createUser(username, encryptData(password), gender);
            return new SuccessModel({msg: '注册成功'});
        } catch(e){
            console.log(e);
            return new ErrorModel(userRegisterFail)
        } 
    }
}

// 用户登录
const loginUser = async (data) => {
    const {username, password} = data;
    // 是否存在
    const users = await getUser(username, encryptData(password));
    if(users.length !== 0){
        return new SuccessModel({msg: '登录成功', data: users[0]})
    } else {
        return new ErrorModel(userLoginFail);
    }
}

module.exports = {
    userValidator,
    userExists,
    registerUser,
    loginUser
}

