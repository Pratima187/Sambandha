
import Card1 from "@/../public/card1.svg"
import Card2 from "@/../public/card2.svg"
import Card3 from "@/../public/card3.svg"
import Feed from "@/components/section/Feed";
import IssueForm from "@/components/section/IssueForm";
import Ngo from "@/components/section/Ngo";

import Image from "next/image";

export default function Home() {

  return (
    <>
   
    <main className=' w-full px-2 md:px-6 lg:px-12 xl:px-28 md:pt-8 flex flex-col-reverse lg:flex-row gap-8 xl:gap-12 md:justify-between'>


      
    <section className="lg:w-2/3 ">

{/* 
    <section>
      <h2 className="text-2xl font-bold mb-4">Your Path to Peace at Your Fingertips</h2>
    </section> */}

    

    <section className=" flex overflow-x-scroll lg:overflow-hidden lg:grid lg:grid-cols-3 px-6 lg:px-0 gap-6 [&>div]:rounded-md">
      
      <div className="border min-w-72 lg:min-w-36 lg:h-96 p-5 lg:p-3 bg-green-100">
        <h3 className="font-medium text-2xl">Build a virtual virtual Family</h3>
      <p className="text-xs text-gray-600 pt-2">Create a supportive virtual family for you, fostering mental well-being through connection, empathy.</p>
      <hr className="border-blue-200 mt-5" />
      <div className="w-full px-4 py-8">
        <Image src={Card1} className="w-full " alt="card1" />
      </div>
      </div>


      <div className="border min-w-72 lg:min-w-36  lg:h-96 p-5 lg:p-3 bg-blue-100">
        <h3 className="font-medium text-2xl">Blend of AI and Human solutions</h3>
      <p className="text-xs text-gray-600 pt-2">Get suggestions from our Mitra AI and major AI you know with its reply from human.</p>
      <hr className="border-blue-200 mt-5" />
      <div className="w-full px-8 py-4">
        <Image src={Card2} className="w-full " alt="card1" />
      </div>
      </div>
      
      <div className="border min-w-72  lg:min-w-36 lg:h-96 p-5 lg:p-3 bg-orange-100">
        <h3 className="font-medium text-2xl">Book Counselling Session</h3>
      <p className="text-xs text-gray-600 pt-2">Book a therapy session with psychiatrist or counsellors that matches your problem.</p>
      <hr className="border-blue-200 mt-5" />
      <div className="w-full px-8 py-4">
        <Image src={Card3} className="w-full " alt="card1" />
      </div>
      </div>

    </section>

    





      <hr className="mt-12 border-gray-300" />


      <div className="my-8 px-2 md:px-0">
        <h2 className="text-xl lg:text-3xl font-semibold ">Issues Matching Your Character
        </h2>
        
        <Feed />
      </div>

      
    </section>

    <section className="lg:w-1/3 px-2 md:px-0 pt-4 lg:pt-0">
      <IssueForm />
    </section>
  
 </main>

 <Ngo />

 <hr className="border-gray-300 mx-28 " />

<div className="py-6 px-28">
  <p className="text-gray-400 font-semibold">
    Sambandha
  </p>
  
</div>
 </>
  );
}
