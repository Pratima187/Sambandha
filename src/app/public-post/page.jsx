
import { ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import WriteComment from '@/components/parts/WriteComment'
import PostItem from '@/components/parts/PostItem'
import { Comment } from '@/components/parts/Comment'

const SAMPLE_POST = {
  id: '1',
  communityName: 'r/legal',
  author: 'Sure_Back_2542',
  timeAgo: '11 hr. ago',
  title: 'Can I force my mom to financially support me?',
  content: "Long story short, my mom (f32) kicked me (f16) out around 7 months ago. I've been staying with my grandparents and since she's been stopping by once every 2 months. I ask her for money for food, clothes, and other every day expenses and she helps with nothing. My grandparents have been complaining about the rise in utility costs as well. My grandparents are not my legal guardians and we leave in the state on Pennsylvania. Is there anything I can do to legally force her to support me financially?",
  votes: 12,
  commentCount: 35,
  comments: [
    {
      id: '1',
      author: 'Holiday_Car1015',
      content: "Your mom can't even legally kick you out at 16. Call the police for child abandonment.",
      timeAgo: '11h ago',
      votes: 70,
      replies: [
        {
          id: '2',
          author: 'Glizzygawdjesus',
          content: "This. She owes child support to your grandparents. 👌",
          timeAgo: '10h ago',
          votes: 35,
          replies: [
            {
              id: '3',
              author: 'primal_breath',
              content: "Absolutely correct. Document everything.",
              timeAgo: '10h ago',
              votes: 15
            }
          ]
        }
      ]
    }
  ]
}

export default function Page() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-4">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>


      <PostItem data={{title:SAMPLE_POST.title,createdAt: new Date(), description: SAMPLE_POST.content,id:1}} />


      <Card className="mt-4 p-4">
       <WriteComment />

        <div className="space-y-4">
          {SAMPLE_POST.comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      </Card>
    </div>
  )
}

