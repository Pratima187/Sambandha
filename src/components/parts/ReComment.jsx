'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowBigDown, ArrowBigUp, Award, MessageSquare, MoreHorizontal, Share2 } from 'lucide-react'
import timeAgo from '@/lib/actions/timeAgo'
import postReComment from '@/lib/actions/postReComment'
import { useToast } from '@/hooks/use-toast'

export function ReComment({comment}) {

  // console.log(comment)

  const [isCollapsed, setIsCollapsed] = useState(false)
  const [voteCount, setVoteCount] = useState(0)
  const [isUpvoted, setIsUpvoted] = useState(false)
  const [isDownvoted, setIsDownvoted] = useState(false)
  const [isReplyBoxOpen, setIsReplyBoxOpen] = useState(false)
  const [replyContent, setReplyContent] = useState('')

  const {toast} = useToast();

  const handleUpvote = () => {
    if (isUpvoted) {
      setVoteCount(prev => prev - 1)
      setIsUpvoted(false)
    } else {
      if (isDownvoted) {
        setVoteCount(prev => prev + 2)
        setIsDownvoted(false)
      } else {
        setVoteCount(prev => prev + 1)
      }
      setIsUpvoted(true)
    }
  }

  const handleDownvote = () => {
    if (isDownvoted) {
      setVoteCount(prev => prev + 1)
      setIsDownvoted(false)
    } else {
      if (isUpvoted) {
        setVoteCount(prev => prev - 2)
        setIsUpvoted(false)
      } else {
        setVoteCount(prev => prev - 1)
      }
      setIsDownvoted(true)
    }
  }

  const handleReply = () => {
    setIsReplyBoxOpen(!isReplyBoxOpen)
    setReplyContent('')
  }

  const submitReply = async () => {
    try {
      
      const response = await postReComment(comment.commentID, replyContent);
      console.log(response)

      if(response.success){
        toast({
            title: "Congratulations !",
            description: "Replied sucessfully.",
        })
      }
      else{
          toast({
              title: "Oops !",
              description: response.message,
              variant: "destructive",
          })
      }

      
    } catch (error) {
      toast({
        title: "Oops !",
        description: "Some error occured ",
        variant: "destructive",
    })
    console.log(error)
    } finally{
      setIsReplyBoxOpen(false)
      setReplyContent('')
    }
  }

  return (
    <div className="relative flex items-start gap-2 pb-4 mb-4">
      <Button
        variant="outline"
        size="sm"
        className="h-6 w-6 rounded-full p-0 text-xs"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? '+' : '−'}
      </Button>
      <div className="flex-1">
        <div className="flex items-start gap-2">
          <div className="w-6 h-6 rounded-full bg-gray-200" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">{comment.userName}</span>
              <span className="text-sm text-muted-foreground">• {timeAgo(comment.date)}</span>
            </div>
            {!isCollapsed && (
              <>
                <p className="text-sm mt-1">{comment.message}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center bg-muted rounded-full">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-6 w-6 rounded-l-full ${isUpvoted ? 'text-orange-500' : ''}`}
                      onClick={handleUpvote}
                    >
                      <ArrowBigUp className="h-4 w-4" />
                    </Button>
                    <span className="px-2 text-xs font-medium">{voteCount}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-6 w-6 rounded-r-full ${isDownvoted ? 'text-blue-500' : ''}`}
                      onClick={handleDownvote}
                    >
                      <ArrowBigDown className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="h-6 text-xs gap-1" onClick={handleReply}>
                    <MessageSquare className="h-3 w-3" />
                    Reply
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6 text-xs gap-1">
                    <Share2 className="h-3 w-3" />
                    Share
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </div>
                {isReplyBoxOpen && (
                  <div className="mt-2">
                    <Textarea
                      placeholder="Write your reply..."
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      className="w-full mb-2"
                    />
                    <Button onClick={submitReply}>Submit Reply</Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

