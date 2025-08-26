
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Search, Phone, IndianRupee, MapPin } from "lucide-react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Ambulance } from "@/lib/types/ambulance"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function AmbulanceSosPage() {
  const [ambulances, setAmbulances] = useState<Ambulance[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAmbulances = async () => {
      setLoading(true)
      setError(null)
      try {
        const querySnapshot = await getDocs(collection(db, "ambulances"));
        const ambulanceData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Ambulance[];
        setAmbulances(ambulanceData);
      } catch (e) {
        console.error("Error fetching ambulances: ", e)
        setError("Failed to load ambulance services. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchAmbulances()
  }, [])

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </Button>
        <h1 className="text-xl font-bold font-headline">Ambulance & SOS</h1>
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
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-16 w-16 rounded-full" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-5 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                    </div>
                    </CardContent>
                </Card>
             ))
          )}

          {error && <p className="text-center text-red-500">{error}</p>}

          {!loading && !error && ambulances.map((ambulance) => (
              <Card key={ambulance.id} className="overflow-hidden">
                 <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 border">
                            <AvatarFallback>{ambulance.driverName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-lg">{ambulance.driverName}</CardTitle>
                            <CardDescription>{ambulance.numberPlate}</CardDescription>
                        </div>
                    </div>
                    <Badge variant={ambulance.status ? "default" : "outline"} className={ambulance.status ? "bg-green-600" : ""}>
                        {ambulance.status ? "Online" : "Offline"}
                    </Badge>
                 </CardHeader>
                <CardContent className="space-y-3 text-sm">
                     <div className="flex items-start gap-2 font-semibold">
                        <span>{ambulance.vehicleType}</span>
                    </div>
                    <div className="flex items-start gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>Service Area: {ambulance.serviceArea}</span>
                    </div>
                    <div className="flex items-start gap-2 text-muted-foreground">
                        <IndianRupee className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>Charges: {ambulance.charges}</span>
                    </div>
                     <Button className="w-full mt-2">
                        <Phone className="mr-2 h-4 w-4" /> Call Now ({ambulance.contact})
                    </Button>
                </CardContent>
              </Card>
            ))}
        </div>
      </main>
    </div>
  )
}
