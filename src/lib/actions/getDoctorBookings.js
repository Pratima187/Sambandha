"use server"

import { currentUser } from "@clerk/nextjs/server";


const getDoctorBookings = async (id)=>{


    try {

    let details = {
        doctorID: id, 
    }

    // console.log(details)

  
    const settings = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(details)
  };
  
    const query = await fetch(`${process.env.SERVER}/getDoctorBookings`, settings)
    const response = await query.json()
  
    return response

} catch (error) {
        return {
            success: false,
            message: "Some error occured"+error
        }; 
}
  }

  export default getDoctorBookings;