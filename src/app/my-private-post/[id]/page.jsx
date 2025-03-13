
import PostItem from "@/components/parts/PostItem"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import getMyIssues from "@/lib/actions/getMyIssues"
import getSpecificIssue from "@/lib/actions/getSpecificIssue"
import timeAgo from "@/lib/actions/timeAgo"
import RelateButton from "@/components/parts/RelateButton"
import { currentUser } from "@clerk/nextjs/server"


export default async function Page({params}) {

  const {id} = await params;
  const response = await getSpecificIssue(id);
  // console.log(response)

  const issuerName = response.issue[0].userName;

  const user = await currentUser();
  const userID = user.id;

  return (
    <div className="max-w-2xl mx-auto p-4">

     <PostItem data={response.issue[0]} />

      <h2 className="text-2xl font-bold mt-8 mb-4">Private Suggestions</h2>
      <div className="space-y-4">

        {
          
        response.issue[0].reply.length==0?

        <div className="text-2xl font-semibold text-gray-500 py-10 text-center"> No suggestions yet.</div>

        :
        
        response.issue[0].reply.map((suggestion) => (
          <Card key={suggestion.id} className="p-4 hover:bg-green-50">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-sm">{suggestion.userName}</h3>
              • 
              <p className="text-sm text-muted-foreground">{timeAgo(suggestion.date)}</p>
            </div>
            
            <RelateButton issuerName={issuerName} userID={userID} suggestion={suggestion} />

          </div>
          <p className="mt-2 text-sm">{suggestion.message}</p>
        </Card>
        ))}

      </div>
    </div>
  )
}

