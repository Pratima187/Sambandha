"use server"

import { currentUser } from "@clerk/nextjs/server";


const getBookingSuggestion = async (text)=>{

  try {
  

    let details = {
        message: text,
    }

  
    const settings = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(details)
  };
  
    const query = await fetch(`${process.env.SERVER}/aiSuggestion`, settings)
    const response = await query.json()
  
    return response

  } catch (error) {
    return{
      success: false,
      message: "Internal Server Error"+error
    }
  }
  }

  export default getBookingSuggestion;