const express = require("express");

const { auth, isPerson, isAdmin } = require("../Middlewares/Auth");
const { sendOTP, signup, login, changePassword } = require("../Controllers/auth");
const { updateProfile, deleteAccount, getAllUserDetails,updateDisplayPicture } = require("../Controllers/Profiles");
const { resetPasswordToken, resetPassword } = require("../Controllers/ResetPassword");
const { createAstrologer, getAllAstrologers, fetchAstrologer } = require("../Controllers/Astrologer");
const { scrapeHoroscope } = require("../Controllers/Horoscope");
const { scrapeCompatibility } = require("../Controllers/Compatibility");



const router = express.Router();


// ********************************************************************************************************
//                                      Profile
// ********************************************************************************************************


router.put("/updateProfile", auth, updateProfile);
router.delete("/deleteAccount", auth, deleteAccount);
router.get("/getAllUserDetails", auth, getAllUserDetails);
router.put("/updateDisplayPicture",auth, updateDisplayPicture);


// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/login", login);

// Route for user signup
router.post("/signup", signup)

// Route for sending OTP to the user's email
router.post("/sendotp", sendOTP)


// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)


module.exports = router;

// ********************************************************************************************************
//                                      Astrologer Password
// ********************************************************************************************************

router.post("/create-astrologer", createAstrologer);
router.get("/getAllAstrologers", getAllAstrologers);
router.post("/fetch-astrologer", fetchAstrologer);
router.post("/horoscope", scrapeHoroscope);
router.post("/compatibility", scrapeCompatibility);