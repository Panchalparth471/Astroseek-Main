const User = require("../Models/Users");
const { mailSender } = require("../Util/mailSender");
const bcrypt = require("bcrypt");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
const crypto = require("node:crypto");


/*
Logical steps for resetPasswordToken
1) Fetch email from req.body
2) Check User for this email and apply validation
3) Generate Token
4) Add token and expiration time to user
5) Create url
6) Send the mail which consists of created url
7) Return the response



*/

//resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
    try { 
        
        const { email } = req.body;
        const user = await User.findOne({email: email});
        
        if (!user)
        {
            return res.status(401).json({
                success: false,
                message: "Your email is not registered"
            });
        }

        	const token = crypto.randomBytes(20).toString("hex");
       const updatedDetails = await User.findOneAndUpdate(
			{ email: email },
			{
				token: token,
				resetPasswordExpires: Date.now() + 3600000,
			},
			{ new: true }
		);

        const url = `https://astroseek.vercel.app/update-password/${token}`;
        await mailSender( email , "Password Reset Link",passwordUpdated(url));
        


          
        return res.json({
            success: true,
            message: "Email sent successfully, please check your email and change password"
        })
      
    }
    catch (e)
    {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while reseting password"
        })
    }
}


//After user opens the link there will be page for entering new password so this controller is to save the new password

/*
Logical steps to reset password
1)Fetch password and confirmPassword from the req.body
2)Apply Validation
3)If no entry is present for token then invalid token
4)If resetPasswordExpires time is greater than date.now() that means the token is expired so check that
5)Get userdetail from user.token
6)Hash the password
7)Update the password

*/

//resetPassword

exports.resetPassword = async (req, res) => {
    try {
        const { password, confirmPassword, token} = req.body;
     

    if (!password || !confirmPassword) {
        return res.status(401).json({
            success: false,
            message:"Please fill all the details"
        });
    }

        if (password !== confirmPassword)
        {
            return res.status(500).json({
                success: false,
                message:"Passwords didnot match"
          })
        }

        const userDetails =await User.findOne({ token: token });
        if (!userDetails)
        {
            return res.json({
                success: false,
                message: "Token is invalid"
            })
        }
        
        if(!(userDetails.resetPasswordExpires > Date.now())){                 //token time check 
                return res.json({success:false,  message:'Token is expired, please regenerate your token', });    
        }

       const encryptedPassword = await bcrypt.hash(password, 10);
		await User.findOneAndUpdate(
			{ token: token },
			{ password: encryptedPassword },
			{ new: true }
		);


    return res.status(200).json({
        success: true,
        message: "Password Reset Successfully",
    });

}

    
    catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Error in reseting password"
        })
    }


}
