"use server"

import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import {v4 as uuidv4} from 'uuid';



const postBooking = async (data)=>{
    
    const user = await currentUser();
    const myuuid = uuidv4();

    try {

    let details = {
        patientID: user.id, 
        bookingDate: data.bookingDate, 
        bookingTime: data.bookingTime,
        doctorID: data.doctorID, 
        payment: false,
        status: "pending",
        uuID: myuuid
    }

    console.log(details)

  
    const settings = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(details)
  };
  
    const query = await fetch(`${process.env.SERVER}/postBookings`, settings)
    const response = await query.json();
  
    return response

} catch (error) {
        return {
            success: false,
            message: "Some error occured"+error
        }; 
}
  }

  export default postBooking;