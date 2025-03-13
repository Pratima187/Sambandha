"use server"

import { currentUser } from "@clerk/nextjs/server";


const getAllIssues = async ()=>{

    const user = await currentUser();

    let details = {
        userID: user?user.id:"none-0",
    }
    // console.log(details)

  
    const settings = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(details)
  };
  
    const query = await fetch(`${process.env.SERVER}/get_all_issues_api`, settings)
    const response = await query.json()
  
    return response
  }

  export default getAllIssues;