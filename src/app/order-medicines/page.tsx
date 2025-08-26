
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Search, Store, MapPin, Tag, Upload } from "lucide-react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { MedicalStore } from "@/lib/types/medical-stores"
import { seedMedicalStores } from "@/lib/seed-data"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function OrderMedicinesPage() {
  const [stores, setStores] = useState<MedicalStore[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStores = async () => {
      setLoading(true)
      setError(null)
      try {
        const querySnapshot = await getDocs(collection(db, "medical_stores"));
        if (querySnapshot.empty) {
            console.log("No medical stores found in Firestore, using seed data.");
            setStores(seedMedicalStores);
        } else {
            const storesData = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            })) as MedicalStore[];
            setStores(storesData);
        }
      } catch (e) {
        console.error("Error fetching medical stores: ", e)
        setError("Failed to load medical stores. Using sample data.")
        setStores(seedMedicalStores);
      } finally {
        setLoading(false)
      }
    }

    fetchStores()
  }, [])

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </Button>
        <h1 className="text-xl font-bold font-headline">Order Medicines</h1>
        <Button variant="ghost" size="icon">
          <Search className="h-6 w-6" />
        </Button>
      </header>
      <main className="flex-1 p-4">
        <div className="mx-auto max-w-md space-y-6">
          {loading && (
             Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                       <Skeleton className="h-4 w-full" />
                       <Skeleton className="h-4 w-1/2" />
                       <Skeleton className="h-10 w-full mt-2" />
                    </CardContent>
                </Card>
             ))
          )}

          {error && <p className="text-center text-red-500">{error}</p>}

          {!loading && !error && stores.map((store) => (
              <Card key={store.id} className="overflow-hidden">
                 <CardHeader>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 border">
                            <AvatarFallback><Store /></AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-lg">{store.storeName}</CardTitle>
                            <CardDescription>Owner: {store.ownerName}</CardDescription>
                        </div>
                    </div>
                 </CardHeader>
                <CardContent className="space-y-3 text-sm">
                    <div className="flex items-start gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>{store.address}</span>
                    </div>
                    {store.offers && (
                        <div className="flex items-start gap-2 text-primary font-semibold">
                            <Tag className="h-4 w-4 mt-0.5 shrink-0" />
                            <span>{store.offers}</span>
                        </div>
                    )}
                     <Button className="w-full mt-2" size="lg" asChild>
                        <Link href="/consult-doctor">
                           <Upload className="mr-2 h-4 w-4" /> Upload Prescription
                        </Link>
                    </Button>
                </CardContent>
              </Card>
            ))}
        </div>
      </main>
    </div>
  )
}
