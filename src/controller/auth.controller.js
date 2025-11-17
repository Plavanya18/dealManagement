const logger = require("../config/logger");
const authService  = require("../service/auth.service");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    res.status(200).json(result);
  } catch (err) {
    logger.error("Login failed:", err);
    res.status(400).json({ error: err.message });
  }
};

const verifyOtpController = async (req, res) => {
  try {
    const { email, otp, ip_id, device_info } = req.body;

    const result = await authService.verifyOtp(email, otp, ip_id, device_info);

    res.status(200).json({
      message: "OTP verified successfully",
      data: {
        user_id: result.user.id,
        full_name: result.user.full_name,
        email: result.user.email,
        role_id: result.user.role_id,
        branch: result.user.branch,
        token: result.token,
      }
    });

  } catch (err) {
    logger.error("OTP verification failed:", err);
    res.status(400).json({ error: err.message });
  }
};


const changePasswordController = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ message: "Email and new password are required" });
    }

    const result = await authService.changePasswordByEmail(email, oldPassword, newPassword);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  loginController,
  verifyOtpController,
  changePasswordController,
};