"use server"

import { currentUser } from "@clerk/nextjs/server";


const postSuggestion = async (id, message)=>{

    const user = await currentUser();


    try {

    let details = {
        issueID: id,
        repliedBy: user.id,
        message: message,
    }

    // console.log(details)

  
    const settings = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(details)
  };
  
    const query = await fetch(`${process.env.SERVER}/postIssueReply`, settings)
    const response = await query.json();
  
    return response

} catch (error) {
        return {
            success: false,
            message: "INTERNAL SERVER ERROR"+error
        }; 
}
  }

  export default postSuggestion;