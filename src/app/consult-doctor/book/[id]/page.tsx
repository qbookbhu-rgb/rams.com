
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar as CalendarIcon, Clock, CreditCard, User, Video, Sun, Moon } from "lucide-react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Doctor } from "@/lib/types/doctors"
import { format, getDay } from "date-fns"

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
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

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
  
  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setSelectedTime(null); // Reset time when date changes
  };

  const renderTimeSlots = () => {
    if (!date || !doctor?.availableTimeSlots) return null;

    const dayOfWeek = getDay(date); // Sunday = 0, Monday = 1, etc.
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    const slots = isWeekend 
      ? doctor.availableTimeSlots.weekends 
      : doctor.availableTimeSlots.weekdays;

    return (
      <div className="space-y-4">
        {slots.morning && (
          <div>
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2"><Sun className="h-4 w-4"/> Morning Slots</h4>
             <div className="grid grid-cols-3 gap-2">
               {slots.morning.split(',').map(time => (
                 <Button key={time} variant={selectedTime === time.trim() ? 'default' : 'outline'} onClick={() => setSelectedTime(time.trim())}>
                   {time.trim()}
                 </Button>
               ))}
            </div>
          </div>
        )}
         {slots.evening && (
          <div>
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2"><Moon className="h-4 w-4"/> Evening Slots</h4>
             <div className="grid grid-cols-3 gap-2">
               {slots.evening.split(',').map(time => (
                 <Button key={time} variant={selectedTime === time.trim() ? 'default' : 'outline'} onClick={() => setSelectedTime(time.trim())}>
                   {time.trim()}
                 </Button>
               ))}
            </div>
          </div>
        )}
      </div>
    );
  };


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
            <CardContent className="space-y-6">
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

               <div className="space-y-4">
                <Label className="text-base font-semibold">Select Date & Time Slot</Label>
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
                            onSelect={handleDateSelect}
                            initialFocus
                        />
                        </PopoverContent>
                    </Popover>
                    
                    {renderTimeSlots()}

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
          <Button className="w-full" size="lg" disabled={!selectedTime}>
            <CreditCard className="mr-2 h-5 w-5" /> 
            {selectedTime ? `Confirm & Pay for ${selectedTime}` : 'Select a Time Slot'}
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
                <div className="space-y-4">
                 <Skeleton className="h-5 w-48" />
                 <Skeleton className="h-10 w-full rounded-md" />
                 <div className="space-y-3">
                   <Skeleton className="h-4 w-32" />
                   <div className="grid grid-cols-3 gap-2">
                      <Skeleton className="h-9 w-full" />
                      <Skeleton className="h-9 w-full" />
                      <Skeleton className="h-9 w-full" />
                   </div>
                 </div>
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
