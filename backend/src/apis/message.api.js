const express = require("express");
const router = express.Router();
const messageController = require('../controllers/message.controller');

module.exports = function () { 
  router.post('/create', messageController.createMessage);
  
  return router;
}