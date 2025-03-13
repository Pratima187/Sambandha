"use server"

import { currentUser } from "@clerk/nextjs/server";


const getUser = async ()=>{

    const user = await currentUser();

    let details = {
        userID: user.id,
    }
    // console.log(details)

  
    const settings = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(details)
  };
  
    const query = await fetch(`${process.env.SERVER}/getUser`, settings)
    const response = await query.json()
  
    return response
  }

  export default getUser;