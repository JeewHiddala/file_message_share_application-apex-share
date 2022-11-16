const express = require("express");
const router = express.Router();
const fileController = require('../controllers/file.controller');

module.exports = function () {
  router.post('/upload', fileController.uploadFile);
  return router;
}