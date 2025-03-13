import MitraChat from '@/components/section/MitraChat'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import loadConversation from '@/lib/actions/loadConversation'
import Image from 'next/image';
import React from 'react'

const page = async () => {

  const events = [
    {
      "title": "International Balloon Festival Nepal 2024",
      "date": "December 24 - 31",
      "location": "Chankhapur Sarangkot, Panchase Marga, Kaskikot, Nepal",
      "description": "Join us for the International Balloon Festival 2024, a thrilling 9-day event from December 24 to January 1 in Pokhara. Enjoy 30+ hot air balloons with exciting activities like Tethered Flights, Sunrise & Sunset Flights, Night Balloon Glows, Balloon Races, and daily 20-minute fireworks.   Catch live performances by Deepak Bajracharya, Raju Lama, Kuma Sagar, Rojman Deshar, Nisha Deshar, Elena Chauhan, and more! Explore exhibitions, enjoy Night Camps, and partake in other fun activities.   Ambassadors: Rajesh Hamal & Priyanka Karki.   Dates: December 24, 2024 – January 1, 2025   Location: Chankhapur, Pokhara",
      "image_url": "https://www.arkoevent.com/wp-content/uploads/2024/11/7th-Nov-2024.png"
    },
    {
      "title": "Karma Band and Kutumba Live in Kirtipur",
      "date": "December 7 | 5 PM onwards",
      "location": "Laboratory Ground",
      "description": "The vibrant musical event, Karma Band and Kutumba Live in Kirtipur, brought the heart of Nepali music to life. Held in the culturally rich neighborhood of Kirtipur, this event blended traditional folk with modern sounds, captivating a diverse crowd. Karma Band, known for their rock-influenced Nepali lyrics, performed their hits with passion, resonating deeply with the audience. Joining them, the instrumental ensemble Kutumba showcased their mastery of Nepali folk instruments, creating a mesmerizing fusion. The evening was a soulful celebration of heritage and modern artistry, highlighting Nepal’s musical depth and the enduring spirit of its traditions.",
      "image_url": "https://www.arkoevent.com/wp-content/uploads/2024/10/464643186_1108054060743326_5157430570251513813_n.jpg"
    },
  
    {
      "title": "John and the locals live in Pokhara",
      "date": "April 1 - 30",
      "location": "Rolling Stones Rock Bar, Lakeside Road, Pokhara, Nepal",
      "description": "Get ready for an electrifying night with John and The Locals, performing live in Pokhara! Known for their high-energy performances and unique blend of vibrant sounds, the band promises to deliver a memorable musical experience. With infectious rhythms and captivating melodies, they’ll take the stage and get the crowd moving. Whether you’re a longtime fan or new to their music, this live show offers a chance to experience their dynamic style up close. Set against the beautiful backdrop of Pokhara, it’s a night filled with great music, fun, and unforgettable moments. Don’t miss out on this incredible live performance!",
      "image_url": "https://www.arkoevent.com/wp-content/uploads/2024/11/467547752_1222146779648246_5204564547807234160_n.jpg"
    },
    {
      "title": "Jubin Nautiyal live in Nepal",
      "date": "December 24 - 31",
      "location": "Hyatt Place Kathmandu, Redcross Road, Kathmandu, Nepal",
      "description": "Jubin Nautiyal’s live concert in Nepal was a mesmerizing musical journey, captivating fans with his soulful voice and powerful performances. Held in the scenic backdrop of Kathmandu, the event drew thousands of music enthusiasts from all over the country. Jubin, known for his versatile singing in Bollywood, delivered an unforgettable setlist that included his chart-topping hits like “Humnava Mere,” “Tum Hi Aana,” and “Lut Gaye.” His deep connection with the audience was evident as he engaged with fans, making the evening a heartwarming celebration of music and emotions. The night left a lasting impression on all who attended, showcasing Jubin’s unmatched talent and stage presence.",
      "image_url": "https://www.arkoevent.com/wp-content/uploads/2024/10/Snapinsta.app_462261121_18286474453225339_12375823194587320_n_1080.webp"
    }
  ]

  const response = await loadConversation();
  // console.log(response)
  return (
    <main className="px-28 flex">
      <MitraChat loadedMessages={response.data || []} />

      <section className='w-1/3 p-4 '>
        <Card className="sticky top-8 h-[570px]">
          <CardHeader>
          <div className="flex gap-4 border-b pb-4">
            <div className="bg-blue-500 h-8 w-8 rounded-full"></div>
            <h2 className='text-2xl font-semibold'>Mitra</h2>
          </div>
          
          </CardHeader>
          <CardContent>
            <div className="space-y-2 w-full ">
              <div>Join events happening in your locality.</div>
              <div className="grid grid-cols-2 gap-2">
                {events.map((event)=>{
                  return(
                    <Image key={event.title} src={event.image_url} alt={event.title} width={300} height={300} />

                  )
                })
              }

              </div>

            <Button className="bg-red-500 hover:bg-red-600 w-full">Report</Button>
            <Button variant="secondary" className="w-full" >Feedback</Button>
            </div>


          </CardContent>
          <CardFooter>
          <div className="text-xs font-light text-gray-500">
            Share your thoughts with mitra and get suggestions about what people did to handle the challanges that you are currently facing.
          </div>
          </CardFooter>
        </Card>

      </section>

    </main>
  )
}

export default page