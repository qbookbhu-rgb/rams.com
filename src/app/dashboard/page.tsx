
"use client"

import Link from "next/link"
import Image from "next/image"
import {
  MapPin,
  Search,
  Stethoscope,
  Pill,
  ClipboardList,
  FlaskConical,
  BookOpen,
  Building,
} from "lucide-react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/lib/firebase"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"

const popularSearches = [
  "Dermatologist",
  "Pediatrician",
  "Gynecologist",
  "Cardiologist",
]

const bottomNavItems = [
  { title: "Consult with a doctor", icon: Stethoscope, href: "/consult-doctor" },
  { title: "Order Medicines", icon: Pill, href: "/order-medicines" },
  { title: "View medical records", icon: ClipboardList, href: "#" },
  { title: "Book test", icon: FlaskConical, href: "/lab-tests" },
  { title: "Read articles", icon: BookOpen, href: "#" },
  { title: "For healthcare providers", icon: Building, href: "#" },
]

export default function PatientDashboard() {
  const [user, loading] = useAuthState(auth)

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative w-full bg-blue-900/5 text-white hero-background overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
             <div className="flex flex-col items-center justify-center text-center py-20 md:py-32">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white font-headline">Your home for health</h1>
                <div className="mt-8 w-full max-w-4xl bg-white dark:bg-gray-800/50 dark:backdrop-blur-sm rounded-xl shadow-2xl p-4 md:p-6">
                    <h2 className="text-2xl font-semibold text-gray-700 dark:text-white mb-4">Find and Book</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Bangalore"
                                className="pl-10 text-gray-900 dark:text-white"
                            />
                        </div>
                        <div className="relative">
                             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search doctors, clinics, hospitals, etc."
                                className="pl-10 text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>
                     <div className="mt-4 flex flex-wrap items-center justify-center gap-2 md:gap-4">
                        <p className="text-sm text-gray-600 dark:text-gray-300">Popular searches:</p>
                        {popularSearches.map(search => (
                             <Link key={search} href="#" className="text-sm text-primary dark:text-cyan-400 hover:underline">
                                {search}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-48">
             <Image
                src="https://picsum.photos/seed/cityscape/1600/400"
                alt="City illustration"
                layout="fill"
                objectFit="cover"
                className="opacity-20"
                data-ai-hint="cityscape illustration"
            />
          </div>
        </section>

        <section className="bg-white dark:bg-card shadow-md">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x dark:divide-gray-700">
                    {bottomNavItems.map(item => (
                        <Link href={item.href} key={item.title} className="flex flex-col items-center justify-center text-center p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
                            <item.icon className="h-8 w-8 text-primary mb-2" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.title}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>

        <section className="py-12 md:py-20">
             <div className="container mx-auto px-4 md:px-6">
                 <Card className="overflow-hidden">
                    <CardContent className="p-0">
                         <Link href="#">
                            <Image
                                src="https://picsum.photos/seed/expert-surgeon/1200/400"
                                alt="Book appointment with an expert surgeon"
                                width={1200}
                                height={400}
                                className="w-full h-auto object-cover"
                                data-ai-hint="doctor surgeon"
                            />
                        </Link>
                    </CardContent>
                </Card>
             </div>
        </section>

      </main>
    </div>
  )
}
