
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Search, FlaskConical, MapPin, Home, IndianRupee, Microscope, Stethoscope } from "lucide-react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Lab } from "@/lib/types/labs"
import { seedLabs } from "@/lib/seed-data"

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
import { Separator } from "@/components/ui/separator"

export const dynamic = 'force-dynamic';

export default function LabTestsPage() {
  const [labs, setLabs] = useState<Lab[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLabs = async () => {
      setLoading(true)
      setError(null)
      try {
        const querySnapshot = await getDocs(collection(db, "labs"));
        if (querySnapshot.empty) {
          console.log("No labs found in Firestore, using seed data.");
          setLabs(seedLabs);
        } else {
            const labsData = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            })) as Lab[];
            setLabs(labsData);
        }
      } catch (e) {
        console.error("Error fetching labs: ", e)
        setError("Failed to load labs. Using sample data.")
        setLabs(seedLabs);
      } finally {
        setLoading(false)
      }
    }

    fetchLabs()
  }, [])

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </Button>
        <h1 className="text-xl font-bold font-headline">Book Diagnostic Tests</h1>
        <Button variant="ghost" size="icon">
          <Search className="h-6 w-6" />
        </Button>
      </header>
      <main className="flex-1 p-4">
        <div className="mx-auto max-w-md space-y-6">
          {loading && (
             Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        </div>
                    </CardHeader>
                     <CardContent className="space-y-3 p-4 pt-0">
                       <Skeleton className="h-4 w-full" />
                       <Skeleton className="h-4 w-1/2" />
                       <Separator />
                       <Skeleton className="h-4 w-1/4" />
                       <Skeleton className="h-4 w-full" />
                       <Skeleton className="h-10 w-full mt-2" />
                    </CardContent>
                </Card>
             ))
          )}

          {error && <p className="text-center text-red-500">{error}</p>}

          {!loading && !error && labs.map((lab) => (
              <Card key={lab.id} className="overflow-hidden">
                 <CardHeader>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 border">
                            <AvatarFallback><FlaskConical /></AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-lg">{lab.labName}</CardTitle>
                            <CardDescription>Technician: {lab.technicianName}</CardDescription>
                        </div>
                    </div>
                 </CardHeader>
                <CardContent className="space-y-3 text-sm p-4 pt-0">
                    <div className="flex items-start gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>{lab.address}</span>
                    </div>
                     <Separator />
                     <div className="grid grid-cols-1 gap-2">
                        <div className="flex items-start gap-2">
                            <Microscope className="h-4 w-4 mt-0.5 shrink-0" />
                             <p><span className="font-semibold">Services:</span> {lab.services}</p>
                        </div>
                        <div className="flex items-start gap-2">
                            <IndianRupee className="h-4 w-4 mt-0.5 shrink-0" />
                             <p><span className="font-semibold">Charges:</span> {lab.charges}</p>
                        </div>
                     </div>
                    
                    {lab.homeCollection && (
                        <Badge variant="secondary" className="flex items-center gap-2 w-fit">
                            <Home className="h-4 w-4"/> Home Sample Collection Available
                        </Badge>
                    )}
                     <Button className="w-full mt-2" size="lg" asChild>
                        <Link href="/consult-doctor">
                           <Stethoscope className="mr-2 h-4 w-4" />
                           Book a Test
                        </Link>
                    </Button>
                </CardContent>
              </Card>
            ))}
        </div>
      </main>
    </div>
  )
}
