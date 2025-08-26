
"use client"

import { useState, useEffect } from "react"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { Lab } from "@/lib/types/labs"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { CircleDollarSign, Pencil, FileText, FlaskConical, Home, MoreVertical } from "lucide-react"
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
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const testRequests = [
  { id: "TEST001", patient: "Priya Sharma", test: "Complete Blood Count", date: "2024-08-10", status: "Sample Collected" },
  { id: "TEST002", patient: "Rahul Verma", test: "Lipid Profile", date: "2024-08-10", status: "Report Sent" },
  { id: "TEST003", patient: "Anjali Mehta", test: "Thyroid Function Test", date: "2024-08-09", status: "Report Sent" },
  { id: "TEST004", patient: "Sanjay Gupta", test: "COVID-19 RT-PCR", date: "2024-08-09", status: "Pending Sample Collection" },
];


export default function LabDashboard() {
  const [labData, setLabData] = useState<Lab | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const totalEarnings = 25000.00
  const commissionPaid = totalEarnings * 0.05
  const netPayout = totalEarnings - commissionPaid

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        const fetchLabData = async () => {
          setLoading(true)
          try {
            const docRef = doc(db, "labs", user.uid)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
              setLabData({ id: docSnap.id, ...docSnap.data() } as Lab)
            } else {
              setLabData(null)
            }
          } catch (err) {
            console.error("Error fetching lab data: ", err)
            setError("Failed to load your data. Please try again.")
          } finally {
            setLoading(false)
          }
        }
        fetchLabData()
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
              Lab Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your lab services and test requests.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
             <div className="grid auto-rows-max items-start gap-8 lg:col-span-2">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                 <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Tests</CardTitle>
                    <FlaskConical className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">152</div>
                     <p className="text-xs text-muted-foreground">
                      this month
                    </p>
                  </CardContent>
                </Card>
                 <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8</div>
                     <p className="text-xs text-muted-foreground">
                      awaiting generation
                    </p>
                  </CardContent>
                </Card>
                 <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Home Collections</CardTitle>
                    <Home className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">35</div>
                     <p className="text-xs text-muted-foreground">
                      this month
                    </p>
                  </CardContent>
                </Card>
              </div>

               <Card>
                <CardHeader>
                  <CardTitle>Test Requests</CardTitle>
                  <CardDescription>
                    Manage incoming test requests and update their status.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TestRequestTable requests={testRequests} />
                </CardContent>
              </Card>

             </div>

             <div className="grid auto-rows-max items-start gap-8 lg:col-span-1">
                <Card>
                    <CardHeader>
                    <CardTitle>Lab Details</CardTitle>
                    {loading ? (
                        <Skeleton className="h-5 w-48" />
                    ) : (
                        <CardDescription>{labData?.labName || "Complete your profile"}</CardDescription>
                    )}
                    </CardHeader>
                    <CardContent>
                    {loading ? (
                        <Skeleton className="h-5 w-32" />
                    ) : (
                        <p className="text-sm text-muted-foreground">
                        Registration ID: {labData?.registrationID || 'N/A'}
                        </p>
                    )}
                        <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                        <Link href="/lab/profile">
                            <Pencil className="mr-2 h-4 w-4" /> Edit Lab Info
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
                        <span className="text-muted-foreground">Total Tests</span>
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

function TestRequestTable({ requests }: { requests: typeof testRequests }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Test ID</TableHead>
          <TableHead>Patient</TableHead>
          <TableHead>Test</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((request) => (
          <TableRow key={request.id}>
            <TableCell className="font-medium">{request.id}</TableCell>
            <TableCell>{request.patient}</TableCell>
            <TableCell>{request.test}</TableCell>
            <TableCell>
              <Badge variant={request.status === "Report Sent" ? "default" : "secondary"}
                className={request.status === "Report Sent" ? "bg-green-600" : ""}>
                {request.status}
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
                  <DropdownMenuItem>Update Status</DropdownMenuItem>
                  <DropdownMenuItem>Upload Report</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
