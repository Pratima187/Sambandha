'use client'

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import postBooking from '@/lib/actions/postBooking'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Textarea } from "@/components/ui/textarea"
import getBookingSuggestion from '@/lib/actions/getBookingSugestion'

 
export default function BookingForm({bookings}) {



  const [text, setText] = useState('')
  const [open, setOpen] = useState(false)
  const [suggestion, setSuggestion] = useState({name: "", reason: ""});
  const {toast} = useToast();
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedDoctor, setSelectedDoctor] = useState(null)


  


  const availableTimes = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']

  const doctors = [
    {
      id: 1,
      name: "Dr. Jane Smith",
      specialization: "Psychiatrist",
      image: "https://media.istockphoto.com/id/177373093/photo/indian-male-doctor.jpg?s=612x612&w=0&k=20&c=5FkfKdCYERkAg65cQtdqeO_D0JMv6vrEdPw3mX1Lkfg=",
      fees: 1000,
      info: "I am a psychiatrist, a medical doctor who specializes in understanding and treating mental health conditions. I work with individuals to diagnose their challenges, provide therapy, and prescribe medication if needed to help them live healthier lives."
    },
    {
      id: 2,
      name: "Dr. Emily Brown",
      specialization: "Counsellor",
      image: "https://media.istockphoto.com/id/497142181/photo/physician.jpg?s=612x612&w=0&k=20&c=PX_lRXXQo7lUpE1Slj2vHsiCnZZnVNF_OX99-ag6O_8=",
      fees: 1500,
      info: "I am a counselor, here to provide support and guidance as you navigate personal or emotional challenges. My role is to create a safe and understanding space where you can express yourself and find effective ways to cope."
    },
    {
      id: 3,
      name: "Dr. John Doe",
      specialization: "Life Coach",
      image: "https://media.istockphoto.com/id/1340883379/photo/young-doctor-hospital-medical-medicine-health-care-clinic-office-portrait-glasses-man.jpg?s=612x612&w=0&k=20&c=_H4VUPBkS0gEj5ZdZzQo-Hw3lMuyofJpB-P9yS92Wyw=",
      fees: 1000,
      info: "I am a life coach, dedicated to helping you set and achieve your personal or professional goals. Together, we’ll work on building your confidence, refining your decisions, and creating a path to a more fulfilling life."
    }
  ];
  
  const doctorData = [
    {
      id: 9,
      name: "Dr. Binod Dev",
      specialty: "Psychologist",
      experience: "28 years",
      expertise: "Anxiety, depression, stress management",
      description: "Dr. Binod Dev provides structured counseling for anxiety and depression using evidence-based practices.",
      image: "https://res.cloudinary.com/dblq0e8kj/image/upload/v1734203482/binod_dev_agqwep.jpg"
    },
    {
      id: 1,
      name: "Dr. Subhash Chandra Sharma",
      specialty: "Clinical Psychologist",
      experience: "25 years",
      expertise: "Human resilience, strengths-based psychology",
      description: "Dr. Subhash Chandra Sharma is a clinical psychologist with 25 years of experience. He focuses on understanding human strengths and resilience while helping individuals unlock their potential. As Chief of Clinical Services at CMCS Nepal, he has worked extensively to advance mental health care.",
      image:"https://res.cloudinary.com/dblq0e8kj/image/upload/v1734203085/subhash_chandra_sharma-1_fulcw9.jpg"
    },
    {
      id: 2,
      name: "Dr. Richa Amatya",
      specialty: "Psychiatrist",
      experience: "10+ years",
      expertise: "CBT, JPMR, psychiatric disorders including OCD, depression, schizophrenia",
      description: "Dr. Richa Amatya is an Associate Consultant Psychiatrist at Nepal Mediciti. She holds an MBBS from the University of Science and Technology, Bangladesh, and an MD in Psychiatry from Manipal College of Medical Sciences, Nepal. She is certified in TEAM-CBT and skilled in Jacobson’s Progressive Muscle Relaxation therapy (JPMR), addressing diverse conditions like OCD, anxiety, insomnia, eating disorders, and geriatric psychiatric issues.",
      image: "https://res.cloudinary.com/dblq0e8kj/image/upload/v1734203083/dr_richa_amtaya_wlljzv.jpg"
    },
    {
      id: 3,
      name: "Dr. Arun Raj Kunwar",
      specialty: "Child & Adolescent Psychiatrist",
      experience: "20+ years",
      expertise: "Child & Adolescent Psychiatry, General Psychiatry",
      description: "Dr. Arun Raj Kunwar is the first Child & Adolescent Psychiatrist in Nepal and has made significant contributions to the development of mental health services for youth. He is a former President of the Psychiatrist's Association of Nepal (PAN), the founding editor of the Journal of PAN, and currently serves at Metro Kathmandu Hospital. He earned his M.D. in Psychiatry and completed a Fellowship in Child & Adolescent Psychiatry at SUNY Upstate Medical University in Syracuse, USA.",
      image: "https://res.cloudinary.com/dblq0e8kj/image/upload/v1734203083/dr_arun_raj_kunwar_xld4pf.jpg"
    },
    {
      id: 4,
      name: "Dr. Sanjeev Chandra Gautam",
      specialty: "Clinical Psychologist and Mental Health Specialist",
      experience: "15 years",
      expertise: "Cognitive Behavioral Therapy (CBT), managing depression, anxiety, and trauma recovery",
      description: "Dr. Sanjeev Chandra Gautam is a dedicated Clinical Psychologist with 15 years of experience in the field of mental health. He is highly skilled in applying Cognitive Behavioral Therapy (CBT) to help individuals manage conditions such as depression, anxiety, and trauma-related disorders. Dr. Gautam is passionate about fostering resilience and promoting emotional well-being through evidence-based therapeutic approaches.",
      image: "https://res.cloudinary.com/dblq0e8kj/image/upload/v1734203085/dr_sanjeev_dlkwzg.png"
    },
    {
      id: 5,
      name: "Mamata Pokharel",
      specialty: "Counseling Psychologist",
      experience: "2+ years",
      expertise: "Narrative therapy, mindfulness, emotional freedom techniques",
      description: "Mamata Pokharel is a skilled counselor offering sessions based on narrative therapy and mindfulness practices.",
      image: "https://res.cloudinary.com/dblq0e8kj/image/upload/v1734203084/dr_mamta.jfif_z1fo4m.jpg"
    },
    {
      id: 6,
      name: "Karuna Kunwar",
      specialty: "Psychologist",
      experience: "18 years",
      expertise: "Stress management, mindfulness, trauma counseling",
      description: "Karuna Kunwar is a UN-certified counselor experienced in managing severe mental health issues and stress.",
      image: "https://res.cloudinary.com/dblq0e8kj/image/upload/v1734203084/karuna-Kunwar_zhfnsl.jpg"
    },
    {
      id: 7,
      name: "Prof. Dr. Sudarshan Narsingh Pradhan",
      specialty: "Consultant Neuro Psychiatrist",
      experience: "20 years",
      expertise: "Neuropsychiatric disorders, mood disorders, psychotic conditions, and neurodevelopmental issues",
      description: "Prof. Dr. Sudarshan Narsingh Pradhan is a highly respected Consultant Neuro Psychiatrist with over 30 years of experience in the field of mental health and neuroscience. He specializes in diagnosing and treating complex neuropsychiatric conditions, including mood disorders, schizophrenia, and neurodevelopmental disorders such as autism and ADHD. Dr. Pradhan is known for his compassionate approach, combining pharmacological interventions with psychotherapy to achieve the best outcomes for his patients. As an esteemed academic and clinician, he has mentored numerous young psychiatrists and contributed significantly to research and the development of mental health services in Nepal.",
      image: "https://res.cloudinary.com/dblq0e8kj/image/upload/v1734203083/dr_susdarshan_rvmrnk.jpg"
    },
    {
      id: 8,
      name: "Dr. Surendra Sherchan",
      specialty: "Consultant Psychiatrist",
      experience: "16 years",
      expertise: "Psychiatric evaluation, mood and anxiety disorders, addiction treatment, and mental health advocacy",
      description: "Dr. Surendra Sherchan is a seasoned Consultant Psychiatrist with 33 years of experience in the field of mental health care. He has dedicated his career to providing comprehensive psychiatric evaluations and personalized treatment plans for patients suffering from mood disorders, anxiety, and substance use disorders. Dr. Sherchan is an advocate for mental health awareness and has been actively involved in community outreach programs to destigmatize mental illnesses. His holistic approach combines evidence-based medical practices with compassionate care, empowering patients to achieve mental wellness and lead fulfilling lives.",
      image: "https://res.cloudinary.com/dblq0e8kj/image/upload/v1734203084/dr_surendra_sssfdb.jpg"
    },
    
  ];
  
  

  const handleButtonClick = async () => {
    console.log('Text submitted:', text)
    const result = await getBookingSuggestion(text);
    // console.log(result);
    if(result.success){
      toast({
        title: doctorData[result.suggested_doctor.doctor_id].name,
        description: result.suggested_doctor.reason
      })

    }
    else{
      toast({
        title: "OOPS",
        description: "Some error occured"
      })

    }

    
    setOpen(false);
    setText("")
  }

  

  const handleBooking = async () => {
    if(selectedTime == '' || selectedDoctor == null){
      toast({
        title: "OOPS!",
        description: "Please select time and doctor.",
        variant: "destructive"
      })
    }
    else{
      
    const data = {
      bookingDate: selectedDate.toISOString(),
      bookingTime: selectedTime,
      doctorID: selectedDoctor.toString()
    }
    const response = await postBooking(data);
// console.log(response)

    if(response.success){
      router.refresh();
      toast({
        title: "Congratulations!",
        description: "Session booked.",
      })
    }
    else{
      toast({
        title: "OOPS!",
        description: response.message,
        variant: "destructive"
      })
    }
  }
  }



  return (
    <main className="flex gap-12">
      <div className='w-1/2 grid grid-cols-2 gap-6'>
        {
          doctorData.map((item)=>{
            return(
              <Card key={item.image}>
                <CardContent className=" h-60 overflow-hidden">
                  <Image src={item.image} alt="item.name" width={200} height={200} className='w-full'/>
                  
                </CardContent>
                <CardFooter className="flex flex-col mt-2">
                  <h3 className='font-medium'>{item.name}</h3>
                  <p className='text-sm mt-2 text-gray-700'>{item.specialty}</p>
                  <p className='text-sm text-gray-700'>{item.experience}</p>
                </CardFooter>
              </Card>
            )
          })
        }

      </div>

<div className="w-1/2 mt-8 flex mx-auto justify-center gap-4">
<div className=''>

<Card className="p-4 sticky top-8">
  <div>
  <Calendar
    mode="single"
    selected={selectedDate}
    onSelect={setSelectedDate}
    className="rounded-md border"
  />
  </div>

  {/* <div> */}
  <Select onValueChange={(value) => setSelectedTime(value)}>
    <SelectTrigger className="w-full mt-4">
      <SelectValue placeholder="Select time" />
    </SelectTrigger>
    <SelectContent>
      {availableTimes.map((time) => (
        <SelectItem key={time} value={time}>{time}</SelectItem>
      ))}
    </SelectContent>
  </Select>

  <Select onValueChange={(value) => setSelectedDoctor(Number(value))}>
    <SelectTrigger className="w-full mt-4">
      <SelectValue placeholder="Select doctor" />
    </SelectTrigger>
    <SelectContent>
      {doctorData.map((doctor) => (
        <SelectItem key={doctor.id} value={doctor.id.toString()}>{doctor.name}</SelectItem>
      ))}
    </SelectContent>
  </Select>

      <Button onClick={handleBooking} className="mt-4 w-full bg-main hover:bg-purple-600">Confirm Booking</Button>

  {/* </div> */}
</Card>
<Dialog open={open} onOpenChange={setOpen}>
<DialogTrigger asChild>
<p className='text-blue-600 text-sm mt-4 underline cursor-pointer'>Ask our system for perfect counsellor?</p>

</DialogTrigger>
<DialogContent className="sm:max-w-[425px]">
  <DialogHeader>
    <DialogTitle>Enter your text</DialogTitle>
  </DialogHeader>
  <div className="grid gap-4 py-4">
    <Textarea
      placeholder="Type your message here."
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
    <Button onClick={handleButtonClick}>Submit</Button>
  </div>
</DialogContent>
</Dialog>

</div>

{/* doctor info  */}
<div className=''>
  
<Card className="sticky top-8">
  <CardHeader>
    <CardTitle>
      Your Bookings
    </CardTitle>
    <CardDescription>
      See the bookings that you made earlier.
    </CardDescription>
  </CardHeader>
  <CardContent className="flec flex-col gap-4">

  {
    bookings.length==0?
    <p>
      No bookings.
    </p>:
    bookings.map((item)=>{
      return(
        <div key={item.id} className='border rounded-md mb-2 p-4 shadow'>
          <p className='text-md'>{doctorData[item.doctorID].name}</p>
          <p className='text-sm text-gray-500 mb-4 '>{item.bookingDate} • {item.bookingTime} </p>
          <p className='text-sm text-gray-500 mb-4 '>{doctorData[item.doctorID].specialty} </p>

          <Link href={"/therapy/session/"+item.uuID} >
            <Button size="sm" className="w-full">Join Session</Button>
          </Link>  
        </div>

        )
      })
  }

  </CardContent>
  <CardFooter>
  <Link href={"/therapy/session/emergency"} >
    <Button variant="ghost" className="border border-red-500 text-red-500" >Emergency Booking</Button>
  </Link>
  </CardFooter>
</Card>





</div>

</div>

    </main>
    
  )
}

