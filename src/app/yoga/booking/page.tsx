
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Search, Video, Users, Clock, IndianRupee, MapPin } from "lucide-react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { YogaCenter } from "@/lib/types/yoga"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"


export default function YogaBookingPage() {
  const [classType, setClassType] = useState("all")
  const [yogaCenters, setYogaCenters] = useState<YogaCenter[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchYogaCenters = async () => {
      setLoading(true)
      setError(null)
      try {
        const querySnapshot = await getDocs(collection(db, "yoga_centers"));
        const centersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as YogaCenter[];
        setYogaCenters(centersData);
      } catch (e) {
        console.error("Error fetching yoga centers: ", e)
        setError("Failed to load yoga centers. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchYogaCenters()
  }, [])


  const filteredCenters = yogaCenters.filter(center => 
      classType === 'all' || 
      (classType === 'online' && center.onlineClasses) ||
      (classType === 'offline' && center.onlineClasses === false)
  )

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </Button>
        <h1 className="text-xl font-bold font-headline">Book a Yoga Class</h1>
        <Button variant="ghost" size="icon">
          <Search className="h-6 w-6" />
        </Button>
      </header>
      <main className="flex-1 p-4">
        <div className="mx-auto max-w-md space-y-6">
          <Card>
            <CardContent className="p-4">
              <RadioGroup
                defaultValue="all"
                onValueChange={setClassType}
                className="flex items-center justify-around"
              >
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all" className="text-base">All</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="online" id="online" />
                  <Label htmlFor="online" className="text-base">Online</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="offline" id="offline" />
                  <Label htmlFor="offline" className="text-base">Offline</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {loading && (
             Array.from({ length: 2 }).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                    <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                        <Skeleton className="h-24 w-24 rounded-lg" />
                        <div className="flex-1 space-y-2">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <div className="flex flex-wrap gap-1 pt-1">
                            <Skeleton className="h-5 w-16" />
                            <Skeleton className="h-5 w-20" />
                        </div>
                        <Skeleton className="h-4 w-2/3 mt-1" />
                        </div>
                    </div>
                    <Separator className="my-3" />
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                    </CardContent>
                </Card>
             ))
          )}

          {error && <p className="text-center text-red-500">{error}</p>}

          {!loading && !error && filteredCenters.map((center) => (
              <Card key={center.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-24 w-24 border rounded-lg">
                      <AvatarImage src={`https://i.pravatar.cc/150?u=${center.id}`} />
                      <AvatarFallback>{center.instructorName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <h2 className="text-lg font-bold">{center.centerName}</h2>
                      <p className="text-sm text-muted-foreground">by {center.instructorName}</p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {center.classTypes.split(',').map(spec => (
                            <Badge key={spec.trim()} variant="secondary">{spec.trim()}</Badge>
                        ))}
                      </div>
                      <p className="text-sm font-medium pt-1 flex items-center gap-1">
                        <MapPin className="h-4 w-4" /> {center.address}
                      </p>
                    </div>
                  </div>
                  <Separator className="my-3" />
                  <div className="grid grid-cols-2 gap-2 text-sm">
                     <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{center.schedule}</span>
                     </div>
                      <div className="flex items-center gap-2">
                        <IndianRupee className="h-4 w-4 text-muted-foreground" />
                        <span>{center.fee}</span>
                     </div>
                      <div className="flex items-center gap-2">
                         {center.onlineClasses ? <Video className="h-4 w-4 text-muted-foreground" /> : <Users className="h-4 w-4 text-muted-foreground" />}
                         <span>{center.onlineClasses ? "Online & Offline" : "Offline Only"}</span>
                      </div>
                       <div className="flex items-center gap-2 font-semibold text-amber-500">
                         {/* Add rating field to yoga profile later */}
                         4.8 ★
                      </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </main>
      <footer className="sticky bottom-0 z-10 border-t bg-background p-4">
        <div className="mx-auto max-w-md">
          <Button className="w-full" size="lg">Book a Slot</Button>
        </div>
      </footer>
    </div>
  )
}
