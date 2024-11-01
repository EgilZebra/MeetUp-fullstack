const express = require('express');
const { RateMU } = require('./RateMU');
const route = express.Router();

route.post('/', RateMU);

module.exports = route