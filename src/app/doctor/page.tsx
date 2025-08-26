
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  Calendar,
  CircleDollarSign,
  MessageSquare,
  MoreVertical,
  Pencil,
  Star,
  Video,
} from "lucide-react"
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore"
import { db, auth } from "@/lib/firebase"
import type { Doctor } from "@/lib/types/doctors"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Header } from "@/components/header"
import { Skeleton } from "@/components/ui/skeleton"
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth"
import { Appointment } from "@/lib/types/appointment"

interface Patient {
  uid: string;
  email: string;
  role: string;
  createdAt: any;
}


const reviews = [
  {
    patient: "John Doe",
    rating: 5,
    comment: "Very helpful and knowledgeable doctor. Highly recommended!",
    date: "2 days ago",
  },
  {
    patient: "Jane Smith",
    rating: 4,
    comment: "Good consultation experience. The waiting time was a bit long.",
    date: "1 week ago",
  },
]

export default function DoctorDashboard() {
  const [doctorData, setDoctorData] = useState<Doctor | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const totalEarnings = 5230.00
  const commissionPaid = totalEarnings * 0.05
  const netPayout = totalEarnings - commissionPaid

  useEffect(() => {
     const unsubscribe = onAuthStateChanged(auth, (user: FirebaseUser | null) => {
      if (user) {
        const fetchData = async () => {
          setLoading(true);
          setError(null);
          try {
            // Fetch doctor's profile
            const docRef = doc(db, "doctors", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              setDoctorData({ id: docSnap.id, ...docSnap.data() } as Doctor);
            } else {
               setDoctorData(null); // Or handle case where profile is not created
            }

            // Fetch patients (this is a simplified example, in a real app you'd fetch patients with appointments)
            const patientsQuery = query(collection(db, "users"), where("role", "==", "patient"));
            const patientsSnapshot = await getDocs(patientsQuery);
            const patientsData = patientsSnapshot.docs.map(doc => ({...doc.data(), uid: doc.id }) as Patient);
            setPatients(patientsData);
            
            // Fetch appointments for this doctor
            const appointmentsQuery = query(collection(db, "appointments"), where("doctorId", "==", user.uid));
            const appointmentsSnapshot = await getDocs(appointmentsQuery);
            const appointmentsData = appointmentsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }) as Appointment);
            setAppointments(appointmentsData);

          } catch (e) {
            console.error("Error fetching data: ", e);
            setError("Failed to load dashboard data.");
          } finally {
            setLoading(false);
          }
        };
        fetchData();
      } else {
        // No user is signed in.
        setLoading(false);
      }
    });
     return () => unsubscribe();
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container mx-auto grid gap-8 p-4 md:p-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">Doctor's Dashboard</h1>
            <p className="text-muted-foreground">Manage your practice efficiently.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-8 lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-start gap-4">
                  <Avatar className="h-20 w-20 border">
                    <AvatarImage src={`https://i.pravatar.cc/150?u=${doctorData?.userId}`} />
                    <AvatarFallback>DR</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                     {loading ? (
                       <div className="space-y-2">
                         <Skeleton className="h-7 w-48" />
                         <Skeleton className="h-5 w-64" />
                       </div>
                     ) : (
                      <>
                        <CardTitle className="text-2xl">{doctorData?.name || "Doctor Name"}</CardTitle>
                        <CardDescription>
                         {doctorData ? `${doctorData.qualification} | ${doctorData.specialization}` : "Complete your profile"}
                        </CardDescription>
                      </>
                     )}
                    <div className="mt-2 flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Chat
                      </Button>
                      <Button size="sm" variant="outline">
                        <Video className="mr-2 h-4 w-4" />
                        Video Call
                      </Button>
                      <Button size="sm" variant="default" className="ml-auto" asChild>
                        <Link href="/doctor/profile">
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit Profile
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>
                    Your upcoming patient schedule.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading && (
                     <div className="space-y-2">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                     </div>
                  )}
                  {error && <p className="text-center text-red-500">{error}</p>}
                  {!loading && !error && (
                    <AppointmentTable appointments={appointments} />
                  )}
                </CardContent>
              </Card>
            </div>
            <div className="grid auto-rows-max items-start gap-8 lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Appointments</CardTitle>
                  <CardDescription>Your schedule for today</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{appointments.length} upcoming appointments</span>
                    </div>
                    <Button className="w-full">
                        <Pencil className="mr-2 h-4 w-4" /> Add / Edit Slots
                    </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payments</CardTitle>
                  <CardDescription>
                    Review your earnings and withdraw.
                  </CardDescription>
                </Header>
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

              <Card>
                <CardHeader>
                  <CardTitle>Ratings & Reviews</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-muted-foreground" />
                    </div>
                    <span className="font-semibold">4.5 (24 Reviews)</span>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-6">
                  {reviews.map((review, index) => (
                    <div key={index} className="flex gap-4">
                      <Avatar>
                        <AvatarFallback>{review.patient.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="font-semibold">{review.patient}</p>
                          <div className="flex items-center text-xs text-yellow-500">
                            {review.rating} <Star className="ml-1 h-3 w-3 fill-current" />
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                        <p className="text-xs text-muted-foreground mt-1">{review.date}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function AppointmentTable({ appointments }: { appointments: Appointment[] }) {
  if (appointments.length === 0) {
    return <p className="text-sm text-muted-foreground text-center">No upcoming appointments.</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Patient</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Mode</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments.map((appointment) => (
          <TableRow key={appointment.id}>
            <TableCell>
              <div className="font-medium">{appointment.patientName}</div>
              <div className="text-sm text-muted-foreground">{appointment.patientEmail}</div>
            </TableCell>
            <TableCell>{new Date(appointment.appointmentDate).toLocaleDateString()}</TableCell>
            <TableCell>{appointment.timeSlot}</TableCell>
            <TableCell>{appointment.consultationMode}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Start Chat</DropdownMenuItem>
                  <DropdownMenuItem>Start Video Call</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
