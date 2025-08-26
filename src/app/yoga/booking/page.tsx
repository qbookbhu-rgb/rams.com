
"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Search, Video, Users, Clock, IndianRupee, MapPin } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

const yogaCenters = [
  {
    name: "Aatma Yoga Studio",
    instructor: "Priya Sharma",
    specialties: ["Hatha", "Vinyasa", "Prenatal"],
    fee: 200,
    rating: 4.9,
    location: "Lanka, Varanasi",
    timings: "7-8 AM, 6-7 PM",
    avatar: "https://i.pravatar.cc/150?u=priya-yoga",
    type: "Offline & Online"
  },
  {
    name: "Shanti Wellness Hub",
    instructor: "Rohan Gupta",
    specialties: ["Ashtanga", "Power Yoga"],
    fee: 300,
    rating: 4.7,
    location: "Sigra, Varanasi",
    timings: "6-7 AM, 7-8 PM",
    avatar: "https://i.pravatar.cc/150?u=rohan-yoga",
    type: "Offline Only"
  },
  {
    name: "Digital Yogi",
    instructor: "Anjali Singh",
    specialties: ["Meditation", "Yin Yoga", "Desk Yoga"],
    fee: 250,
    rating: 4.8,
    location: "Online",
    timings: "Flexible Schedule",
    avatar: "https://i.pravatar.cc/150?u=anjali-yoga",
    type: "Online Only"
  },
];


export default function YogaBookingPage() {
  const [classType, setClassType] = useState("all")

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </Button>
        <h1 className="text-xl font-bold font-headline">Book a Yoga Class</h1>
        <Button variant="ghost" size="icon">
          <Search className="h-6 w-6" />
        </Button>
      </header>
      <main className="flex-1 p-4">
        <div className="mx-auto max-w-md space-y-6">
          <Card>
            <CardContent className="p-4">
              <RadioGroup
                defaultValue="all"
                onValueChange={setClassType}
                className="flex items-center justify-around"
              >
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all" className="text-base">All</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="online" id="online" />
                  <Label htmlFor="online" className="text-base">Online</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="offline" id="offline" />
                  <Label htmlFor="offline" className="text-base">Offline</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {yogaCenters
            .filter(center => 
                classType === 'all' || 
                (classType === 'online' && center.type.includes('Online')) ||
                (classType === 'offline' && center.type.includes('Offline'))
            )
            .map((center, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-24 w-24 border">
                      <AvatarImage src={center.avatar} />
                      <AvatarFallback>{center.instructor.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <h2 className="text-lg font-bold">{center.name}</h2>
                      <p className="text-sm text-muted-foreground">by {center.instructor}</p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {center.specialties.map(spec => (
                            <Badge key={spec} variant="secondary">{spec}</Badge>
                        ))}
                      </div>
                      <p className="text-sm font-medium pt-1 flex items-center gap-1">
                        <MapPin className="h-4 w-4" /> {center.location}
                      </p>
                    </div>
                  </div>
                  <Separator className="my-3" />
                  <div className="grid grid-cols-2 gap-2 text-sm">
                     <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{center.timings}</span>
                     </div>
                      <div className="flex items-center gap-2">
                        <IndianRupee className="h-4 w-4 text-muted-foreground" />
                        <span>{center.fee} / class</span>
                     </div>
                      <div className="flex items-center gap-2">
                         {center.type.includes("Online") && <Video className="h-4 w-4 text-muted-foreground" />}
                         {center.type.includes("Offline") && <Users className="h-4 w-4 text-muted-foreground" />}
                         <span>{center.type}</span>
                      </div>
                       <div className="flex items-center gap-2 font-semibold text-amber-500">
                         {center.rating} ★
                      </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </main>
      <footer className="sticky bottom-0 z-10 border-t bg-background p-4">
        <div className="mx-auto max-w-md">
          <Button className="w-full" size="lg">Book a Slot</Button>
        </div>
      </footer>
    </div>
  )
}
