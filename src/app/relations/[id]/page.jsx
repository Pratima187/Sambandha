import ChatPage from '@/components/section/ChatPage';
import RelationChats from '@/components/section/RelationChats';
import getMyRelations from '@/lib/actions/getMyRelations';
import { currentUser } from '@clerk/nextjs/server'

import Image from 'next/image';
import Ad1 from "@/../public/ad1.png"
import Ad2 from "@/../public/ad2.png"
import Ad3 from "@/../public/ad3.png"

const page = async ({params}) => {

  const {id} = await params;
  const relations = await getMyRelations();

    const user = await currentUser();
    const userID = user.id;

  return (
    <main className='px-4 flex '>

    <section className='lg:w-1/6'>
      <RelationChats data={relations.data} active={id} />
    </section>

    <section className='w-full lg:w-4/6 border-x'>
      <ChatPage userID={userID} channelID={id} />

    </section>

    <section className='lg:w-1/6'>
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