
"use client"

import Link from "next/link"
import { Stethoscope, MapPin, Pill, FlaskConical, Bell, ClipboardList, User, Tag, Bell as BellIcon, Home, Search as SearchIcon, MessageCircle, CalendarDays, User as UserIcon } from "lucide-react"
import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const serviceItems = [
  { title: "Consult Doctor", icon: Stethoscope, href: "/consult-doctor", color: "bg-blue-400" },
  { title: "Nearby Clinics", icon: MapPin, href: "#", color: "bg-green-400" },
  { title: "Medicines", icon: Pill, href: "/order-medicines", color: "bg-yellow-400" },
  { title: "Lab Tests", icon: FlaskConical, href: "/lab-tests", color: "bg-purple-400" },
  { title: "Emergency", icon: Bell, href: "/ambulance-sos", color: "bg-red-400" },
  { title: "My Health Card", icon: ClipboardList, href: "#", color: "bg-teal-400" },
]

const listItems = [
    { title: "Notifications", icon: BellIcon, href: "#" },
    { title: "Featured Doctors Online", icon: User, href: "/consult-doctor/doctors-list" },
    { title: "Ongoing Offers", icon: Tag, href: "#" },
]

const navItems = [
  { title: "Home", icon: Home, href: "/dashboard", active: true },
  { title: "Search", icon: SearchIcon, href: "/search" },
  { title: "Chat", icon: MessageCircle, href: "#" },
  { title: "My Appointments", icon: CalendarDays, href: "#" },
  { title: "Profile", icon: UserIcon, href: "#" },
]

export default function PatientDashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-1 pb-24">
        <div className="container mx-auto max-w-lg p-4">
          <div className="grid grid-cols-2 gap-4">
            {serviceItems.map(item => (
              <Link href={item.href} key={item.title}>
                <Card className={`overflow-hidden ${item.color} text-white shadow-lg hover:shadow-xl transition-shadow`}>
                  <CardContent className="flex flex-col items-center justify-center p-6 aspect-video">
                    <item.icon className="h-10 w-10" />
                    <span className="mt-2 font-semibold text-center">{item.title}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-6">
            <Card className="bg-blue-100 dark:bg-blue-900/50 border-blue-200 dark:border-blue-800 shadow-md">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200">30% OFF</h3>
                  <p className="text-blue-700 dark:text-blue-300">on doctor consultation</p>
                </div>
                 <Image 
                    src="https://picsum.photos/seed/doctor-patient/150/100"
                    alt="Doctor with patient"
                    width={120}
                    height={80}
                    className="rounded-lg object-cover"
                    data-ai-hint="doctor patient illustration"
                 />
              </CardContent>
            </Card>
          </div>
            
          <div className="mt-6">
            <Card>
                <CardContent className="p-4">
                    <ul className="space-y-4">
                        {listItems.map(item => (
                            <li key={item.title}>
                                <Link href={item.href} className="flex items-center gap-4 text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-primary">
                                    <item.icon className="h-6 w-6 text-gray-500" />
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}

function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-950 dark:border-gray-800">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
        {navItems.map(item => (
          <Link href={item.href} key={item.title} className={`inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group ${item.active ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`}>
            <item.icon className={`w-6 h-6 mb-1 ${item.active ? 'text-primary' : 'text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-blue-500'}`} />
            <span className="text-xs">{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
