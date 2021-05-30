const { Router } = require("express");
const router = Router();
const verifyToken = require("../middleware/verifyAuthentification");
const {
  showEveryUser,
  showSearchedUsers,
  updateInfo,
  deleteAcc,
} = require("../controllers/user.controller");

router.get("/api/user", showEveryUser);
router.get("/api/user/:id", showSearchedUsers);

router.put("/api/user/update/:id", verifyToken, updateInfo);
router.delete("/api/user/delete", verifyToken, deleteAcc);

module.exports = router;
