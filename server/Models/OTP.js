const mongoose = require("mongoose");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");
const { mailSender } = require("../Util/mailSender");
const OTP =new mongoose.Schema({
    email: {
        type: String,
        required:true
    },
    otp: {
        type: String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires:5*60
    }
});

async function sendVerificationEmail(email,otp)
{
    try {
        const mailResponse = await mailSender(email, "Verification Email From AstroSeek", emailTemplate(otp));
        console.log(mailResponse);
        console.log("Email Sent Successfully",mailResponse);
    }
    
    catch (e)
    {
        console.log("Error while sending mail");
        console.log(e);

    }
}
OTP.pre("save", async function (next) {
    await sendVerificationEmail(this.email, this.otp);
    next();
})

module.exports = mongoose.model("OTP", OTP);