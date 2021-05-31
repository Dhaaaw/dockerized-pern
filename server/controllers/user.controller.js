var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const db = require("../database");
const { Op } = require("sequelize");
const User = db.user;

const usrCtrl = {};

usrCtrl.showSearchedUsers = (req, res) => {
  User.findAll({
    where: {
      username: { [Op.startsWith]: req.params.searchValue },
    },
  })
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

usrCtrl.showEveryUser = (req, res) => {
  User.findAll()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

usrCtrl.loadUserInfo = (req, res) => {
  User.findOne({
    where: {
      id: req.body.id,
    },
  })
    .then((user) => {
      res.status(200).send({
        id: user.id,
        username: user.username,
        userlastname: user.userlastname,
        dateofbirth: user.dateofbirth,
        email: user.email,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
usrCtrl.updateInfo = (req, res) => {
  const obj = {
    username: req.body.username,
    userlastname: req.body.userlastname,
    email: req.body.email,
    dateofbirth: req.body.dateofbirth,
  };
  if (req.body.password) obj.password = bcrypt.hashSync(req.body.password, 8);
  User.update(obj, {
    where: {
      id: req.userId,
    },
    returning: true,
    plain: true,
  })
    .then((user) => {
      res.status(200).send({
        id: user[1].id,
        username: user[1].username,
        userlastname: user[1].userlastname,
        dateofbirth: user[1].dateofbirth,
        email: user[1].email,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

module.exports = usrCtrl;
