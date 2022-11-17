const Message = require('../models/message.model');
const mongoose = require("mongoose");
const crypto = require('crypto');

//create a message to db
const createMessage = async (req, res) => { 
  if (req.body) {
    const message = new Message(req.body);
    console.log('Printing Posted Message:' + message); 
    let dcryptvalue = "";

    // Decrypting using Crypto with same algorithm and 256 bit key and iV
    let decipher = crypto.createDecipheriv('aes-256-cbc', process.env.ENC_KEY, process.env.IV);
    let decrypted = decipher.update(message.message, 'base64', 'utf8');
    dcryptvalue = decrypted + decipher.final('utf8');
    
    message.message = dcryptvalue;
    console.log('Decrypted Posted Message:' + message.message); 
    await message
      .save()
      .then((data) => {
        res.status(200).send({ data: data });
      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
      });
  }
};


module.exports = {
  createMessage,

};
