
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Search, Phone, IndianRupee, MapPin, Loader2, Send } from "lucide-react"
import { Ambulance } from "@/lib/types/ambulance"
import { intelligentSos } from "@/ai/sos-flow"
import { useToast } from "@/hooks/use-toast"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"

export default function AmbulanceSosPage() {
  const [ambulances, setAmbulances] = useState<Ambulance[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [emergencyDescription, setEmergencyDescription] = useState("")
  const [isDescriptionSubmitted, setIsDescriptionSubmitted] = useState(false)
  const { toast } = useToast()

  const findAmbulances = (description?: string) => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser. We can't find nearby ambulances.")
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords
          const result = await intelligentSos({
            userLocation: { latitude, longitude },
            emergencyDescription: description,
          })
          if (result.ambulances.length === 0) {
            setError("No available ambulances found near you at the moment.")
          }
          setAmbulances(result.ambulances)
        } catch (e) {
          console.error("Error fetching ambulances: ", e)
          setError("AI failed to find ambulances. Please try again later.")
          toast({
            variant: "destructive",
            title: "AI Search Failed",
            description: "Could not find ambulances. Please try again."
          })
        } finally {
          setLoading(false)
        }
      },
      () => {
        setError("Unable to retrieve your location. Please enable location services.")
        setLoading(false)
      }
    )
  }
  
  useEffect(() => {
    findAmbulances()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const handleDescriptionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDescriptionSubmitted(true)
    setAmbulances([]) // Clear previous results
    findAmbulances(emergencyDescription)
  }


  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </Button>
        <h1 className="text-xl font-bold font-headline">Ambulance & SOS</h1>
        <Button variant="ghost" size="icon" disabled>
          <Search className="h-6 w-6" />
        </Button>
      </header>
      <main className="flex-1 p-4">
        <div className="mx-auto max-w-md space-y-6">

          <Card>
            <CardHeader>
                <CardTitle>Describe the Emergency (Optional)</CardTitle>
                <CardDescription>Providing details helps us send the right help faster.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleDescriptionSubmit} className="flex items-center gap-2">
                    <Input 
                        placeholder="e.g., 'Chest pain', 'Accident'"
                        value={emergencyDescription}
                        onChange={(e) => setEmergencyDescription(e.target.value)}
                        disabled={loading}
                    />
                    <Button type="submit" disabled={loading}>
                        <Send className="h-4 w-4 mr-2" />
                        Update
                    </Button>
                </form>
            </CardContent>
          </Card>

          {loading && (
             <div className="text-center space-y-4">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                <p className="text-muted-foreground">{isDescriptionSubmitted ? "Finding specialized help..." : "Finding nearest available ambulances..."}</p>
                 {Array.from({ length: 3 }).map((_, index) => (
                    <Card key={index} className="overflow-hidden">
                        <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-16 w-16 rounded-full" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                                <Skeleton className="h-4 w-full" />
                            </div>
                        </div>
                        </CardContent>
                    </Card>
                 ))}
             </div>
          )}

          {error && (
             <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!loading && !error && ambulances.map((ambulance) => (
              <Card key={ambulance.id} className="overflow-hidden border-primary border-2 shadow-lg">
                 <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 border">
                            <AvatarFallback>{ambulance.driverName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-lg">{ambulance.driverName}</CardTitle>
                            <CardDescription>{ambulance.numberPlate}</CardDescription>
                        </div>
                    </div>
                    <Badge variant={ambulance.status ? "default" : "outline"} className={ambulance.status ? "bg-green-600" : ""}>
                        {ambulance.status ? "Online" : "Offline"}
                    </Badge>
                 </CardHeader>
                <CardContent className="space-y-3 text-sm">
                     <div className="flex items-start gap-2 font-semibold">
                        <span>{ambulance.vehicleType}</span>
                    </div>
                    <div className="flex items-start gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>Service Area: {ambulance.serviceArea}</span>
                    </div>
                    <div className="flex items-start gap-2 text-muted-foreground">
                        <IndianRupee className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>Charges: {ambulance.charges}</span>
                    </div>
                     <Button className="w-full mt-2" asChild>
                        <a href={`tel:${ambulance.contact}`}>
                            <Phone className="mr-2 h-4 w-4" /> Call Now ({ambulance.contact})
                        </a>
                    </Button>
                </CardContent>
              </Card>
            ))}
        </div>
      </main>
    </div>
  )
}
