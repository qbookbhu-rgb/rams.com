
"use client"

import { useState } from "react"
import Link from "next/link"
import { HeartPulse } from "lucide-react"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "@/lib/firebase"
import { doc, setDoc } from "firebase/firestore"


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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

type Role = "patient" | "doctor" | "medical-store" | "ambulance" | "lab" | "yoga"

export default function SignupPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [role, setRole] = useState<Role | "">("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignup = async () => {
    if (!role) {
      toast({
        variant: "destructive",
        title: "Role not selected",
        description: "Please select a role to continue.",
      })
      return
    }
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords do not match",
        description: "Please check your password and try again.",
      })
      return
    }
    
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user role in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        role: role,
        createdAt: new Date(),
      });
      
      toast({
        title: "Signup Successful",
        description: "Please fill in your profile details.",
      })

      // Redirect to the correct profile page after successful signup
      switch (role) {
        case "patient":
          router.push("/dashboard") 
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
        case "yoga":
            router.push("/yoga/profile")
            break
        default:
          router.push("/dashboard")
          break
      }
    } catch (error: any) {
      console.error("Signup failed:", error);
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: error.message || "Could not create your account. Please try again.",
      })
    } finally {
      setLoading(false);
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
          <CardDescription>Join our network of patients and providers.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="role">I am a...</Label>
            <Select onValueChange={(value) => setRole(value as Role)} defaultValue={role}>
              <SelectTrigger id="role" disabled={loading}>
                <SelectValue placeholder="Select your role..." />
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
           <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="name@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading}/>
            </div>
             <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} disabled={loading}/>
            </div>
          <Button onClick={handleSignup} className="w-full" disabled={loading || !role || !email || !password}>
            {loading ? "Creating Account..." : "Create Account"}
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
