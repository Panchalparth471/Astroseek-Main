const Astrologer = require("../Models/Astrologer");
const cloudinary = require("cloudinary").v2;
async function uploadFileToCloudinary(file, folder,quality) {
    const options = { folder };

    
    if (quality)
    {
        options.quality = quality;
    }
    //tempFilePath is defined in index.js in fileUpload
    options.resource_type = "auto";

    return await cloudinary.uploader.upload(file.tempFilePath,options);
}

exports.createAstrologer = async (req, res) => {
  try{  const { Aboutme, name, occupation } = req.body;
    const image = req.files.image;
    

      //Checking for supported types
        const supportedTypes = ["jpg", "png", "jpeg"];

        //Removing file extension from the file name
        const fileType = `${image.name.split('.')[1]}`.toLowerCase();

        if (!supportedTypes.includes(fileType))
        {
            res.status(400).json({
                success: false,
                message:"File format not supported"
           })
        }
        
        //If file format is supported then upload to cloudinary
        const response = await uploadFileToCloudinary(image, "CodeHelp");
    console.log(response);
    
    const createdAstrologer = await Astrologer.create({ Aboutme: Aboutme, name: name, occupation: occupation, image: response.secure_url });

   return  res.status(200).json({
            success: true,
            message: "Astrologer successfully created",
            Astrologer:createdAstrologer
   });
  
    }
    
     catch (e)
    {
        console.error(e);
        res.status(400).json({
            success: false,
            message:"Something went wrong"
        })
    }
}

exports.getAllAstrologers = async (req, res) => {
    try {
        const Astrologers = await Astrologer.find({});
        return res.json({
            success: true,
            message: "All astrologers fetched",
            astrologers: Astrologers
        })
    }
    catch (e) {
        console.error(e);
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
}


    exports.fetchAstrologer = async (req, res) => {
        try {
            const { name }  = req.body;
            const requiredAstrologer = await Astrologer.findOne({ name: name });
            if (!requiredAstrologer)
            {
                return res.status(404).json({
                    success: false,
                    message:"No such Astrologer found"
                })
            }
            
            return res.status(200).json({
                success: true,
                message: "Astrologer fetched",
                astro:requiredAstrologer
            })
        }


        catch (e)
        {
             console.error(e);
        res.status(500).json({
            success: false,
            message:"Something went wrong"
        })
        }
    }
