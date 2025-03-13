"use client"

import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from '../ui/input'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Textarea } from '../ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { Switch } from '../ui/switch'
import postIssue from '@/lib/actions/postIssue'
// import { revalidatePath } from 'next/cache'
  


const formSchema = z.object({
    title: z.string().min(3, {
      message : "Enter proper title.",
    }),
    description: z.string().min(20, {
        message : "Text must be more than 20 characters.",
    }).max(1000, {message: "Limit exceed, less than 1000 characters allowed"}),
    preferredCharacter: z.string().min(3, {
        message : "Choose one.",
    }),
    private: z.boolean()
    
  })

const IssueForm = () => {

    const router = useRouter()
    const {toast}= useToast();
    const [loading, setLoading] = useState(false);


    

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title:"",
            description:"",
            preferredCharacter:"",
            private: false,
    },
    })


    // 2. Define a submit handler.
    async function submit(values) {
        try {
            setLoading(true);
            const response = await postIssue(values);

            console.log("in issue page", response);
            if(response.success){
                toast({
                    title: "Congratulations !",
                    description: "Issue uploaded sucessfully.",
                })
                router.push("/my-issues")
            }
            else{
                toast({
                    title: "Oops !",
                    description: response.message,
                    variant: "destructive",
                })
            }
        } catch (error) {
            console.log(error)
            toast({
                title: "Oops !",
                description: "Some error occured.",
                variant: "destructive",
            })
            
        }finally{
            setLoading(false);
        }
    }

  return (
    
    <Form {...form}>
    <form onSubmit={form.handleSubmit(submit) } className="sticky top-8 pb-8">
    <Card className="shadow-lg">
        <CardHeader>
            <CardTitle>Share your Issue</CardTitle>
            <CardDescription>Fill the details to proceed </CardDescription>
        </CardHeader>

        <CardContent>
        <div className="space-y-2">

            {/* title */}
            <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="pt-1">Title</FormLabel>
                <FormControl>
                   <Input className="placeholder:text-gray-400 font-light" placeholder="Enter Title" {...field} />
                </FormControl>
                {/* <FormDescription>
                    This is your public display name.
                </FormDescription> */}
                <FormMessage />
                </FormItem>
            )}
            />


            {/* description  */}
            <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="pt-1">Description</FormLabel>
                <FormControl>
                <Textarea
                  placeholder="Tell us more"
                  className="resize-none placeholder:text-gray-400 font-light"
                  {...field}
                />
                </FormControl>
                {/* <FormDescription>
                    This is your public display name.
                </FormDescription> */}
                <FormMessage />
                </FormItem>
            )}
            />
            

             {/* preferredCharacter */}
             <FormField
            control={form.control}
            name="preferredCharacter"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Preferred Character</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger  className="w-full" >
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                <SelectGroup>
                <SelectItem value="father">Father</SelectItem>
                  <SelectItem value="mother">Mother</SelectItem>
                  <SelectItem value="son">Son</SelectItem>
                  <SelectItem value="daughter">Daughter</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="brother">Brother</SelectItem>
                  <SelectItem value="sister">Sister</SelectItem>

                </SelectGroup>
                </SelectContent>
              </Select>
                <FormMessage />
                </FormItem>
            )}
            />

            {/* private  */}
            <FormField
            control={form.control}
            name="private"
            render={({ field }) => (
            <FormItem className="flex mt-2 flex-row items-center justify-between">
            <div>
                <FormLabel>
                Build Relation?
                </FormLabel>
            </div>
            <FormControl>
                <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                />
            </FormControl>
            </FormItem>
            )}
            />
        </div>

        </CardContent>

        <CardFooter>
            {
              
                !loading
                ?
                <div className='w-full '>
                <Button type="submit" className="w-full bg-main">Submit</Button>
                </div>
                :
                <Button className="w-full bg-main" disabled>
                    <Loader2 className=" h-4 w-4 animate-spin" />
                </Button>
            }
            
        </CardFooter>
    </Card>
    </form>
    </Form>
  )
}

export default IssueForm