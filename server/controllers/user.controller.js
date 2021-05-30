var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const db = require("../database");
const User = db.user;

const usrCtrl = {};

usrCtrl.showEveryUser = (req, res) => {};
usrCtrl.showSearchedUsers = (req, res) => {};
usrCtrl.updateInfo = (req, res) => {};
usrCtrl.deleteAcc = (req, res) => {};

module.exports = usrCtrl;
