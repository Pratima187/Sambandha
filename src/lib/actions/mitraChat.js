"use server"

import { currentUser } from "@clerk/nextjs/server";


const mitraChat = async (message)=>{

    try{

    const user = await currentUser();

    let details = {
        userID: user.id,
        message: message
    }
    // console.log(details)

  
    const settings = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(details)
  };
  
    const query = await fetch(`${process.env.SERVER}/meroSathi`, settings)
    const response = await query.json()
  
    return response
}
catch(error){
    return {success:false, message: "Internal server error"+error}
}
  }

  export default mitraChat;