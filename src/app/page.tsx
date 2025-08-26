"use client"

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

export default function LoginPage() {
  const router = useRouter()

  const handleLogin = () => {
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex items-center justify-center">
            <HeartPulse className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold font-headline">RAMS.com Lite</CardTitle>
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
                  <Input id="email" type="email" placeholder="name@example.com" required />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link href="#" className="ml-auto inline-block text-sm underline" prefetch={false}>
                      Forgot password?
                    </Link>
                  </div>
                  <Input id="password" type="password" required />
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
                  <Input id="mobile" type="tel" placeholder="Enter your mobile number" required />
                </div>
                <Button type="submit" className="w-full" onClick={handleLogin}>
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
          <Button variant="outline" className="w-full" onClick={handleLogin}>
            <GoogleIcon className="mr-2 h-5 w-5" />
            Login with Google
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="#" className="underline" prefetch={false}>
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
