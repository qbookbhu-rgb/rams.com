"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { HeartPulse, Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { UserNav } from "@/components/user-nav"

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [isDoctorView, setIsDoctorView] = useState(pathname.includes("/doctor"))

  useEffect(() => {
    setIsDoctorView(pathname.includes("/doctor"))
  }, [pathname])

  const handleViewChange = (checked: boolean) => {
    setIsDoctorView(checked)
    if (checked) {
      router.push("/doctor")
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center">
        <Link href="/dashboard" className="mr-6 flex items-center space-x-2">
          <HeartPulse className="h-6 w-6 text-primary" />
          <span className="hidden font-bold sm:inline-block font-headline">
            RAMS.com Lite
          </span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search Doctor, Medicine, Test..."
              className="pl-9"
            />
          </div>
          <nav className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="view-mode" className="text-sm hidden md:block">Patient</Label>
              <Switch
                id="view-mode"
                checked={isDoctorView}
                onCheckedChange={handleViewChange}
                aria-label="Toggle between patient and doctor view"
              />
              <Label htmlFor="view-mode" className="text-sm hidden md:block">Doctor</Label>
            </div>
            <UserNav />
          </nav>
        </div>
      </div>
    </header>
  )
}
