
"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Search } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

const doctors = [
  {
    name: "Dr. Ramesh Gupta",
    specialization: "Cardiologist",
    experience: "15 years",
    consultationFee: 1000,
    clinicName: "Gupta Heart Clinic",
    timings: "10 AM - 1 PM",
    avatar: "https://i.pravatar.cc/150?u=ramesh",
  },
  {
    name: "Dr. Priya Sharma",
    specialization: "Dermatologist",
    experience: "8 years",
    consultationFee: 750,
    clinicName: "Skin & Hair Clinic",
    timings: "11 AM - 2 PM",
    avatar: "https://i.pravatar.cc/150?u=priya",
  },
  {
    name: "Dr. Vikram Singh",
    specialization: "Orthopedic Surgeon",
    experience: "20 years",
    consultationFee: 1200,
    clinicName: "Bone & Joint Center",
    timings: "4 PM - 7 PM",
    avatar: "https://i.pravatar.cc/150?u=vikram",
  },
  {
    name: "Dr. Anjali Desai",
    specialization: "Pediatrician",
    experience: "12 years",
    consultationFee: 600,
    clinicName: "Child Health Care",
    timings: "9 AM - 12 PM",
    avatar: "https://i.pravatar.cc/150?u=anjali",
  },
  {
    name: "Dr. Sanjay Patel",
    specialization: "General Physician",
    experience: "18 years",
    consultationFee: 500,
    clinicName: "Family Health Clinic",
    timings: "Mon-Sat, 9 AM - 6 PM",
    avatar: "https://i.pravatar.cc/150?u=sanjay",
  },
];


export default function ConsultDoctorPage() {
  const [consultationType, setConsultationType] = useState("offline")

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </Button>
        <h1 className="text-xl font-bold font-headline">Consult a Doctor</h1>
        <Button variant="ghost" size="icon">
          <Search className="h-6 w-6" />
        </Button>
      </header>
      <main className="flex-1 p-4">
        <div className="mx-auto max-w-md space-y-6">
          <Card>
            <CardContent className="p-4">
              <RadioGroup
                defaultValue="offline"
                onValueChange={setConsultationType}
                className="space-y-4"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="online" id="online" />
                    <Label htmlFor="online" className="text-base">Online Consultation</Label>
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="offline" id="offline" />
                    <Label htmlFor="offline" className="text-base">Offline Clinic Visit</Label>
                  </div>
                   <p className="pl-8 text-sm text-muted-foreground mt-1">Switch Mode Anytime</p>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {doctors.map((doctor, index) => {
            const commission = doctor.consultationFee * 0.05
            const totalFee = doctor.consultationFee + commission

            return (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-24 w-24 border">
                      <AvatarImage src={doctor.avatar} />
                      <AvatarFallback>{doctor.name.charAt(4)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <h2 className="text-lg font-bold">{doctor.name}</h2>
                      <p className="text-muted-foreground">{doctor.specialization}</p>
                       <p className="text-sm text-muted-foreground">{doctor.experience} experience</p>
                       <p className="text-sm font-medium">{doctor.clinicName}</p>
                       <p className="text-xs text-muted-foreground">{doctor.timings}</p>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Doctor Fee</span>
                      <span className="font-medium">₹{doctor.consultationFee.toFixed(2)}</span>
                    </div>
                     <div className="flex justify-between">
                      <span className="text-muted-foreground">Company Commission (5%)</span>
                      <span className="font-medium">₹{commission.toFixed(2)}</span>
                    </div>
                     <div className="flex justify-between font-bold text-base">
                      <span>You Pay</span>
                      <span>₹{totalFee.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </main>
      <footer className="sticky bottom-0 z-10 border-t bg-background p-4">
        <div className="mx-auto max-w-md">
          <Button className="w-full" size="lg">Book Appointment</Button>
        </div>
      </footer>
    </div>
  )
}
