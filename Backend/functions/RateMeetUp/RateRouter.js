const express = require('express');
import { RateMU } from  './RateMU';
const route = express.Router();

route.post('/comment', RateMU);

module.exports = route