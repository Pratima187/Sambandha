"use server"

import { currentUser } from "@clerk/nextjs/server";


const updateCommentAgree = async (id, type)=>{

    try{

    const user = await currentUser();

    let details = {
        commentID: id,
        change: type
    }
    // console.log(details)

  
    const settings = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(details)
  };
  
    const query = await fetch(`${process.env.SERVER}/updateCommentAgree`, settings)
    const response = await query.json()
  
    return response
}
catch(error){
    return {success:false, message: "Internal server error"+error}
}
  }

  export default updateCommentAgree;