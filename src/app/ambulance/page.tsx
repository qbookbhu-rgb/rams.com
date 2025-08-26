
"use client"

import { useState, useEffect } from "react"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { Ambulance } from "@/lib/types/ambulance"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { CircleDollarSign, Pencil, MoreVertical, Star, CheckCircle, XCircle, Clock } from "lucide-react"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

const tripHistory = [
  { id: "TRIP001", patient: "Rohan Kumar", date: "2024-08-12", status: "Completed" },
  { id: "TRIP002", patient: "Anita Desai", date: "2024-08-11", status: "Completed" },
  { id: "TRIP003", patient: "Vijay Singh", date: "2024-08-11", status: "Cancelled" },
];


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
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
             <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Trips</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-muted-foreground">
                  +5 from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed Trips</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">
                  93% completion rate
                </p>
              </CardContent>
            </Card>
             <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Online Hours</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">120</div>
                <p className="text-xs text-muted-foreground">
                  this month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{totalEarnings.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">
                  After 5% commission
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
             <div className="md:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Trip History</CardTitle>
                        <CardDescription>A log of your recent trips.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <TripHistoryTable trips={tripHistory} />
                    </CardContent>
                </Card>
             </div>
             <div className="space-y-8">
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
        </div>
      </main>
    </div>
  )
}

function TripHistoryTable({ trips }: { trips: typeof tripHistory }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Trip ID</TableHead>
          <TableHead>Patient</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {trips.map((trip) => (
          <TableRow key={trip.id}>
            <TableCell className="font-medium">{trip.id}</TableCell>
            <TableCell>{trip.patient}</TableCell>
            <TableCell>{trip.date}</TableCell>
            <TableCell>
              <Badge variant={trip.status === "Completed" ? "default" : "destructive"}
               className={trip.status === "Completed" ? "bg-green-600" : ""}>
                {trip.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Report an Issue</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

    