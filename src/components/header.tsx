
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { HeartPulse, Search, ImageIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { UserNav } from "@/components/user-nav"

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [view, setView] = useState("patient")

  useEffect(() => {
    if (pathname.includes("/doctor")) {
      setView("doctor")
    } else if (pathname.includes("/medical-store")) {
      setView("medical-store")
    } else if (pathname.includes("/ambulance")) {
      setView("ambulance")
    } else if (pathname.includes("/lab")) {
      setView("lab")
    } else if (pathname.includes("/yoga")) {
      setView("yoga")
    } else {
      setView("patient")
    }
  }, [pathname])

  const handleViewChange = (value: string) => {
    setView(value)
    switch (value) {
      case "patient":
        router.push("/dashboard")
        break
      case "doctor":
        router.push("/doctor")
        break
      case "medical-store":
        router.push("/medical-store")
        break
      case "ambulance":
        router.push("/ambulance")
        break
      case "lab":
        router.push("/lab")
        break
      case "yoga":
        router.push("/yoga")
        break
      default:
        router.push("/dashboard")
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center">
        <Link href="/dashboard" className="mr-6 flex items-center space-x-2">
          <HeartPulse className="h-6 w-6 text-primary" />
          <span className="hidden font-bold sm:inline-block font-headline">
            RAMS.com
          </span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-2">
           <Button variant="outline" size="sm" asChild>
              <Link href="/search">
                <Search className="mr-2 h-4 w-4" /> AI Search
              </Link>
            </Button>
          <nav className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <Select onValueChange={handleViewChange} value={view}>
                <SelectTrigger id="view-mode" className="w-[150px] hidden md:flex">
                  <SelectValue placeholder="Select view" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="patient">Patient View</SelectItem>
                  <SelectItem value="doctor">Doctor View</SelectItem>
                  <SelectItem value="medical-store">Store View</SelectItem>
                  <SelectItem value="ambulance">Ambulance View</SelectItem>
                  <SelectItem value="lab">Lab View</SelectItem>
                  <SelectItem value="yoga">Yoga View</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <UserNav />
          </nav>
        </div>
      </div>
    </header>
  )
}
