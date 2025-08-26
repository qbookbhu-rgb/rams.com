
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Ambulance,
  FlaskConical,
  HeartPulse,
  Pill,
  Stethoscope,
  Wind,
  AlertTriangle,
} from "lucide-react"
import { auth, db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"
import { User as FirebaseUser } from "firebase/auth"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Header } from "@/components/header"
import { QrCodeIcon } from "@/components/icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"

interface UserProfile {
  uid: string;
  email: string;
  role: string;
}

const quickAccessItems = [
  {
    title: "Doctor Consultation",
    icon: Stethoscope,
    description: "Consult with top doctors online.",
    href: "/consult-doctor",
  },
  {
    title: "Order Medicines",
    icon: Pill,
    description: "Get medicines delivered to your doorstep.",
    href: "/order-medicines",
  },
  {
    title: "Diagnostic Tests",
    icon: FlaskConical,
    description: "Book lab tests from home.",
    href: "/lab-tests",
  },
  {
    title: "Ambulance Service",
    icon: Ambulance,
    description: "24/7 emergency ambulance service.",
    href: "/ambulance-sos",
  },
   {
    title: "SOS",
    icon: AlertTriangle,
    description: "Immediate emergency assistance.",
    href: "/ambulance-sos",
  },
  {
    title: "Yoga & Wellness",
    icon: Wind,
    description: "Book online or offline yoga classes.",
    href: "/yoga/booking",
  },
]

const offers = [
  {
    title: "Flat 25% Off",
    description: "On first medicine order",
    image: "https://picsum.photos/seed/medicines/600/400",
    hint: "medicines pharmacy"
  },
  {
    title: "Save 50% on Tests",
    description: "Full body checkup packages",
    image: "https://picsum.photos/seed/labtest/600/400",
    hint: "lab test"
  },
  {
    title: "Free Doctor Consultation",
    description: "For new users",
    image: "https://picsum.photos/seed/doctor/600/400",
    hint: "doctor consultation"
  },
]

export default function PatientDashboard() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Fetch user profile from Firestore
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUserProfile(userDocSnap.data() as UserProfile);
        }
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container mx-auto grid gap-8 p-4 md:p-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight font-headline">
              Patient Dashboard
            </h1>
            <p className="text-muted-foreground">
              Quick access to all your health needs.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight mb-4 font-headline">
              Quick Access
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
              {quickAccessItems.map((item) => (
                <Card
                  key={item.title}
                  className="hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      {item.title}
                    </CardTitle>
                    <item.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                    <Button size="sm" className="mt-4" asChild>
                      <Link href={item.href}>Get Started</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight mb-4 font-headline">
              Special Offers
            </h2>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {offers.map((offer, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-1">
                      <Card className="overflow-hidden">
                         <CardHeader className="p-0">
                          <Image
                            src={offer.image}
                            alt={offer.title}
                            width={600}
                            height={400}
                            className="aspect-video w-full object-cover"
                            data-ai-hint={offer.hint}
                          />
                        </CardHeader>
                        <CardContent className="p-4">
                          <CardTitle className="text-lg">{offer.title}</CardTitle>
                          <CardDescription className="mt-1">{offer.description}</CardDescription>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </section>

          <div className="grid gap-8 lg:grid-cols-3">
            <section className="lg:col-span-1">
              <h2 className="text-2xl font-semibold tracking-tight mb-4 font-headline">
                My Health Card
              </h2>
               {loading ? (
                <Card className="flex flex-col items-center justify-center p-6 text-center shadow-lg">
                  <Skeleton className="w-24 h-24 rounded-full mb-4" />
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-40 mb-4" />
                  <Skeleton className="h-32 w-32" />
                </Card>
              ) : user ? (
              <Card className="flex flex-col items-center justify-center p-6 text-center shadow-lg">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${user.uid}`} alt="Patient" />
                  <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <p className="font-semibold">{user.email?.split('@')[0]}</p>
                <p className="text-sm text-muted-foreground mb-4">ID: {user.uid.slice(0,10).toUpperCase()}</p>
                <div className="rounded-lg bg-white p-2">
                  <QrCodeIcon className="h-32 w-32" />
                </div>
                <Button className="mt-4" variant="outline">
                  Download Card
                </Button>
              </Card>
               ) : (
                <Card className="flex flex-col items-center justify-center p-6 text-center shadow-lg">
                    <p className="text-muted-foreground">Please log in to see your health card.</p>
                </Card>
               )}
            </section>

            <section className="lg:col-span-2">
              <h2 className="text-2xl font-semibold tracking-tight mb-4 font-headline">
                Nearby Services
              </h2>
              <Card className="overflow-hidden shadow-lg">
                <CardHeader>
                  <CardTitle>Medical Stores, Labs & Hospitals</CardTitle>
                  <CardDescription>
                    Find trusted healthcare services near you.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative h-80 w-full rounded-md overflow-hidden">
                    <Image
                      src="https://picsum.photos/800/400"
                      data-ai-hint="map city"
                      alt="Map of nearby services"
                      fill
                      className="object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
