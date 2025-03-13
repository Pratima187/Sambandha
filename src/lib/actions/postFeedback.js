
"use server"

import { currentUser } from "@clerk/nextjs/server";


const postFeedback = async ( message)=>{

    const user = await currentUser();


    try {

    let details = {
        reportedBy: user.id,
        message: message,
    }


  
    const settings = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(details)
  };
  
    const query = await fetch(`${process.env.SERVER}/postFeedback`, settings)
    const response = await query.json();
  
    return response

} catch (error) {
        return {
            success: false,
            message: "INTERNAL SERVER ERROR"+error
        }; 
}
  }

  export default postFeedback;