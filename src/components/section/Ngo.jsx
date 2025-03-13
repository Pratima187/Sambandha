import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Yoga from "@/../public/yoga.jpg"
import Fitness from "@/../public/fitness.jpg"
import Meditation from "@/../public/meditation.jpg"
import Bir from "@/../public/bir.png"

import Image from "next/image";

const Ngo = () => {
  return (
    <>
        <hr className="border-gray-300 mx-28 my-8" />

<section className="py-8  px-2 md:px-6 lg:px-12 xl:px-28 ">
 <h2 className="text-xl lg:text-3xl font-semibold">Our Partnerships and Tie-ups</h2>
 <article className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">

   <Card>
   <CardHeader className="relative">
       <div className="absolute top-2 right-4">
       <Image className="w-20 h-20 rounded-full" src={Fitness} alt="fitness" />
       </div>
       <CardTitle> Kathmandu Fitness - Gym center
       </CardTitle>
       <CardDescription> December 18, 2024
       </CardDescription>
     </CardHeader>
     <CardContent>
       <p className="leading-7 text-sm text-gray-700">Join our Fitness Gym and invest in building a healthy and happy lifestyle. Achieve your life goals with the help of our experienced trainers.
Our Facilities:
Cardio Area ,Cycling Studio ,Free Weights Area ,Weight Lifting ,Safest Lockers, Strength Area, and many more...
</p>
<div className='mt-2'>
Address: Jorpati, Kathmandu, Nepal. <br />
Phone Number: 01-4480477 <br />
</div>
     </CardContent>
     <CardFooter>
       <span className="text-sm font-medium text-blue-800 ">See offers</span>
     </CardFooter>
   </Card>

   <Card>
   <CardHeader className="relative">
       <div className="absolute top-2 right-4">
       <Image className="w-20 h-20 rounded-full" src={Yoga} alt="fitness" />
       </div>
       <CardTitle> Mindful Yoga studio
       </CardTitle>
       <CardDescription> December 18, 2024
       </CardDescription>
     </CardHeader>
     <CardContent>
       <p className="leading-7 text-sm text-gray-700">Join our 𝑺𝒕𝒂𝒓𝒕 𝒚𝒐𝒖𝒓 𝒅𝒂𝒚 𝒘𝒊𝒕𝒉 𝒆𝒏𝒆𝒓𝒈𝒚 𝒂𝒏𝒅 𝑪𝒂𝒍𝒎 𝒂𝒕 𝑴𝒊𝒏𝒅𝒇𝒖𝒍 𝒀𝒐𝒈𝒂 𝑺𝒕𝒖𝒅𝒊𝒐
Join us for peaceful Yoga Sessions every Sunday to Friday at 6 AM and 7 AM, with evening classes also available. We offer the perfect space to stretch, strengthen, and start your day with positivity.
</p>
<div className='mt-2'>
Address: Behind Maitidevi Temple <br />
Phone Number: 01-4480477 <br />
</div>
     </CardContent>
     <CardFooter>
       <span className="text-sm font-medium text-blue-800 ">See offers</span>
     </CardFooter>
   </Card>   
   
   <Card>
   <CardHeader className="relative">
       <div className="absolute top-2 right-4">
       <Image className="w-20 h-20 rounded-full" src={Meditation} alt="fitness" />
       </div>
       <CardTitle> Pragya Meditation Centre
       </CardTitle>
       <CardDescription> December 18, 2024
       </CardDescription>
     </CardHeader>
     <CardContent>
       <p className="leading-7 text-sm text-gray-700">Join our Greedy, aversive and deluded mind stops people from peaceful and happy life. Pragya Dhyan Center is place for cleaning these all and make them all happy. Om Mani Padme Hum.Pragya Meditation Center's Bhatri Youth Sadhak Group Pragya Youth Group
</p>
<div className='mt-2'>
Address: Kalimati. <br />
Phone Number: 985-1165661 <br />
</div>
     </CardContent>
     <CardFooter>
       <span className="text-sm font-medium text-blue-800 ">See offers</span>
     </CardFooter>
   </Card>

   <Card>
   <CardHeader className="relative">
       <div className="absolute top-2 right-4">
       <Image className="w-20 h-20 rounded-full" src={Bir} alt="fitness" />
       </div>
       <CardTitle> Bir Hospital
       </CardTitle>
       <CardDescription> December 18, 2024
       </CardDescription>
     </CardHeader>
     <CardContent>
       <p className="leading-7 text-sm text-gray-700">The history of hospital service in Nepal starts in the year 1889 with the establishment of Bir Hospital, the oldest hospital now providing general care to tertiary care to the people of Nepal. Bir hospital is the first teaching hospital for compounders, dresser and later nurses. 
</p>
<div className='mt-2'>
Address: Mahaboudha, Kathmandu, Nepal. <br />
Phone Number: +977-1-5321119, <br />
</div>
     </CardContent>
     <CardFooter>
       <span className="text-sm font-medium text-blue-800 ">See offers</span>
     </CardFooter>
   </Card>

 </article>
</section>
    </>
  )
}

export default Ngo