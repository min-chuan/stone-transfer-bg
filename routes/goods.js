const express = require('express');
const router = express.Router();

const {
    SuccessModel,
    ErrorModel
} = require('../model/ResultModel');

const exec = require('../db/mysql');

const {
    GOODS_LIST,
    GOODS_DETAIL,
    GOODS_EDIT,
    GOODS_NEW,
} = require('./routerConst');

router.get(GOODS_LIST, function(req, res, next) {
    return new SuccessModel({}, '');
});

router.get(GOODS_DETAIL, function(req, res, next) {
    return new SuccessModel({}, '');
});

router.get(GOODS_EDIT, function(req, res, next) {
    return new SuccessModel({}, '');
});

router.get(GOODS_NEW, function(req, res, next) {
    return new SuccessModel({}, '');
});

module.exports = router