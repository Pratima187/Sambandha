'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { StreamVideo, StreamVideoClient, StreamCall, SpeakerLayout, CallControls, StreamTheme } from '@stream-io/video-react-sdk'

import '@stream-io/video-react-sdk/dist/css/styles.css'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'

export default function VideoCallPage({userID, token, callID}) {

  // const [client, setClient] = useState(null)
  const clientRef = useRef(null);
  const [call, setCall] = useState(null)

  

  useEffect(() => {
    const initClient = async () => { 
      // console.log("inside init")
      const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
      if (!apiKey) {
        console.error('Stream API key is not set')
        return
      }

      const userId = userID;
      // console.log("user id is:",userID)
      
      try {

        

        const callId = "123-2-3-084";
      // console.log("call id is:",callID)


        const newClient = new StreamVideoClient({
          apiKey,
          token,
          user: { id: userId, type: "default" },
        })

        clientRef.current = newClient;
        // setClient(newClient)

        const newCall = newClient.call("default", callId);

        console.log("new call is", newCall);

        await newCall.getOrCreate()
        // await newCall.join();
        setCall(newCall)
      } catch (error) {
        console.error('Error initializing client:', error)
      }
    }

    initClient()


    return () => {
       clientRef.current.disconnectUser();
    }
  }, [])

  if (!clientRef.current || !call) {
    return <div>Loading...</div>
  }

  return (
      <div className="h-[600px] mt-6">
        <StreamVideo client={clientRef.current}>
          <CallUI call={call} />
        </StreamVideo>
      </div>
  )
}

function CallUI({ call }) {
  const router = useRouter()

  useEffect(() => {
    call.join({ create: true })
    return () => {
      call.leave()
    }
  }, [call])

  return (
    <div className="h-full">
      <StreamCall call={call}>
        <StreamTheme>
          <SpeakerLayout />
          <CallControls />
          <div className='fixed right-1/3 z-50 -translate-x-2 bottom-4'>
            <Button onClick={()=>{router.push("/")}} className="rounded-full px-6 bg-red-600 hover:bg-red-500">End Call</Button>
          </div>
        </StreamTheme>
      </StreamCall>
    </div>
  )
}


