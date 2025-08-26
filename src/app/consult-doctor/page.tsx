
"use client"

import Link from "next/link"
import { ArrowLeft, Stethoscope, Hospital, CalendarDays, Video } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"


export default function ConsultDoctorPage() {

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </Button>
        <h1 className="text-xl font-bold font-headline">Consult a Doctor</h1>
        <div className="w-9"></div>
      </header>
      <main className="flex-1 p-4">
        <div className="mx-auto max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight font-headline">How would you like to consult?</h2>
          </div>
          
          <div className="space-y-4">
             <Link href="/consult-doctor/doctors-list" className="block">
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 flex items-center gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                       <Video className="h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">Online Consultation</h3>
                      <p className="text-sm text-muted-foreground">Consult from the comfort of your home.</p>
                    </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/consult-doctor/doctors-list" className="block">
               <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 flex items-center gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                      <Hospital className="h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">Offline Visit</h3>
                      <p className="text-sm text-muted-foreground">Find doctors near you for a clinic visit.</p>
                    </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          <Separator />
          
          <div>
            <h2 className="text-2xl font-semibold tracking-tight font-headline mb-4">My Appointments</h2>
            <Card className="overflow-hidden">
                <CardHeader className="flex flex-row items-center gap-4 bg-muted/50 p-4">
                    <Avatar className="h-12 w-12 border">
                        <AvatarImage src={`https://i.pravatar.cc/150?u=doc1`} />
                        <AvatarFallback>DR</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="text-base">Dr. Anil Sharma</CardTitle>
                        <CardDescription>Cardiologist</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="p-4 text-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CalendarDays className="h-4 w-4" />
                      <span>Date & Time</span>
                    </div>
                    <span className="font-semibold">25 Aug 2024, 10:30 AM</span>
                  </div>
                   <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Stethoscope className="h-4 w-4" />
                      <span>Consultation Mode</span>
                    </div>
                    <span className="font-semibold">Video Call</span>
                  </div>
                   <Button className="w-full mt-2">Join Video Call</Button>
                </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
