const cloudinary = require("cloudinary").v2;

exports.uploadImageToCloudinary = async(file,folder,quality,height) => {
    const options = { folder };

    if (height)
    {
        options.height = height;
    }
    
    if (quality)
    {
        options.quality = quality;
    }
    //tempFilePath is defined in index.js in fileUpload
    options.resource_type = "auto";

    return await cloudinary.uploader.upload(file.tempFilePath,options);
}


