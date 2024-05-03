const User = require("../Models/Users");
const Profile = require("../Models/Profile");
const jwt = require("jsonwebtoken");
const OTP = require("../Models/OTP");
const otpGenerator = require('otp-generator');
const bcrypt = require("bcrypt");

require("dotenv").config();



/*

Logical Flow of sending otp

1) Access Email from req.body.
2) Check if user already exists.
3) Generate an otp and check if its unique
4) Save the otp to database to check if the otp entered by the user matches the generated otp.

*/

//sendOTP

exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const isUser = await User.findOne({ email });

        if (isUser)
        {
            return res.status(401).json({
                success: false,
                message:"User Already Registered"
           })
        } 

        //generate otp
   
          let generatedOTP = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });   console.log("OTP generated", generatedOTP);

        // Check if otp is unique or not
        const unique = await OTP.findOne({ otp: generatedOTP });
        
        //Jab tak mujhe unique otp nai miljata tab tak mai otp generate krta rahunga;
        while (unique)
        {
            generatedOTP = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
            });
            unique = await OTP.findOne({ otp: generatedOTP });
        }

        // Create an entry for otp
        const otpBody = await OTP.create({email:email, otp:generatedOTP });
        console.log(otpBody);

        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            otpBody
        })


    }
    catch (e)
    {
        console.log(e);
        res.status(500).json({
            success: false,
            message:e.message
        })
    }
}



/*
Logical Steps of signup controller
1) Fetch all the required data from req.body.
2) If any field is empty / Validata the data.
3) Dono password ko match karlo ek toh password aur ek confirm password.
3) Check is user already exists. 
4) Find the most recent otp for the otp and validate the otp.
5) Hash the password using bcrpyt.
6) Create an entry to the database with an default profile image by dicebear.
*/


//Signup
exports.signup = async (req, res) => {
    try {
        const { email, firstName, lastName, password, accountType,otp } = req.body;
        if (!email || !firstName || !lastName || !password  || !otp)
        {
            return res.status(403).json({
                success: false,
                message:"All fields are required"
            })
        }


       

        const existingUser =await User.findOne({ email:email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message:"User Already Registered"
            })
        }

        //Find the most recent OTP
        let recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(-1);
   
        // console.log("RECENT OTP",recentOtp[0].otp);
        // Validating OTP
        if (recentOtp.length == 0)
        {
            return res.status(400).json({
                success: false,
                message:"OTP not found"
          })    
        }
       


        else if (otp != recentOtp[0].otp)
        {
            return res.status(400).json({
                success: false,
                    message:"Invalid OTP",
            })
        }
        

        // Hashing otp
        let hashedPassword;
        hashedPassword = await bcrypt.hash(password, 10);


        const image =await fetch("https://api.dicebear.com/7.x/<styleName>/svg");

        const profileDetails = await Profile.create({ dob: null, gender: null, about: null, conatactNumber: null });



        const user = await User.create({
            email:email,
            password: hashedPassword,
            
            firstName:firstName,
            lastName:lastName,
            otp:otp,
            accountType:accountType,
            additionalDetails: profileDetails,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });
        
        
        return res.status(200).json({
            success: true,
            message: "User is registered successfully",
            user
        })



    }

    catch (e)
    {
        console.log(e);
        return res.status(500).json({
            success: false,
            message:"Error during signup"
        })
    }
}

/*

Logical steps for login
1)Fetch data from req.body
2)Validate data
3)check if user exists
4)Check if password matches
5)Generate jwt token using sign() which consists of 3 args a payload,our jwt secret and other options
6)Create cookie and insert token inside the cookie and return the response

*/
exports.login = async (req, res) => {
	try {
		// Get email and password from request body
		const { email, password } = req.body;

		// Check if email or password is missing
		if (!email || !password) {
			// Return 400 Bad Request status code with error message
			return res.status(400).json({
				success: false,
				message: `Please Fill up All the Required Fields`,
			});
		}

		// Find user with provided email
		const user = await User.findOne({ email }).populate("additionalDetails");

		// If user not found with provided email
		if (!user) {
			// Return 401 Unauthorized status code with error message
			return res.status(401).json({
				success: false,
				message: `User is not Registered with Us Please SignUp to Continue`,
			});
        }
        
		// Generate JWT token and Compare Password
		if (await bcrypt.compare(password, user.password)) {
			let token = jwt.sign(
				{ email: user.email, id: user._id, accountType:user.accountType },
				process.env.JWT_SECRET,
				{
					expiresIn: "24h",
				}
			);

			// Save token to user document in database
			user.token = token;
			user.password = undefined;
			// Set cookie for token and return success response
			const options = {
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			};
			res.cookie("token", token, options).status(200).json({
				success: true,
				token,
				user,
				message: `User Login Success`,
			});
		} else {
			return res.status(401).json({
				success: false,
				message: `Password is incorrect`,
			});
		}
	} catch (error) {
		console.error(error);
		// Return 500 Internal Server Error status code with error message
		return res.status(500).json({
			success: false,
			message: `Login Failure Please Try Again`,
		});
	}
};



