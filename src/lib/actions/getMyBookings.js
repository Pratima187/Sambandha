"use server"

import { currentUser } from "@clerk/nextjs/server";


const getMyBookings = async (data)=>{

    const user = await currentUser();

    try {

    let details = {
        patientID: user.id, 
    }

    // console.log(details)

  
    const settings = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(details)
  };
  
    const query = await fetch(`${process.env.SERVER}/getMyBookings`, settings)
    const response = await query.json()
  
    return response

} catch (error) {
        return {
            success: false,
            message: "Some error occured"+error
        }; 
}
  }

  export default getMyBookings;