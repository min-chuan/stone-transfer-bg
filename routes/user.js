const express = require('express');
const router = express.Router();

const { registerUser, loginUser } = require('../controller/userController');
const { redisSet } = require('../db/redis');

const {
    USER_LOGIN,
    USER_REGISTER,
    USER_INFO,
} = require('./routerConst');

router.get(USER_LOGIN, (req, res, next) => {
    const result = await loginUser(req.body);
    if(result.code === 200){
        req.session = {
            username: result.data.username,
            password: result.data.password,
            gender: result.data.gender
        }
        await redisSet(req.userId, req.session);
    }
    return result;
})

router.post(USER_REGISTER, (req, res, next) => {
    const result = await registerUser(req.body);
    return result;
})

router.get(USER_INFO, (req, res, next) => {
    return new SuccessModel({}, '');
})

module.exports = router