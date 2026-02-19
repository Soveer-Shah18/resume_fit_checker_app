const express = require('express')
const healthRoute = express.Router()
const healthController = require('../controllers/health.controller')

healthRoute.get('/', healthController);

module.exports = healthRoute;