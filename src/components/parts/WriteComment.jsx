"use client"

import React, { useState } from 'react'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import postComment from '@/lib/actions/postComment'
import { useToast } from '@/hooks/use-toast'

const WriteComment = (props) => {

    const [comment, setComment] = useState("")
    const [loading, setLoading] = useState(false);
    const {toast} = useToast();

    const handleClick = async ()=>{
        try {

          setLoading(true)
          
          const response = await postComment(props.id, comment);
          console.log(response)
    
          if(response.success){
            toast({
                title: "Congratulations !",
                description: "Commented sucessfully.",
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
          setComment('')
          setLoading(false)
        }
    }

    const handleChange = (e)=>{
        setComment(e.target.value)
    }

  return (
    <div className="mb-16">
        <h3 className="text-lg font-semibold mb-2">Write your comment</h3>
        <Textarea id="commentBox" onChange={handleChange}  placeholder="What are your thoughts?" className="w-full" />
        {
              
              !loading
              ?
              <Button className="bg-main hover:bg-purple-600 mt-2 float-right" onClick={handleClick} disabled={!comment.trim()}>
              Comment
            </Button>
              :
              <Button className="bg-main mt-2 float-right" disabled>
                  <Loader2 className=" h-4 w-4 animate-spin" />
              </Button>
          }

  </div>
  )
}

export default WriteComment