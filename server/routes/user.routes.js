const { Router } = require("express");
const router = Router();
const verifyToken = require("../middleware/verifyAuthentification");
const {
  showEveryUser,
  showSearchedUsers,
  updateInfo,
  loadUserInfo,
} = require("../controllers/user.controller");

router.get("/api/user", showEveryUser);
router.get("/api/user/:searchValue", showSearchedUsers);
router.post("/api/userInfo/", loadUserInfo);

router.put("/api/user/update/:id", verifyToken, updateInfo);

module.exports = router;
