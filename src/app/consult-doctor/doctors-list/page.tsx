
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Search, Star } from "lucide-react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Doctor } from "@/lib/types/doctors"
import { seedDoctors } from "@/lib/seed-data"

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
        if (querySnapshot.empty) {
          console.log("No doctors found in Firestore, using seed data.");
          setDoctors(seedDoctors);
        } else {
            const doctorsData = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            })) as Doctor[];
            setDoctors(doctorsData);
        }
      } catch (e) {
        console.error("Error fetching doctors: ", e)
        setError("Failed to load doctors. Using sample data.")
        setDoctors(seedDoctors); // Fallback to seed data on error
      } finally {
        setLoading(false)
      }
    }

    fetchDoctors()
  }, [])

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
        <div className="mx-auto max-w-md space-y-4">
         
          {loading && (
            Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="overflow-hidden p-4">
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-16 w-16 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/3" />
                      </div>
                       <Skeleton className="h-10 w-20" />
                    </div>
                </Card>
            ))
          )}

          {error && <p className="text-center text-red-500">{error}</p>}

          {!loading && doctors.map((doctor) => {
            const totalFee = doctor.consultationFee * 1.05

            return (
              <Card key={doctor.id} className="overflow-hidden w-full p-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border">
                      <AvatarImage src={`https://i.pravatar.cc/150?u=${doctor.id}`} />
                      <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-0.5">
                      <h2 className="font-bold">{doctor.name}</h2>
                      <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> 
                        <span>4.8</span>
                         <span className="mx-1">•</span>
                        <span>{doctor.experience} yrs exp</span>
                      </div>
                    </div>
                    <Button asChild>
                      <Link href={`/consult-doctor/book/${doctor.id}`}>Book</Link>
                    </Button>
                  </div>
              </Card>
            )
          })}
        </div>
      </main>
    </div>
  )
}
