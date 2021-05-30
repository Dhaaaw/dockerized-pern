const { Router } = require("express");
const router = Router();
const checkDuplicateEmail = require("../middleware/verifyRegistration");
const { signup, signin } = require("../controllers/auth.controller");

router.post("/api/auth/signup", checkDuplicateEmail, signup);
router.post("/api/auth/signin", signin);

module.exports = router;
