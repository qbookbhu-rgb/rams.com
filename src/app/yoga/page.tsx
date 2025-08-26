
"use client"

import Link from "next/link"
import {
  Calendar,
  CircleDollarSign,
  Pencil,
  PlusCircle,
  Video,
  Users,
} from "lucide-react"

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
import { Header } from "@/components/header"
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

const classes = [
  {
    id: "CLS001",
    name: "Morning Hatha Yoga",
    type: "Offline",
    date: "2024-08-15",
    time: "7:00 AM - 8:00 AM",
    bookings: 12,
    maxCapacity: 20,
    status: "Upcoming",
  },
  {
    id: "CLS002",
    name: "Vinyasa Flow - Online",
    type: "Online",
    date: "2024-08-15",
    time: "6:00 PM - 7:00 PM",
    bookings: 18,
    maxCapacity: 25,
    status: "Upcoming",
  },
  {
    id: "CLS003",
    name: "Meditation & Pranayama",
    type: "Offline",
    date: "2024-08-14",
    time: "8:00 AM - 9:00 AM",
    bookings: 10,
    maxCapacity: 15,
    status: "Completed",
  },
]

export default function YogaDashboard() {
  const totalEarnings = 12500.0
  const commissionPaid = totalEarnings * 0.05
  const netPayout = totalEarnings - commissionPaid

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container mx-auto grid gap-8 p-4 md:p-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">
              Yoga Center Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your classes, schedule, and earnings.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-8 lg:col-span-2">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                 <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Upcoming Classes</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5</div>
                     <p className="text-xs text-muted-foreground">
                      in the next 7 days
                    </p>
                  </CardContent>
                </Card>
                 <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">124</div>
                     <p className="text-xs text-muted-foreground">
                      this month
                    </p>
                  </CardContent>
                </Card>
                 <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Online Classes</CardTitle>
                    <Video className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">
                      scheduled this month
                    </p>
                  </CardContent>
                </Card>
                 <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Offline Classes</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">20</div>
                    <p className="text-xs text-muted-foreground">
                     at your center this month
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="flex flex-row items-center">
                  <div className="grid gap-2">
                    <CardTitle>Class Schedule</CardTitle>
                    <CardDescription>
                      Manage your upcoming and past classes.
                    </CardDescription>
                  </div>
                  <Button asChild size="sm" className="ml-auto gap-1">
                    <Link href="#">
                      Add New Class
                      <PlusCircle className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="upcoming">
                    <TabsList>
                      <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                      <TabsTrigger value="completed">Completed</TabsTrigger>
                    </TabsList>
                    <TabsContent value="upcoming">
                      <ClassTable classes={classes.filter(c => c.status === "Upcoming")} />
                    </TabsContent>
                    <TabsContent value="completed">
                      <ClassTable classes={classes.filter(c => c.status === "Completed")} />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
            <div className="grid auto-rows-max items-start gap-8 lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Center Details</CardTitle>
                  <CardDescription>Aatma Yoga Studio</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Instructor: Priya Sharma
                  </p>
                   <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                     <Link href="/yoga/profile">
                        <Pencil className="mr-2 h-4 w-4" /> Edit Center Info
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
                  <p className="text-xs text-muted-foreground">Next payout on 1st September 2024.</p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function ClassTable({ classes }: { classes: typeof classes }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Class Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Date & Time</TableHead>
          <TableHead className="text-center">Bookings</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {classes.map((cls) => (
          <TableRow key={cls.id}>
            <TableCell className="font-medium">{cls.name}</TableCell>
            <TableCell>
              <Badge variant={cls.type === "Online" ? "secondary" : "outline"}>
                {cls.type}
              </Badge>
            </TableCell>
            <TableCell>
              {cls.date} <br/> {cls.time}
            </TableCell>
            <TableCell className="text-center">
              {cls.bookings}/{cls.maxCapacity}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
