"use server"

import { currentUser } from "@clerk/nextjs/server";
import { StreamChat } from "stream-chat";



const buildRelation = async (issuerName, suggestion, issueToken, suggestionToken, channelData)=>{

    const user = await currentUser();


    try {     

    let details = {
        relationName: suggestion.userName + " " + issuerName,
        issueUser: user.id,
        suggestionUser: suggestion.repliedBy,
        issueToken: issueToken,
        suggestionToken: suggestionToken,
        // channel: JSON.stringify(newChannel),
        channel: channelData
    }

    console.log(details)

  
    const settings = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(details)
  };
  
    const query = await fetch(`${process.env.SERVER}/buildRelation`, settings)
    const response = await query.json();

    console.log("response of build relation",response);
  
    return response

} catch (error) {
        return {
            success: false,
            message: "INTERNAL SERVER ERROR"+error
        }; 
}
  }

  export default buildRelation;