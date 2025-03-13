"use server"

import { currentUser } from "@clerk/nextjs/server";


const getMyIssues = async ()=>{

  try {
  
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
  
    const query = await fetch(`${process.env.SERVER}/getMyIssues`, settings)
    const response = await query.json()
  
    return response

  } catch (error) {
    return{
      success: false,
      message: "Internal Server Error"+error
    }
  }
  }

  export default getMyIssues;