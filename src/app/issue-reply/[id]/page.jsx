import PostItem from "@/components/parts/PostItem"
import { ReplyForm } from "@/components/parts/ReplyForm"
import getSpecificIssue from "@/lib/actions/getSpecificIssue"


export default async function Page({params}) {
  const {id} = await params;

const response = await getSpecificIssue(id) ;
// console.log(response.issue[0].reply)

  return (
    <div className="max-w-2xl mx-auto p-4">
      

      <PostItem data={response.issue[0]} />

      <div className="mt-8">
        <ReplyForm id={response.issue[0].id}/>
      </div>
    </div>
  )
}

