"use client"

import React, { useState } from 'react'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import postComment from '@/lib/actions/postComment'
import { useToast } from '@/hooks/use-toast'
import postFeedback from '@/lib/actions/postFeedback'

const FeedbackForm = () => {

    const [comment, setComment] = useState("")
    const [loading, setLoading] = useState(false);
    const {toast} = useToast();

    const handleClick = async ()=>{
        try {

          setLoading(true)
          
          const response = await postFeedback(comment);
          console.log(response)
    
          if(response.success){
            toast({
                title: "Congratulations !",
                description: "Feedback submitted sucessfully.",
            })
          }
          else{
              toast({
                  title: "Oops !",
                  description: "Some error occured ",
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
          setComment('')
          setLoading(false)
        }
    }

    const handleChange = (e)=>{
        setComment(e.target.value)
    }

  return (
    <div className="pt-16 max-w-96">
        <h3 className="text-lg font-semibold">Write your Feedback</h3>
        <Textarea id="commentBox" onChange={handleChange}  placeholder="What are your thoughts?" className="w-full" />
        {
              
              !loading
              ?
              <Button className="bg-main hover:bg-purple-600 mt-2 float-right" onClick={handleClick} disabled={!comment.trim()}>
              Submit Feedback
            </Button>
              :
              <Button className="bg-main mt-2 float-right" disabled>
                  <Loader2 className=" h-4 w-4 animate-spin" />
              </Button>
          }

  </div>
  )
}

export default FeedbackForm