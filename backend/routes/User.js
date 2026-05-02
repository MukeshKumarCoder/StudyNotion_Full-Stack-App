const router = require("express").Router();
const {
  login,
  signUp,
  sendOTP,
  changePassword,
  clerkSync,
} = require("../controllers/Auth");

const {
  resetPassword,
  resetPasswordToken,
} = require("../controllers/ResetPassword");

const { auth } = require("../middlewares/auth");
const { authLimiter } = require("../middlewares/rateLimit");

// Auth Routes
router.post("/login", authLimiter, login);
router.post("/signup", authLimiter, signUp);
router.post("/send-otp", authLimiter, sendOTP);
router.post("/clerk-sync", authLimiter, clerkSync);

// Change password (Authenticated)
router.post("/change-password", auth, changePassword);

// Route for generating a reset password token
router.post("/reset-password-token", authLimiter, resetPasswordToken);

// Route for resetting user's password after verification
router.post("/reset-password", authLimiter, resetPassword);

module.exports = router;
