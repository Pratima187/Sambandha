import { Poppins } from "next/font/google";
import "./globals.css";

import {ClerkProvider} from '@clerk/nextjs'
import { Toaster } from "@/components/ui/toaster";
import NavbarDashboard from "@/components/section/NavbarDashboard";


const poppins = Poppins({
  weight: ['200', '300','400','500','600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})


export const metadata = {
  title: "SAMBANDHA",
  description: "HELPING YOUR MENTAL HEALTH JOURNEY",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={poppins.className}>

          <NavbarDashboard />
          
          {children}

          <Toaster />

        </body>
      </html>
    </ClerkProvider>
  )
}
