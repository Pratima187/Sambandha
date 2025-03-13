"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import { usePathname } from "next/navigation"
import { SignedIn } from "@clerk/nextjs"


const DashboardNavLinks = () => {

    const pathname = usePathname();
    const url = pathname.split("/");
    

    const navLinks= [
        {name: "Home", href: `/`},
        {name: "My Issues", href: `/my-issues`},
        {name: "Relations", href: `/relations`},
        {name: "Ask Mitra", href: `/mitra`},
        {name: "Psychiatrist", href: `/therapy`},
    ]
    

  return (
    // <div className="flex lg:justify-between items-center  lg:px-28 border-b">
    //     <div className="hidden lg:flex gap-1 items-center  ">
    //         {
    //             navLinks.map((link)=>{

    //                 const isActive = url[1] == link.href.substring(1);

    //                 return(
    //                     <Link href={link.href} key={link.href} className={isActive?"border-b-2 border-main py-2":"py-2"}>
    //                         <Button className="h-8 hover:bg-slate-100 size-sm" variant="ghost">{link.name}</Button>
    //                     </Link>
    //                 )
    //             })
    //         }
    //     </div>
    //     <SignedIn>
    //         <Link href="/profile" className={pathname=="/profile"?"border-b-2 border-main py-2":"py-2"}><Button variant="secondary" className="h-8">Profile</Button></Link>
    //     </SignedIn>
    // </div>

    <div className="flex lg:justify-between items-center lg:px-28 border-b">
  {/* Desktop Navigation */}
  <div className="hidden lg:flex gap-1 items-center">
    {navLinks.map((link) => {
      const isActive = url[1] === link.href.substring(1);

      return (
        <Link
          href={link.href}
          key={link.href}
          className={isActive ? "border-b-2 border-main py-2" : "py-2"}
        >
          <Button className="h-8 hover:bg-slate-100 size-sm" variant="ghost">
            {link.name}
          </Button>
        </Link>
      );
    })}
    
  </div>

  {/* Mobile Navigation */}
  <div className="flex lg:hidden overflow-x-scroll scrollbar-hide gap-1 items-center">
    {navLinks.map((link) => {
      const isActive = url[1] === link.href.substring(1);

      return (
        <Link
          href={link.href}
          key={link.href}
          className={isActive ? "border-b-2 border-main py-2" : "py-2"}
        >
          <Button className="h-8 hover:bg-slate-100 size-sm" variant="ghost">
            {link.name}
          </Button>
        </Link>
      );
    })}
  </div>

  {/* Profile Link */}
  <SignedIn>
    <Link
      href="/profile"
      className={
        pathname === "/profile" ? "border-b-2 border-main py-2" : "py-2"
      }
    >
      <Button variant="secondary" className="h-8">
        Profile
      </Button>
    </Link>
  </SignedIn>
</div>

  )
}

export default DashboardNavLinks