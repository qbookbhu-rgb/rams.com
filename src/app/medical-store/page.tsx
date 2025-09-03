
"use client"

import { useState, useEffect } from "react"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import Link from "next/link"
import {
  CircleDollarSign,
  MoreVertical,
  Package,
  PackageCheck,
  PackageX,
  PlusCircle,
  Star,
  Truck,
  Pencil,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
import { Header } from "@/components/header"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { MedicalStore } from "@/lib/types/medical-stores"
import { Skeleton } from "@/components/ui/skeleton"
import { onAuthStateChanged } from "firebase/auth"

export const dynamic = 'force-dynamic';

const orders = [
  {
    id: "ORD001",
    customer: "Ravi Kumar",
    date: "2024-07-25",
    items: 5,
    status: "Pending",
  },
  {
    id: "ORD002",
    customer: "Sunita Sharma",
    date: "2024-07-25",
    items: 2,
    status: "Delivered",
  },
  {
    id: "ORD003",
    customer: "Amit Singh",
    date: "2024-07-24",
    items: 1,
    status: "Cancelled",
  },
  {
    id: "ORD004",
    customer: "Priya Das",
    date: "2024-07-24",
    items: 8,
    status: "Shipped",
  },
]

const reviews = [
  {
    patient: "Sunita Sharma",
    rating: 5,
    comment: "Fast delivery and genuine medicines. Very satisfied.",
    date: "1 day ago",
  },
  {
    patient: "Vikram Mehta",
    rating: 4,
    comment: "Good service, but one item was out of stock.",
    date: "3 days ago",
  },
]

export default function MedicalStoreDashboard() {
    const [storeData, setStoreData] = useState<MedicalStore | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const totalEarnings = 45000.00
    const commissionPaid = totalEarnings * 0.05
    const netPayout = totalEarnings - commissionPaid

     useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
        if (user) {
            const fetchStoreData = async () => {
            setLoading(true)
            try {
                const docRef = doc(db, "medical_stores", user.uid)
                const docSnap = await getDoc(docRef)
                if (docSnap.exists()) {
                    setStoreData({ id: docSnap.id, ...docSnap.data() } as MedicalStore)
                } else {
                    setStoreData(null)
                }
            } catch (err) {
                console.error("Error fetching store data: ", err)
                setError("Failed to load your data. Please try again.")
            } finally {
                setLoading(false)
            }
            }
            fetchStoreData()
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
              Medical Store Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your pharmacy operations.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-8 lg:col-span-2">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Pending Orders
                    </CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">
                      New prescription orders
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Shipped
                    </CardTitle>
                    <Truck className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">25</div>
                    <p className="text-xs text-muted-foreground">
                      Orders on the way
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Delivered
                    </CardTitle>
                    <PackageCheck className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+150</div>
                    <p className="text-xs text-muted-foreground">
                      This month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Cancelled
                    </CardTitle>
                    <PackageX className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-xs text-muted-foreground">
                      This month
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="flex flex-row items-center">
                  <div className="grid gap-2">
                    <CardTitle>Orders</CardTitle>
                    <CardDescription>
                      Manage prescription orders and deliveries.
                    </CardDescription>
                  </div>
                  <Button asChild size="sm" className="ml-auto gap-1">
                    <a href="#">
                      Add Medicine
                      <PlusCircle className="h-4 w-4" />
                    </a>
                  </Button>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="all">
                    <TabsList>
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="pending">Pending</TabsTrigger>
                      <TabsTrigger value="shipped">Shipped</TabsTrigger>
                      <TabsTrigger value="delivered">Delivered</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all">
                      <OrderTable orders={orders} />
                    </TabsContent>
                    <TabsContent value="pending">
                       <OrderTable orders={orders.filter(o => o.status === 'Pending')} />
                    </TabsContent>
                     <TabsContent value="shipped">
                       <OrderTable orders={orders.filter(o => o.status === 'Shipped')} />
                    </TabsContent>
                     <TabsContent value="delivered">
                       <OrderTable orders={orders.filter(o => o.status === 'Delivered')} />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
            <div className="grid auto-rows-max items-start gap-8 lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Store Details</CardTitle>
                   {loading ? (
                        <Skeleton className="h-5 w-48" />
                    ) : (
                        <CardDescription>{storeData?.storeName || "Complete your profile"}</CardDescription>
                    )}
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <Skeleton className="h-5 w-32" />
                    ) : (
                        <p className="text-sm text-muted-foreground">
                           License: {storeData?.licenseNo || "N/A"}
                        </p>
                    )}
                   <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                     <Link href="/medical-store/profile">
                        <Pencil className="mr-2 h-4 w-4" /> Edit Store Info
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
                    <span className="text-muted-foreground">Total Sales</span>
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
                    <span className="font-semibold">4.8 (52 Reviews)</span>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-6">
                  {reviews.map((review, index) => (
                    <div key={index} className="flex gap-4">
                      <Avatar>
                        <AvatarFallback>
                          {review.patient.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="font-semibold">{review.patient}</p>
                          <div className="flex items-center text-xs text-yellow-500">
                            {review.rating}{" "}
                            <Star className="ml-1 h-3 w-3 fill-current" />
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {review.comment}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {review.date}
                        </p>
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

function OrderTable({ orders }: { orders: typeof orders }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="hidden sm:table-cell">Items</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>{order.customer}</TableCell>
            <TableCell>
              <Badge
                variant={
                  order.status === "Delivered"
                    ? "default"
                    : order.status === "Cancelled"
                      ? "destructive"
                      : "secondary"
                }
                className={
                   order.status === "Delivered" ? "bg-green-600" : ""
                }
              >
                {order.status}
              </Badge>
            </TableCell>
            <TableCell className="hidden sm:table-cell text-center">
              {order.items}
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
                  <DropdownMenuItem>Contact Customer</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
