import Logo from "@/../public/logo.png"
import ProfileInfo from "@/components/section/ProfileInfo"
import ProfileForm from "@/components/section/ProfileForm"
import React from 'react'
import getUser from "@/lib/actions/getUser"
import { currentUser } from "@clerk/nextjs/server"

const page = async () => {

const response = await getUser();
// console.log(response);
const data = response.success?response.data[0] : null;



  return (
    <main className='px-4 lg:px-28 py-4 '>
    {

      response.success?
      <section className="flex gap-6">
      <ProfileInfo data={data} image={Logo} />
      </section>
      :
        <section className=''>
          <ProfileForm />
        </section>
    }

    </main>
  )
}

export default page