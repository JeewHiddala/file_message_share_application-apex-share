const config = require('../config/auth.config')
const User = require('../models/user.model') //import user model
const Role = require('../models/role.model') //import role model
const bcrypt = require('bcrypt');
const saltRounds = 10;

var jwt = require('jsonwebtoken')

exports.signup = (req, res) => {

  let password = req.body.password;
  let bycryptedPassword = bcrypt.hashSync(password, saltRounds);

  const user = new User({
    userName: req.body.userName,
    password: bycryptedPassword,
  })

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }

    if (req.body.role) {
      Role.findOne(
        {
          name: req.body.role,
        },
        (err, role) => {
          if (err) {
            res.status(500).send({ message: err })
            return
          }

          user.role = role._id

          user
            .save()
            .then((data) => {
              res
                .status(200)
                .send({
                  message: 'User was registered successfully!',
                  data: data,
                })
              console.log('User: ', data)
            })
            .catch((error) => {
              res.status(500).send({ error: error.message })
            })
        }
      )
    }
  })
}

exports.signin = (req, res) => {
  User.findOne({
    userName: req.body.userName,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }

    if (!user) {
      return res.status(404).send({ message: 'User Not found.' })
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid Password!',
      })
    }

    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400, // 24 hours
    })

    res.status(200).send({
      id: user._id,
      userName: user.userName,
      role: user.role,
      accessToken: token,
    })
  })
}
