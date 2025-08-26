
"use client"

import { useState, useEffect } from "react"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { Ambulance } from "@/lib/types/ambulance"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { CircleDollarSign, Pencil } from "lucide-react"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { onAuthStateChanged } from "firebase/auth"

export default function AmbulanceDashboard() {
  const [ambulanceData, setAmbulanceData] = useState<Ambulance | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const totalEarnings = 15000.00
  const commissionPaid = totalEarnings * 0.05
  const netPayout = totalEarnings - commissionPaid

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        const fetchAmbulanceData = async () => {
          setLoading(true)
          try {
            const docRef = doc(db, "ambulances", user.uid)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
              setAmbulanceData({ id: docSnap.id, ...docSnap.data() } as Ambulance)
            } else {
              // Handle case where profile is not yet created
              setAmbulanceData(null)
            }
          } catch (err) {
            console.error("Error fetching ambulance data: ", err)
            setError("Failed to load your data. Please try again.")
          } finally {
            setLoading(false)
          }
        }
        fetchAmbulanceData()
      } else {
        // No user is signed in.
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container mx-auto grid gap-8 p-4 md:p-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">
              Ambulance Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your ambulance service.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
             <Card>
                <CardHeader>
                  <CardTitle>Driver & Vehicle Details</CardTitle>
                   {loading ? (
                    <Skeleton className="h-5 w-48" />
                  ) : (
                    <CardDescription>
                      {ambulanceData ? `${ambulanceData.driverName} - ${ambulanceData.numberPlate}` : "Complete your profile"}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <Skeleton className="h-5 w-32" />
                  ) : (
                     <p className="text-sm text-muted-foreground">
                        Vehicle Type: {ambulanceData?.vehicleType || 'N/A'}
                     </p>
                  )}
                 
                  <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                    <Link href="/ambulance/profile">
                      <Pencil className="mr-2 h-4 w-4" /> Edit Vehicle Info
                    </Link>
                  </Button>
                </CardContent>
              </Card>
               <Card>
                <CardHeader>
                  <CardTitle>Payments</CardTitle>
                  <CardDescription>
                    Review your earnings and withdraw.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total Bookings</span>
                    <span className="font-semibold">₹{totalEarnings.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Commission Paid (5%)</span>
                    <span className="font-semibold text-red-600">- ₹{commissionPaid.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-muted-foreground">Net Payout</span>
                    <span className="text-lg">₹{netPayout.toFixed(2)}</span>
                  </div>

                </CardContent>
                <CardFooter className="flex-col items-start gap-2">
                   <Button className="w-full">
                    <CircleDollarSign className="mr-2 h-4 w-4" /> Withdraw Request
                  </Button>
                  <p className="text-xs text-muted-foreground">Next payout on 1st August 2024.</p>
                </CardFooter>
              </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

    