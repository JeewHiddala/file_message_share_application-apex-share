const File = require('../models/file.model') //import file model
const CryptoJS = require('crypto-js')

exports.uploadFile = async (req, res) => {
  if (req.body) {
    let cipher_fileUrl = req.body.fileUrl
    let decrypted_fileUrl = CryptoJS.AES.decrypt(
      cipher_fileUrl,
      'secret key 123'
    )
    let file_url = JSON.parse(decrypted_fileUrl.toString(CryptoJS.enc.Utf8))
    console.log("fileUrl",file_url)

    const file = new File({
        fileUrl: file_url,
        managerId: req.body.managerId
    })
    await file
      .save()
      .then((data) => {
        res.status(200).send({ data: data })
      })
      .catch((error) => {
        res.status(500).send({ error: error.message })
      })
  }
}
