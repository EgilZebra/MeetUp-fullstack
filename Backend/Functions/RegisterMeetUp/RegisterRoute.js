const express = require('express');
const { RegisterMU, UnRegisterMU } = require('./RegisterMeetUp');
const route = express.Router();

route.post('/', RegisterMU);
route.delete('/', UnRegisterMU);

module.exports = route