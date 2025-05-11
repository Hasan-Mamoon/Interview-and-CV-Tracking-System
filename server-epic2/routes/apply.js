import express from "express";
import multer from "multer";
import crypto from 'crypto'
import sharp from "sharp";
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand  } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { applicantm } from "../models/applicant.js";


const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg", "application/pdf"];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only images (PNG, JPG) and PDFs are allowed"));
    }
  },
});


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

// router.post("/apply", upload.single("image"), async (req, res) => {
//   let address = req.body.address;
//     if (typeof address === "string") {
//       address = JSON.parse(address);
//     }
//   console.log("req.body",req.body)
//   console.log("req.file",req.file)

//   const imageName = randomImageName()
//   const buffer = await sharp(req.file.buffer).resize({height:1920,width:1080,fit:"contain"}).toBuffer()
//   const params = {
//     Bucket: bucketName,
//     Key: imageName,
//     Body: buffer,
//     ContentType: req.file.mimetype,
//   };

//   const command = new PutObjectCommand(params);
//   await s3.send(command);

  
  
//   try {
//     const {
//       email,
//       firstname,
//       lastname,
//       status,
//       interview,
//       speciality,
//       degree,
//       experience,
//       about
//     } = req.body;

//     const newApplicant = new applicantm({
//       email,
//       firstname,
//       lastname,
//       cv: imageName,
//       status,
//       interview,
//       speciality,
//       degree,
//       experience,
//       about
//     });

//     const savedApplicant = await newApplicant.save();

//     return res
//       .status(201)
//       .json({ message: "Applicant saved successfully", applicant: savedApplicant });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Error adding doctor", error: err });
//   }
// });
router.post("/data", upload.single("cv"), async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("req.body", req.body);
    console.log("req.file", req.file);

    // Handle address field if it's a stringified object
    let address = req.body.address;
    if (typeof address === "string") {
      address = JSON.parse(address);
    }

    // Generate a unique file name
    const fileName = randomImageName();
    let buffer = req.file.buffer;

    // Check the file type and process accordingly
    if (req.file.mimetype.startsWith("image/")) {
      buffer = await sharp(buffer)
        .resize({ height: 1920, width: 1080, fit: "contain" })
        .toBuffer();
    }

    // Upload file to S3
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: buffer,
      ContentType: req.file.mimetype,
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);

    // Extract form fields
    const {
      email,
      firstname,
      lastname,
      speciality,
      degree,
      experience,
      about
    } = req.body;

    // Save applicant in DB
    const newApplicant = new applicantm({
      email,
      firstname,
      lastname,
      cv: fileName, // Stored filename in S3
      speciality,
      degree,
      experience,
      about
    });

    const savedApplicant = await newApplicant.save();

    return res.status(201).json({
      message: "Applicant saved successfully",
      applicant: savedApplicant
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error adding applicant", error: err.message });
  }
});


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


// router.delete("/:email", async (req, res) => {
//   try {
//     const { email } = req.params;

//     if (!email) {
//       return res.status(400).json({ message: "Email is required" });
//     }

//     const doctorToDelete = await doctormodel.find({ email });


//     if (!doctorToDelete) {
//       return res.status(404).json({ message: "Doctor not found" });
//     }
    
//     const params = {
//       Bucket: bucketName,
//       Key:doctorToDelete[0].image
//     }

//     const command = new DeleteObjectCommand(params)
//     await s3.send(command)

//     const deletedDoctor = await doctormodel.findOneAndDelete({ email });


//     return res
//       .status(200)
//       .json({ message: "Doctor deleted successfully", doctor: deletedDoctor });
//   } catch (err) {
//     console.error(err);
//     return res
//       .status(500)
//       .json({ message: "Error deleting doctor", error: err.message });
//   }
// });

export { router as applyRouter };