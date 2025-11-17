const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");

router.post("/login", authController.loginController);
router.post("/verify-otp", authController.verifyOtpController);
router.put("/change-password", authController.changePasswordController);

module.exports = router;