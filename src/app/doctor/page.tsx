
"use client"

import Image from "next/image"
import Link from "next/link"
import {
  Calendar,
  ChevronRight,
  CircleDollarSign,
  Download,
  MessageSquare,
  MoreVertical,
  Pencil,
  Star,
  Video,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"

const patients = [
  {
    name: "John Doe",
    id: "PID12345",
    lastVisit: "2024-07-20",
    status: "Upcoming",
  },
  {
    name: "Jane Smith",
    id: "PID67890",
    lastVisit: "2024-07-18",
    status: "Past",
  },
  {
    name: "Peter Jones",
    id: "PID11223",
    lastVisit: "2024-07-22",
    status: "Upcoming",
  },
  {
    name: "Mary Johnson",
    id: "PID44556",
    lastVisit: "2024-06-15",
    status: "Past",
  },
]

const upcomingPatients = patients.filter((p) => p.status === "Upcoming")
const pastPatients = patients.filter((p) => p.status === "Past")

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
  const totalEarnings = 5230.00
  const commissionPaid = totalEarnings * 0.05
  const netPayout = totalEarnings - commissionPaid

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
                    <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704e" />
                    <AvatarFallback>DR</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-2xl">Dr. Emily Carter</CardTitle>
                    <CardDescription>
                      MBBS, MD (Cardiology) | Cardiologist
                    </CardDescription>
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
                  <CardTitle>Patient List</CardTitle>
                  <CardDescription>
                    View and manage your patient records.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="upcoming">
                    <TabsList>
                      <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                      <TabsTrigger value="past">Past</TabsTrigger>
                    </TabsList>
                    <TabsContent value="upcoming">
                      <PatientTable patients={upcomingPatients} />
                    </TabsContent>
                    <TabsContent value="past">
                      <PatientTable patients={pastPatients} />
                    </TabsContent>
                  </Tabs>
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
                        <span>3 upcoming appointments</span>
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

function PatientTable({ patients }: { patients: typeof upcomingPatients }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Patient</TableHead>
          <TableHead className="hidden sm:table-cell">Last Visit</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {patients.map((patient) => (
          <TableRow key={patient.id}>
            <TableCell>
              <div className="font-medium">{patient.name}</div>
              <div className="text-sm text-muted-foreground">{patient.id}</div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              {patient.lastVisit}
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
                  <DropdownMenuItem>Start Chat</DropdownMenuItem>
                  <DropdownMenuItem>Create Invoice</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
