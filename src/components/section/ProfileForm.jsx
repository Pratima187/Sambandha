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
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from '../ui/input'
import { useToast } from '@/hooks/use-toast'
import DocumentUpload from './DocumentUpload'
import SelfieCapture from './SelfieCapture'
import postUser from '@/lib/actions/postUser'
  


const formSchema = z.object({
    address: z.string().min(3, {
      message : "Enter proper address.",
    }),
    age: z.string().min(1, {
        message : "Enter proper age.",
    }),
    character: z.string().min(3, {
        message : "Choose one character.",
    }),
    username: z.string().min(3, {
      message : "At least 3 letters.",
  }),
    
  })

const ProfileForm = () => {

    const router = useRouter()
    const {toast}= useToast();
    const [loading, setLoading] = useState(false);
    
  const [documentImage, setDocumentImage] = useState(null);
  const [selfieImage, setSelfieImage] = useState(null);


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            address:"",
            character:"",
            age:"",
            username:""
    },
    })


    // 2. Define a submit handler.
    async function onSubmit(values) {
        
      const response = await postUser(values, documentImage, selfieImage);

      console.log(response)

      if(response.success){
        toast({
          title: "Congratulations",
          description:"Account Created Successfully"
        })
      }
      else{
        toast({
          title: "OOPS!",
          description: response.message,
          variant: "destructive"
        })
      }
        

    }

  return (
    
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} >

    <Card className="grid grid-cols-2 gap-2">

    <div>
        <CardHeader>
            <CardTitle>Verification Form</CardTitle>
            <CardDescription>Fill the details to proceed </CardDescription>
        </CardHeader>
        <CardContent>
            
        <div className="space-y-4">

           {/* username */}
           <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="pt-1">Username</FormLabel>
                <FormControl>
                   <Input className="placeholder:text-gray-400 font-light" placeholder="Main road, Nepal" {...field} />
                </FormControl>
                <FormDescription>
                    Make sure it does not disclose your identity.
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />

            {/* address */}
            <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="pt-1">Address</FormLabel>
                <FormControl>
                   <Input className="placeholder:text-gray-400 font-light" placeholder="Main road, Nepal" {...field} />
                </FormControl>
                {/* <FormDescription>
                    This is your public display name.
                </FormDescription> */}
                <FormMessage />
                </FormItem>
            )}
            />


             {/* age */}
            <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="pt-1">Age</FormLabel>
                <FormControl>
                   <Input type="number" className="placeholder:text-gray-400 font-light" placeholder="Enter Age" {...field} />
                </FormControl>
                {/* <FormDescription>
                    This is your public display name.
                </FormDescription> */}
                <FormMessage />
                </FormItem>
            )}
            />

             {/* character */}
             <FormField
            control={form.control}
            name="character"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Your Character</FormLabel>
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

            <DocumentUpload setDocumentImage={setDocumentImage} />


           
        </div>

        </CardContent>
        <CardFooter>
            {
              
                !loading
                ?
                <div className='w-full  space-y-3'>
                <Button type="submit" className="w-full bg-main hover:bg-purple-600">Submit</Button>
                </div>
                :
                <Button className="w-full bg-main " disabled>
                    <Loader2 className=" h-4 w-4 animate-spin" />
                </Button>
            }
            
        </CardFooter>

        </div>

        <div className='p-4'>
            <div className='h-full w-full'>
                 <SelfieCapture setSelfieImage={setSelfieImage} selfieImage={selfieImage} />

            </div>
        </div>
    </Card>


    </form>
    </Form>
  )
}

export default ProfileForm