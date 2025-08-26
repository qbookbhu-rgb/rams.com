
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GoogleIcon } from "@/components/icons"
import { useRouter } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

type Role = "patient" | "doctor" | "medical-store" | "ambulance" | "lab" | "yoga"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [role, setRole] = useState<Role>("patient")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mobile, setMobile] = useState("")

  const handleLogin = async () => {
    // TODO: Connect to Firebase Authentication
    console.log("Attempting login for:", { email, role })
    // Mock successful login for now
    if(email && password) {
       toast({
        title: "Login Successful",
        description: `Redirecting to ${role} dashboard...`,
      })
      switch (role) {
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
    } else {
       toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Please check your email and password.",
      })
    }
  }

  const handleOtpRequest = () => {
    if (mobile) {
      toast({
        title: "OTP Sent",
        description: `An OTP has been sent to ${mobile}.`,
      });
      // OTP logic would go here
    } else {
       toast({
        variant: "destructive",
        title: "Invalid Number",
        description: "Please enter a valid mobile number.",
      })
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 medical-background">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex items-center justify-center">
            <HeartPulse className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold font-headline">RAMS.com</CardTitle>
          <CardDescription>Your trusted health partner. Login to continue.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
             <div className="space-y-2">
                <Label htmlFor="role">Select Your Role</Label>
                 <Select onValueChange={(value) => setRole(value as Role)} defaultValue="patient">
                    <SelectTrigger id="role">
                        <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="patient">Patient</SelectItem>
                        <SelectItem value="doctor">Doctor</SelectItem>
                        <SelectItem value="medical-store">Medical Store</SelectItem>
                        <SelectItem value="ambulance">Ambulance Driver</SelectItem>
                        <SelectItem value="lab">Lab Technician</SelectItem>
                        <SelectItem value="yoga">Yoga Center</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Tabs defaultValue="email">
                <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="mobile">Mobile OTP</TabsTrigger>
                </TabsList>
                <TabsContent value="email">
                <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="name@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <Link href="#" className="ml-auto inline-block text-sm underline" prefetch={false}>
                        Forgot password?
                        </Link>
                    </div>
                    <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <Button type="submit" className="w-full" onClick={handleLogin}>
                    Login with Email
                    </Button>
                </div>
                </TabsContent>
                <TabsContent value="mobile">
                <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <Input id="mobile" type="tel" placeholder="Enter your mobile number" required value={mobile} onChange={(e) => setMobile(e.target.value)} />
                    </div>
                    <Button type="submit" className="w-full" onClick={handleOtpRequest}>
                    Send OTP
                    </Button>
                </div>
                </TabsContent>
            </Tabs>
          </div>
          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-muted" />
            <span className="mx-4 flex-shrink text-xs uppercase text-muted-foreground">Or continue with</span>
            <div className="flex-grow border-t border-muted" />
          </div>
          <Button variant="outline" className="w-full" onClick={handleLogin}>
            <GoogleIcon className="mr-2 h-5 w-5" />
            Login with Google
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="underline" prefetch={false}>
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
