
"use server"

import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";


const postComment = async (id, message)=>{

    const user = await currentUser();


    try {

    let details = {
        issueID: id,
        commentedBy: user.id,
        message: message,
        agree: 0,
        disagree: 0
    }

    console.log(details)

  
    const settings = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(details)
  };
  
    const query = await fetch(`${process.env.SERVER}/postComment`, settings)
    const response = await query.json();

    revalidatePath(`/public-post/${id}`);
  
    return response

} catch (error) {
        return {
            success: false,
            message: "INTERNAL SERVER ERROR"+error
        }; 
}
  }

  export default postComment;