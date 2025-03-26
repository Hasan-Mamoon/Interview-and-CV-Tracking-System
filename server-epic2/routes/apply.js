import express from "express";
import multer from "multer";
import crypto from 'crypto'
import sharp from "sharp";
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand  } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

const randomImageName = (bytes =32)=> crypto.randomBytes(bytes).toString('hex') 

router.get("/image", async (req, res) => {
  const speciality = req.params;
  const client = new S3Client(clientParams);
  const command = new GetObjectCommand(getObjectParams);
  const doctors = await doctormodel.find({ speciality: speciality });
  const url = await getSignedUrl(client, command, { expiresIn: 3600 });

 
  
  if (doctors.length === 0) {
    return res.status(404).json({ message: "No doctors found with this speciality" });
  }

  res.send();
});

router.post("/apply", upload.single("image"), async (req, res) => {
  let address = req.body.address;
    if (typeof address === "string") {
      address = JSON.parse(address);
    }
  console.log("req.body",req.body)
  console.log("req.file",req.file)

  const imageName = randomImageName()
  const buffer = await sharp(req.file.buffer).resize({height:1920,width:1080,fit:"contain"}).toBuffer()
  const params = {
    Bucket: bucketName,
    Key: imageName,
    Body: buffer,
    ContentType: req.file.mimetype,
  };

  const command = new PutObjectCommand(params);
  await s3.send(command);

  
  
  try {
    const {
      email,
      cv
    } = req.body;

    const newDoctor = new doctormodel({
      email,
      cv: imageName,
      speciality,
      degree,
      experience,
      about
    });

    const savedDoctor = await newDoctor.save();

    return res
      .status(201)
      .json({ message: "Doctor added successfully", doctor: savedDoctor });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error adding doctor", error: err });
  }
});

