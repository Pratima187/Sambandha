import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Phone, MapPin, CreditCard, CheckCircle2, ImageDown, UserPen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"


export default function ProfileInfo({data, image}) {
  // console.log(data)
  return (
      <Card className="lg:w-2/3 mx-auto">
        <CardHeader className="flex flex-row items-center gap-4">
          <Image src={image} alt={data.name+" Sambandha"} className="w-20 h-20 rounded-full" />
            
          <div className="flex-1">
            <CardTitle className="text-2xl">{data.firstName + " " + data.lastName}</CardTitle>
            <CardDescription>User Information</CardDescription>
          </div>
          <Badge className={data.isVerified ? "bg-green-600 ml-auto" : "bg-orange-600 ml-auto"}>
            {data.isVerified ? (
              <><CheckCircle2 className="w-4 h-4 mr-1" /> Verified</>
            ) : (
              "Pending"
            )}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem icon={<Mail className="w-4 h-4" />} label="Email" value={data.email} />
            <InfoItem icon={<User className="w-4 h-4" />} label="Character" value={data.character} />
          </div>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoItem icon={<MapPin className="w-4 h-4" />} label="Address" value={data.address} />
            <InfoItem icon={<UserPen className="w-4 h-4" />} label="Username" value={data.userName} />
          </div>
          
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem icon={<CreditCard className="w-4 h-4" />} label="Age" value={data.age} />
            <InfoItem icon={<ImageDown className="w-4 h-4" />} label="Document" value={<Link className="underline" target="_blank" href={data.docPhoto}>See Photo</Link>} />
          </div>
          <Separator />
          <div className="text-sm text-muted-foreground">
            Submitted on: {data.createdAt.substring(0,10)}
          </div>
        </CardContent>
      </Card>
  )
}

function InfoItem({ icon, label, value }){
  return (
    <div className="flex items-center space-x-2">
      <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
        {icon}
      </div>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">{label}</p>
        <p className="text-sm text-muted-foreground">{value}</p>
      </div>
    </div>
  )
}