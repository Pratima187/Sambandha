"use server"

import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";


const postIssue = async (data)=>{

    const user = await currentUser();

    if(!user || !user.id){
        return {
            success:false,
            message: "Log in is required."
        }
    }

    try {

    let details = {
        issuedBy: user.id,
        title: data.title,
        description: data.description,
        preferredCharacter: data.preferredCharacter,
        gotRelation: false,
        private: data.private,
    }

    // console.log(details)

  
    const settings = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(details)
  };
  
    const query = await fetch(`${process.env.SERVER}/issue_api`, settings)
    const response = await query.json()
   console.log(response)

    revalidatePath("/my-issues");
  
    return response

} catch (error) {
        return {
            success: false,
            message: "Internal server error"+error
        }; 
}
  }

  export default postIssue;