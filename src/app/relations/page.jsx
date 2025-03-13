
import RelationChats from '@/components/section/RelationChats';
import getMyRelations from '@/lib/actions/getMyRelations';
import { currentUser } from '@clerk/nextjs/server'
import { Smile } from 'lucide-react';
import Image from 'next/image';
import Ad1 from "@/../public/ad1.png"
import Ad2 from "@/../public/ad2.png"
import Ad3 from "@/../public/ad3.png"

import React from 'react'
import { ChannelList } from 'stream-chat-react';

const page = async ({params}) => {

  const {id} = await params;
    // get relations through user id 
    const user = await currentUser();
    const userID = user.id;

    const relations = await getMyRelations();


  return (
    <main className='px-4 flex '>

        <section className='w-1/6'>
        <RelationChats data={relations.data} active={"none"} />
        </section>

        <section className='w-4/6 border-x py-10 px-4 h-[600px]'>

        <div className='border rounded-3xl w-full h-full flex gap-4 flex-col items-center justify-center'>
          <p className='text-2xl font-semibold text-gray-600'>Select a chat to continue</p>
          <Smile size={50} className='text-gray-600' />

        </div>

        </section>

        <section className='w-1/6'>
          <div className='p-4 space-y-4'>
            <Image src={Ad1} className='w-full rounded-lg shadow-md' alt='ad 1' />
            <Image src={Ad2} className='w-full rounded-lg shadow-md' alt='ad 2' />
            <Image src={Ad3} className='w-full rounded-lg shadow-md' alt='ad 3' />
          </div>
            
        </section>

    </main>
  )
}

export default page