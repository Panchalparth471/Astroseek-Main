
const Profile = require("../Models/Profile");
const User = require("../Models/Users");
const { uploadImageToCloudinary } = require("../Util/fileUploader");
/*
Here we dont create the entry cause we created profile during signup when we created the user
so profile is created simultaneously with the user

Steps for creating profile
1)Fetch data from req.body
2)Validation
3)Get the user and extract profile id from user
4)Update the profile

*/

exports.updateProfile = async (req, res) => {
    try {
        const { dob = "", about = "", gender, contactNumber} = req.body;
      const userId = req.user.id;
  


    if (!gender || !contactNumber || !userId)
    {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }

      const userDetails = await User.findById({_id:userId });
    const profileId = userDetails.additionalDetails;
    const updatedProfile = await Profile.findByIdAndUpdate({ _id:profileId }, { dob:dob, about:about, gender:gender, contactNumber:contactNumber }, { new: true });

    return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        updatedProfile
    })
    }
    
    catch (e)
    {
        console.log(e);
        res.status(500).json({
            success: false,
            message:"Error while updating profile"
        })
    }
     
}



/*

Steps for deleting account
1) Fetch id from req.user.id 
2) Find the user by id
3) Check if user exists
4) Remove the user from each course and empty the courses array in User.
5) Extract profile id then delete profile and user.

*/


//deleteAccount
exports.deleteAccount=async(req, res)=> {
    try {
   const userId = req.user.id;

        const userDetails = await User.findById(userId);
        
        if (!userDetails)
        {
            res.status(404).json({
                success: false,
                message:"User not found"
            })
        }

    const profileId = userDetails.additionalDetails;

       //Deleting the profile
        await Profile.findByIdAndDelete(profileId);

        //Removing the user from each course / Removing the user from Course.studentsEnrolled
         for (const courseId of userDetails.courses) {
    await Course.findByIdAndUpdate(courseId, {
      $pull: { enrolledUsers: userId },
    });
  }

        //Empty the courses from User schema or empty the User.courses
       await User.findByIdAndUpdate({ _id: userId },
            {
                $set: {
                    courses: []
                }
            }
        
        );

        await User.findByIdAndDelete(userId);
        
        return res.status(200).json({
            success: true,
            message:"User deleted successfully"
        })

    }
    
    catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message:"Error in deleting account"
        })
    }

}


exports.getAllUserDetails = async (req, res) => {
    try {
 
        const id = req.user.id;
        const userDetails = await User.findById({_id:id}).populate("additionalDetails").exec();

        return res.status(200).json({
            success: true,
            message: "All user details fetched",
            userDetails
        })
    }
    catch (e)
    {
        return res.status(500).json({
            success: false,
            message:"Error in getting all user details"
        })

    }
}


exports.updateDisplayPicture = async (req, res) => {
  try {
        const displayPicture = req.files.displayPicture;
      const userId = req.user.id;
      console.log("User id is ", userId);
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
        console.log(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
 