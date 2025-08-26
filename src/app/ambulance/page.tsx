"use client"

import { Header } from "@/components/header"

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
        </div>
      </main>
    </div>
  )
}
