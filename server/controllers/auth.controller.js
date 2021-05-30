var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const db = require("../database");
const User = db.user;

const authCtrl = {};

authCtrl.signup = (req, res) => {
  User.create({
    username: req.body.username,
    userlastname: req.body.userlastname,
    dateofbirth: req.body.dateofbirth,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then(() => {
      res.send({ message: "User registered successfully!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

authCtrl.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 86400,
      });

      res.status(200).send({
        id: user.id,
        username: user.username,
        userlastname: user.userlastname,
        dateofbirth: user.dateofbirth,
        email: user.email,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

module.exports = authCtrl;
