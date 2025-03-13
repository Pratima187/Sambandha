"use server"



const getSpecificIssue = async (id)=>{


    let details = {
        issueID: id,
    }
    // console.log(details)

  
    const settings = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(details)
  };
  
    const query = await fetch(`${process.env.SERVER}/specificIssue`, settings)
    const response = await query.json()
  
    return response
  }

  export default getSpecificIssue;