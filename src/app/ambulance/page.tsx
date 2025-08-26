
"use client"

import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Pencil } from "lucide-react"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function AmbulanceDashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container mx-auto grid gap-8 p-4 md:p-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">
              Ambulance Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your ambulance service.
            </p>
          </div>
          <Card className="max-w-sm">
            <CardHeader>
              <CardTitle>Driver & Vehicle Details</CardTitle>
              <CardDescription>Ramesh Kumar - UP65AB1234</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Vehicle Type: ICU Ambulance
              </p>
              <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                <Link href="/ambulance/profile">
                  <Pencil className="mr-2 h-4 w-4" /> Edit Vehicle Info
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
