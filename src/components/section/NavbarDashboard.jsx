"use client"

import Logo from "@/../public/logo.png"
import Image from "next/image"
import { SignedIn, SignedOut, UserButton, UserProfile } from "@clerk/nextjs"
import { Button } from "../ui/button"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import DashboardNavLinks from "../parts/DashboardNavLinks"
   
  export default function NavbarDashboard() {

    const router = useRouter();

    const pathname = usePathname();
    const url = pathname.split("/");

    const pageName = url[1]
            .split("-")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "); 

//     setTimeout(() => {
                
//     document.querySelector(".cl-userButtonTrigger")?.addEventListener("click", ()=>{
//         setTimeout(() => {
            
//             document.querySelector(".cl-userButtonPopoverActionButton__signOut").addEventListener("click", ()=>{
//                 router.push("/");
//             })
//         }, 1000);
//     })

// }, 2000);




    

    return (
        
     <nav className="relative ">

        {/* top navbar  */}
        <div className="px-2 lg:px-28 py-4 flex items-center justify-between border-b">
            
            {/* top left  */}
            <div className="flex items-center gap-2">
            <Link href="/"><Image src={Logo} className="h-8 lg:h-12 w-8 lg:w-12" alt="Rupee API" /></Link>
                <Link href="/"><h2 className="text-xl lg:text-3xl font-bold">Sambandha</h2></Link>

                <div className="flex items-center pl-8 gap-1">
                    <div className="h-5 w-5 rounded-full bg-purple-600"></div>
                    <h3 className="font-medium text-sm">{pageName==""?"Feed":pageName}</h3>
                </div>

            </div>

            {/* top right */}
            <div className="flex items-center gap-6">
                <Link href="/" className=" hidden lg:block text-sm text-gray-700">FAQ&apos;s</Link>
                <Link href="/" className=" hidden lg:block text-sm text-gray-700">Contact</Link>
                <Link href="/feedback" className=" hidden lg:block text-sm text-gray-700">Feedback</Link>

                <SignedIn>
                    <Button variant="outline" size="icon">
                    <UserButton />
                    </Button>
                </SignedIn>
                <SignedOut>
                    <Link href="/sign-in"><Button className="h-8">Log in</Button></Link>
                </SignedOut>
            </div>

        </div>


        <DashboardNavLinks  />
      
     </nav>
    )
  }