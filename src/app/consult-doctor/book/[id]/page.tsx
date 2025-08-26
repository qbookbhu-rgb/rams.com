
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar as CalendarIcon, Clock, CreditCard, User, Video } from "lucide-react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Doctor } from "@/lib/types/doctors"
import { format } from "date-fns"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"


export default function BookAppointmentPage({ params }: { params: { id: string } }) {
  const [doctor, setDoctor] = useState<Doctor | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [consultationMode, setConsultationMode] = useState("offline")
  const [date, setDate] = useState<Date | undefined>(new Date())

  useEffect(() => {
    if (!params.id) return
    
    const fetchDoctor = async () => {
      setLoading(true)
      setError(null)
      try {
        const docRef = doc(db, "doctors", params.id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setDoctor({ id: docSnap.id, ...docSnap.data() } as Doctor)
        } else {
          setError("Doctor not found.")
        }
      } catch (e) {
        console.error("Error fetching doctor: ", e)
        setError("Failed to load doctor details.")
      } finally {
        setLoading(false)
      }
    }

    fetchDoctor()
  }, [params.id])

  if (loading) {
    return <BookingSkeleton />
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>
  }

  if (!doctor) {
    return <p>No doctor found.</p>
  }
  
  const commission = doctor.consultationFee * 0.05
  const totalFee = doctor.consultationFee + commission

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/consult-doctor">
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </Button>
        <h1 className="text-xl font-bold font-headline">Confirm Appointment</h1>
        <div className="w-9"></div>
      </header>
      <main className="flex-1 p-4">
        <div className="mx-auto max-w-md space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border">
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${doctor.id}`} />
                  <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{doctor.name}</CardTitle>
                  <CardDescription>{doctor.specialization}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-base font-semibold">Select Consultation Mode</Label>
                 <RadioGroup
                    defaultValue="offline"
                    onValueChange={setConsultationMode}
                    className="mt-2 flex gap-4"
                >
                    <Label className="flex cursor-pointer items-center gap-2 rounded-md border p-3 flex-1 has-[:checked]:bg-primary has-[:checked]:text-primary-foreground has-[:checked]:border-primary">
                        <RadioGroupItem value="offline" id="offline" className="sr-only" />
                        <User className="h-5 w-5" /> In-Clinic
                    </Label>
                     <Label className="flex cursor-pointer items-center gap-2 rounded-md border p-3 flex-1 has-[:checked]:bg-primary has-[:checked]:text-primary-foreground has-[:checked]:border-primary">
                        <RadioGroupItem value="online" id="online" className="sr-only" />
                        <Video className="h-5 w-5" /> Video Call
                    </Label>
                </RadioGroup>
              </div>

               <div>
                <Label className="text-base font-semibold">Select Date & Time Slot</Label>
                 <div className="mt-2 grid grid-cols-1 gap-2">
                    <Popover>
                        <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                        />
                        </PopoverContent>
                    </Popover>
                    <Button variant="outline" className="flex-1">
                        <Clock className="mr-2 h-4 w-4" />
                        Select Time
                    </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Available Slots: {doctor.availableSlots}</p>
              </div>

              <Separator />

              <div className="space-y-2 text-sm">
                 <h3 className="text-base font-semibold">Billing Details</h3>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Doctor Fee</span>
                  <span className="font-medium">₹{doctor.consultationFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Company Commission (5%)</span>
                  <span className="font-medium">₹{commission.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-base">
                  <span>Total Amount Payable</span>
                  <span>₹{totalFee.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
       <footer className="sticky bottom-0 z-10 border-t bg-background p-4">
        <div className="mx-auto max-w-md">
          <Button className="w-full" size="lg">
            <CreditCard className="mr-2 h-5 w-5" /> Confirm & Pay
          </Button>
        </div>
      </footer>
    </div>
  )
}


function BookingSkeleton() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-6 w-48" />
        <div className="w-9"></div>
      </header>
      <main className="flex-1 p-4">
        <div className="mx-auto max-w-md space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-7 w-40" />
                  <Skeleton className="h-5 w-32" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="space-y-2">
                 <Skeleton className="h-5 w-36" />
                 <div className="flex gap-4">
                    <Skeleton className="h-12 w-full rounded-md" />
                    <Skeleton className="h-12 w-full rounded-md" />
                 </div>
               </div>
                <div className="space-y-2">
                 <Skeleton className="h-5 w-48" />
                 <div className="flex gap-2">
                    <Skeleton className="h-10 w-full rounded-md" />
                    <Skeleton className="h-10 w-full rounded-md" />
                 </div>
                  <Skeleton className="h-4 w-full" />
               </div>
              <Separator />
              <div className="space-y-3">
                 <Skeleton className="h-5 w-28" />
                 <Skeleton className="h-5 w-full" />
                 <Skeleton className="h-5 w-full" />
                 <Skeleton className="h-6 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
       <footer className="sticky bottom-0 z-10 border-t bg-background p-4">
        <div className="mx-auto max-w-md">
          <Skeleton className="h-12 w-full rounded-md" />
        </div>
      </footer>
    </div>
  )
}
