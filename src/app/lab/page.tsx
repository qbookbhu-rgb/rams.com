
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

export default function LabDashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container mx-auto grid gap-8 p-4 md:p-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">
              Lab Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your lab services.
            </p>
          </div>
           <Card className="max-w-sm">
              <CardHeader>
                <CardTitle>Lab Details</CardTitle>
                <CardDescription>City Diagnostics</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Registration ID: REG4567
                </p>
                  <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                    <Link href="/lab/profile">
                      <Pencil className="mr-2 h-4 w-4" /> Edit Lab Info
                    </Link>
                  </Button>
              </CardContent>
            </Card>
        </div>
      </main>
    </div>
  )
}
