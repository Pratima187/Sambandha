

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import getDoctorBookings from '@/lib/actions/getDoctorBookings'
import { currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'

export default async function Dashboard() {
    
  const response = await getDoctorBookings("1");

  return (
    <div className="px-28 py-4">
      <div className="flex items-center justify-between">
        <h2 className='text-xl mt-8 font-semibold'>Dashboard</h2>
        <Link href={"/therapy/session/emergency"} >
          <Button variant="ghost" className="border border-red-500 text-red-500" >Emergency Booking</Button>
        </Link>

      </div>

      <section className='mt-6 grid grid-cols-3 gap-6'>

        {
          response.Bookinginfo.length==0?
          <p className='text-lg font-medium py-10 text-gray-600'>You have no bookings</p>
          :
          response.Bookinginfo.map((item)=>{
            return(
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>
                    {item.userInfo.firstName} {item.userInfo.lastName}
                </CardTitle>
                <CardDescription>
                  {item.bookingDate.substring(0,10)} • {item.bookingTime.substring(0,5)}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <p className=''>Age: {item.userInfo.age}</p>
                <p className=''>Character: {item.userInfo.character}</p>

              </CardContent>
              <CardFooter>
                <Link className="w-full" href={"/therapy/session/"+item.uuID}>
                <Button className="w-full bg-main hover:bg-purple-600">
                  Join Session
                </Button>
                </Link>
              </CardFooter>
            </Card>
            )
          })
        }

      </section>




    </div>
  )
}