router.get("/doctors-all", async (req, res) => {
  try {
    const doctors = await doctormodel.find({});
    console.log('doc', doctors)
   

    for(const doctor of doctors){
      const getObjectParams = {
        
        Bucket:bucketName,
        Key:doctor.image
      } 
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      doctor.image = url

    }

    if (!doctors) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    return res.status(200).json(doctors);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:speciality", async (req, res) => {
  try {
    const {speciality}  = req.params;
    console.log("sp", speciality)
    const doctors = await doctormodel.find({ speciality: speciality.toString() });

    console.log('doc', doctors)
   

    for(const doctor of doctors){
      const getObjectParams = {
        
        Bucket:bucketName,
        Key:doctor.image
      } 
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      doctor.image = url

    }

   

    if (doctors.length === 0) {
      return res.status(404).json({ message: "No doctors found with this speciality" });
    }

    return res.status(200).json(doctors);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error retrieving doctors", error: err });
  }
});

// router.put("/update/:email", async (req, res) => {
//   try {
//     const { email } = req.params; // Get the email from route parameters
//     const {

//       cv
//     } = req.body;

//     const updatedData = {
//       cv: imageName,
//       speciality,
//       degree,
//       experience,
//       about
//     };

//     // Remove undefined or null fields to prevent updating with empty values
//     // Object.keys(updatedData).forEach((key) => {
//     //   if (updatedData[key] === undefined || updatedData[key] === null) {
//     //     delete updatedData[key];
//     //   }
//     // });

//     const updatedUser = await user.findOneAndUpdate(
//       { email }, // Search for the doctor by email
//       updatedData, // Fields to update
//       { new: true } // Return the updated document
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     return res
//       .status(200)
//       .json({ message: "User updated successfully", doctor: updatedUser });
//   } catch (err) {
//     console.error(err);
//     return res
//       .status(500)
//       .json({ message: "Error updating user", error: err.message });
//   }
// });
// router.put("/update/:email", upload.single("image"),async (req, res) => {
//   try {
//     const { email } = req.params; // Get the email from route parameters
//     const { cv, speciality, degree, experience, about } = req.body;

//     const imageName = randomImageName()
//     const buffer = await sharp(req.file.buffer).resize({height:1920,width:1080,fit:"contain"}).toBuffer()
//     const params = {
//       Bucket: bucketName,
//       Key: imageName,
//       Body: buffer,
//       ContentType: req.file.mimetype,
//     };
  
//     const command = new PutObjectCommand(params);
//     await s3.send(command);
  

//     // Build updatedData dynamically, only including provided fields
//     const updatedData = {};
//     if (cv) updatedData.cv = imageName;
//     if (speciality) updatedData.speciality = speciality;
//     if (degree) updatedData.degree = degree;
//     if (experience) updatedData.experience = experience;
//     if (about) updatedData.about = about;

//     // Ensure at least one field is being updated
//     if (Object.keys(updatedData).length === 0) {
//       return res.status(400).json({ message: "No valid fields provided for update" });
//     }

//     // Update user
//     const updatedUser = await user.findOneAndUpdate(
//       { email }, // Search by email
//       { $set: updatedData }, // Update only provided fields
//       { new: true } // Return the updated document
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     return res.status(200).json({ message: "User updated successfully", user: updatedUser });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Error updating user", error: err.message });
//   }
// });

// router.put("/update/:email", upload.single("image"), async (req, res) => {
//   try {
//     const { email } = req.params;
//     const { speciality, degree, experience, about } = req.body;

//     let imageName = null;
//     if (req.file) {
//       // Generate a random image name (S3 key)
//       imageName = randomImageName();
      
//       // Process the image using sharp
//       const buffer = await sharp(req.file.buffer)
//         .resize({ height: 1920, width: 1080, fit: "contain" })
//         .toBuffer();
      
//       // Prepare S3 parameters
//       const params = {
//         Bucket: bucketName,
//         Key: imageName,
//         Body: buffer,
//         ContentType: req.file.mimetype,
//       };

//       // Upload to S3
//       const command = new PutObjectCommand(params);
//       await s3.send(command);
//     }

//     // Build the update object dynamically
//     const updatedData = {};
//     if (imageName) updatedData.cv = imageName; // Only update cv if an image was uploaded
//     if (speciality) updatedData.speciality = speciality;
//     if (degree) updatedData.degree = degree;
//     if (experience) updatedData.experience = experience;
//     if (about) updatedData.about = about;

//     // Ensure at least one field is being updated
//     if (Object.keys(updatedData).length === 0) {
//       return res.status(400).json({ message: "No valid fields provided for update" });
//     }

//     // Update the user document
//     const updatedUser = await user.findOneAndUpdate(
//       { email },
//       { $set: updatedData },
//       { new: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     return res.status(200).json({ message: "User updated successfully", user: updatedUser });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Error updating user", error: err.message });
//   }
// });

router.put("/update/:email", upload.single("image"), async (req, res) => {
  try {
    const { email } = req.params;
    const { speciality, degree, experience, about } = req.body;

    let imageName = null;
    if (req.file) {
      // Generate a random image name (S3 key)
      imageName = randomImageName();
      
      // Process the image using sharp
      const buffer = await sharp(req.file.buffer)
        .resize({ height: 1920, width: 1080, fit: "contain" })
        .toBuffer();
      
      // Prepare S3 parameters
      const params = {
        Bucket: bucketName,
        Key: imageName,
        Body: buffer,
        ContentType: req.file.mimetype,
      };

      // Upload to S3
      const command = new PutObjectCommand(params);
      await s3.send(command);
    }

    // Build the update object dynamically
    const updatedData = {};
    if (imageName) updatedData.cv = imageName; // Only update cv if an image was uploaded
    if (speciality) updatedData.speciality = speciality;
    if (degree) updatedData.degree = degree;
    if (experience) updatedData.experience = experience;
    if (about) updatedData.about = about;

    // Ensure at least one field is being updated
    if (Object.keys(updatedData).length === 0) {
      return res.status(400).json({ message: "No valid fields provided for update" });
    }

    // Update the user document
    const updatedUser = await user.findOneAndUpdate(
      { email },
      { $set: updatedData },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error updating user", error: err.message });
  }
});


router.delete("/:email", async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const doctorToDelete = await doctormodel.find({ email });


    if (!doctorToDelete) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    
    const params = {
      Bucket: bucketName,
      Key:doctorToDelete[0].image
    }

    const command = new DeleteObjectCommand(params)
    await s3.send(command)

    const deletedDoctor = await doctormodel.findOneAndDelete({ email });


    return res
      .status(200)
      .json({ message: "Doctor deleted successfully", doctor: deletedDoctor });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Error deleting doctor", error: err.message });
  }
});

export { router as applyRouter };