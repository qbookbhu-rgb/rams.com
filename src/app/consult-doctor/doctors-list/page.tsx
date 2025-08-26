
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Search } from "lucide-react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Doctor } from "@/lib/types/doctors"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"


export default function DoctorsListPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true)
      setError(null)
      try {
        const querySnapshot = await getDocs(collection(db, "doctors"));
        const doctorsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Doctor[];
        setDoctors(doctorsData);
      } catch (e) {
        console.error("Error fetching doctors: ", e)
        setError("Failed to load doctors. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchDoctors()
  }, [])

  const getAvailableSlotsText = (slots: Doctor['availableTimeSlots']) => {
    if (!slots) return 'No slots available';
    let availableSlots: string[] = [];
    if (slots.weekdays?.morning) availableSlots.push(`Weekdays: ${slots.weekdays.morning}`);
    if (slots.weekdays?.evening) availableSlots.push(slots.weekdays.evening);
    if (slots.weekends?.morning) availableSlots.push(` | Weekends: ${slots.weekends.morning}`);
    if (slots.weekends?.evening) availableSlots.push(slots.weekends.evening);
    return availableSlots.join(', ');
  };


  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/consult-doctor">
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </Button>
        <h1 className="text-xl font-bold font-headline">Available Doctors</h1>
        <Button variant="ghost" size="icon">
          <Search className="h-6 w-6" />
        </Button>
      </header>
      <main className="flex-1 p-4">
        <div className="mx-auto max-w-md space-y-6">
         
          {loading && (
            Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Skeleton className="h-24 w-24 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-1/3" />
                       <Skeleton className="h-4 w-2/3" />
                    </div>
                  </div>
                  <Separator className="my-4" />
                   <div className="space-y-3">
                      <div className="flex justify-between">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-4 w-1/4" />
                      </div>
                       <div className="flex justify-between">
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-4 w-1/4" />
                      </div>
                       <div className="flex justify-between">
                        <Skeleton className="h-5 w-1/3" />
                        <Skeleton className="h-5 w-1/4" />
                      </div>
                    </div>
                </CardContent>
              </Card>
            ))
          )}

          {error && <p className="text-center text-red-500">{error}</p>}

          {!loading && !error && doctors.map((doctor) => {
            const commission = doctor.consultationFee * 0.05
            const totalFee = doctor.consultationFee + commission

            return (
              <Link href={`/consult-doctor/book/${doctor.id}`} key={doctor.id} className="block rounded-lg transition-shadow hover:shadow-md">
                <Card className="overflow-hidden w-full">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-24 w-24 border">
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${doctor.id}`} />
                        <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <h2 className="text-lg font-bold">{doctor.name}</h2>
                        <p className="text-muted-foreground">{doctor.specialization}</p>
                        <p className="text-sm text-muted-foreground">{doctor.experience} years experience</p>
                        <p className="text-sm font-medium">{doctor.clinicName}</p>
                        <p className="text-xs text-muted-foreground">{doctor.availableTimeSlots ? getAvailableSlotsText(doctor.availableTimeSlots) : 'Slots not configured'}</p>
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
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}
