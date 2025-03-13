
"use server"

import { currentUser } from "@clerk/nextjs/server";


const postReport = async (type, id, message)=>{

    const user = await currentUser();


    try {

    let details = {
        reportedBy: user.id,
        type: type,
        message: message,
        typeID: id,
        status: "pending"
    }


  
    const settings = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(details)
  };
  
    const query = await fetch(`${process.env.SERVER}/postReport`, settings)
    const response = await query.json();
  
    return response

} catch (error) {
        return {
            success: false,
            message: "INTERNAL SERVER ERROR"+error
        }; 
}
  }

  export default postReport;