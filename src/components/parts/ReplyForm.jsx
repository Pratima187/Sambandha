'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import postSuggestion from '@/lib/actions/postSuggestion'
import { Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function ReplyForm(props) {
  const [suggestion, setSuggestion] = useState('')
  const [loading, setLoading] = useState(false);
  const {toast} = useToast();



  const handleSubmit = async (e) => {

    try {

      setLoading(true)
      
      const response = await postSuggestion(props.id, suggestion);
      console.log(response)

      if(response.success){
        toast({
            title: "Congratulations !",
            description: "Suggestion submitted sucessfully.",
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
      setSuggestion('')
      setLoading(false)
    }

  }

  return (
    <Card className="p-4">
        <h3 className="text-lg font-semibold mb-2">Leave a Suggestion</h3>
        <Textarea
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
          placeholder="Your suggestion here..."
          className="w-full mb-2"
          rows={4}
        />

        
        {
              
              !loading
              ?
              <Button className="bg-main hover:bg-purple-600" onClick={handleSubmit} disabled={!suggestion.trim()}>
              Submit Suggestion
            </Button>
              :
              <Button className="bg-main" disabled>
                  <Loader2 className=" h-4 w-4 animate-spin" />
              </Button>
          }
          

    </Card>
  )
}

