
"use client"

import { useState } from "react"
import Link from "next/link"
import { HeartPulse } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Role = "patient" | "doctor" | "medical-store" | "ambulance" | "lab"

export default function SignupPage() {
  const router = useRouter()
  const [role, setRole] = useState<Role | "">("")

  const handleContinue = () => {
    if (!role) return;
    
    // For now, we redirect to the profile pages which act as the detailed forms.
    // We can later create dedicated sign-up forms for each role.
    switch (role) {
      case "patient":
        // Assuming a patient profile page exists or we create one
        router.push("/dashboard") // Or a dedicated patient signup form
        break
      case "doctor":
        router.push("/doctor/profile")
        break
      case "medical-store":
        router.push("/medical-store/profile")
        break
      case "ambulance":
        router.push("/ambulance/profile")
        break
      case "lab":
        router.push("/lab/profile")
        break
      default:
        // Handle case where role is not set
        break
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex items-center justify-center">
            <HeartPulse className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold font-headline">Create an Account</CardTitle>
          <CardDescription>First, tell us who you are.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="role">Select Your Role</Label>
            <Select onValueChange={(value) => setRole(value as Role)} defaultValue="">
              <SelectTrigger id="role">
                <SelectValue placeholder="Select your role..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="patient">Patient</SelectItem>
                <SelectItem value="doctor">Doctor</SelectItem>
                <SelectItem value="medical-store">Medical Store</SelectItem>
                <SelectItem value="ambulance">Ambulance Driver</SelectItem>
                <SelectItem value="lab">Lab Technician</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleContinue} className="w-full" disabled={!role}>
            Continue
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/" className="underline" prefetch={false}>
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
