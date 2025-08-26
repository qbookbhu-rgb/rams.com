
"use client"

import { useState } from "react"
import Link from "next/link"
import { HeartPulse } from "lucide-react"
import { useRouter } from "next/navigation"
import { 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"


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
import { useToast } from "@/hooks/use-toast"
import { useAuthState } from "react-firebase-hooks/auth"

type Role = "patient" | "doctor" | "medical-store" | "ambulance" | "lab" | "yoga"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mobile, setMobile] = useState("")
  const [loading, setLoading] = useState(false)
  const [user, authLoading] = useAuthState(auth)

  if (authLoading) {
    return (
       <div className="flex min-h-screen items-center justify-center p-4 medical-background">
          <Card className="w-full max-w-md shadow-2xl animate-pulse">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex items-center justify-center">
                <HeartPulse className="h-10 w-10 text-primary" />
              </div>
              <div className="h-8 bg-muted rounded w-3/4 mx-auto"></div>
              <div className="h-4 bg-muted rounded w-1/2 mx-auto mt-2"></div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="h-10 bg-muted rounded w-full"></div>
              <div className="space-y-2">
                 <div className="h-4 bg-muted rounded w-1/4"></div>
                 <div className="h-10 bg-muted rounded w-full"></div>
              </div>
              <div className="h-12 bg-muted rounded w-full"></div>
            </CardContent>
             <CardFooter className="flex justify-center">
                <div className="h-4 bg-muted rounded w-1/3"></div>
            </CardFooter>
          </Card>
      </div>
    )
  }

  if (user) {
    router.push("/dashboard");
    return null; // or a loading spinner
  }

  const handleLogin = async () => {
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please enter both email and password.",
      })
      return
    }
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Fetch user role from Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userProfile = userDocSnap.data();
        toast({
            title: "Login Successful",
            description: `Welcome back! Redirecting...`,
        });
        redirectToDashboard(userProfile.role);
      } else {
         // This case might happen if a user was created in Auth but not in Firestore
         // Or if they are a patient who hasn't been assigned a role document yet.
         // Defaulting to patient dashboard.
         toast({
            title: "Login Successful",
            description: "Welcome back! Redirecting to patient dashboard.",
         });
         redirectToDashboard("patient");
      }

    } catch (error: any) {
      console.error("Login failed:", error);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message || "Please check your credentials and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // For simplicity, we'll redirect to patient dashboard after Google sign-in.
      // A more complex implementation might ask for role selection on first Google sign-in.
      toast({
        title: "Login Successful",
        description: `Welcome! Redirecting to dashboard...`,
      });
      redirectToDashboard("patient");
    } catch (error: any) {
      console.error("Google Sign-in failed:", error);
      toast({
        variant: "destructive",
        title: "Google Sign-in Failed",
        description: error.message || "Could not sign in with Google. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };


  const handleOtpRequest = () => {
    if (mobile) {
      toast({
        title: "OTP Sent",
        description: `An OTP has been sent to ${mobile}.`,
      });
      // Further OTP logic would go here
    } else {
       toast({
        variant: "destructive",
        title: "Invalid Number",
        description: "Please enter a valid mobile number.",
      })
    }
  }
  
  const redirectToDashboard = (selectedRole: Role) => {
    switch (selectedRole) {
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
          <Tabs defaultValue="email">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="mobile">Mobile OTP</TabsTrigger>
            </TabsList>
            <TabsContent value="email">
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="name@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link href="#" className="ml-auto inline-block text-sm underline" prefetch={false}>
                      Forgot password?
                    </Link>
                  </div>
                  <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} />
                </div>
                <Button type="submit" className="w-full" onClick={handleLogin} disabled={loading}>
                 {loading ? "Logging in..." : "Login with Email"}
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
          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-muted" />
            <span className="mx-4 flex-shrink text-xs uppercase text-muted-foreground">Or continue with</span>
            <div className="flex-grow border-t border-muted" />
          </div>
          <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={loading}>
            <GoogleIcon className="mr-2 h-5 w-5" />
             {loading ? "Please wait..." : "Login with Google"}
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
