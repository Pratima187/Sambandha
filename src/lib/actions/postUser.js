"use server"

import { currentUser } from "@clerk/nextjs/server";
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from "next/cache";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const postUser = async (data,docPhoto, userSelfie)=>{

    const user = await currentUser();
    // console.log(user)

    try {
        // cloudinary upload for selfie 
        const selfieUpload = await cloudinary.uploader.upload(userSelfie, {
          folder: "sambandha", 
        }, (error, result) => {
          if (error) {
            console.error("Upload error:", error);
          } else {
            return result;
          }
        });

        const userPhoto = selfieUpload.secure_url;



        //   cloudinary upload for image 
            const bytes = await docPhoto.arrayBuffer();
          const buffer = Buffer.from(bytes);

        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              { 
                folder: 'sambandha',
                quality: 'auto:eco',
                format: 'jpg',
              },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            );
            uploadStream.end(buffer);
          });

          const docUrl = result.secure_url;

            

      

    let details = {
        userID: user.id,
        userName: data.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0].emailAddress,
        verified: false,
        docPhoto: docUrl,
        userPhoto:  userPhoto || "https://images.pexels.com/photos/1416736/pexels-photo-1416736.jpeg?cs=srgb&dl=pexels-jonas-mohamadi-1416736.jpg&fm=jpg",
        character: data.character,
        age: data.age,
        address: data.address,
        createdAt: "123",
        password: "123"
    }
    console.log(details)

  
    const settings = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(details)
  };
  
    const query = await fetch(`${process.env.SERVER}/create_account_api`, settings)
    const response = await query.json()

    revalidatePath("/profile");
  
    return response

} catch (error) {
        return {
            success: false,
            message: "Internal server error"+error
        }; 
}
  }

  export default postUser;