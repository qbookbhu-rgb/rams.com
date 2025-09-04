
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Header } from "@/components/header"
import { useToast } from "@/hooks/use-toast"
import { updateMedicalStoreProfile } from "./actions"
import { useEffect, useState } from "react"
import { auth, db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"
import { MedicalStore } from "@/lib/types/medical-stores"
import { Skeleton } from "@/components/ui/skeleton"

export const dynamic = 'force-dynamic';

const profileFormSchema = z.object({
  storeName: z.string().min(2, "Store name must be at least 2 characters."),
  ownerName: z.string().min(2, "Owner name must be at least 2 characters."),
  ownerPhoto: z.any().optional(),
  address: z.string().min(10, "Address is required."),
  licenseNo: z.string().min(5, "License number is required."),
  contact: z.string().min(10, "Contact number is required."),
  offers: z.string().optional(),
  medicineList: z.any().optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export default function MedicalStoreProfilePage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      storeName: "",
      ownerName: "",
      address: "",
      licenseNo: "",
      contact: "",
      offers: "",
    },
    mode: "onChange",
  })
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const fetchStoreData = async () => {
          setLoading(true);
          const docRef = doc(db, "medical_stores", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data() as MedicalStore;
            form.reset(data);
          }
          setLoading(false);
        };
        fetchStoreData();
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [form]);

  async function onSubmit(data: ProfileFormValues) {
    try {
      const { ownerPhoto, medicineList, ...formData } = data;
      await updateMedicalStoreProfile(formData)
      toast({
        title: "Profile Updated",
        description: "Your store information has been saved successfully.",
      })
    } catch (error) {
      console.error("Failed to update profile:", error)
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "Could not save your information. Please try again.",
      })
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 bg-background p-4 md:p-8">
        <div className="mx-auto max-w-2xl">
          {loading ? (
             <Card>
                <CardHeader>
                  <CardTitle>Edit Medical Store Profile</CardTitle>
                  <CardDescription>
                    <Skeleton className="h-4 w-3/4" />
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Skeleton className="h-24 w-full" />
                   {Array.from({ length: 6 }).map((_, i) => (
                      <div className="space-y-2" key={i}>
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    ))}
                </CardContent>
                 <CardFooter className="border-t px-6 py-4">
                  <Skeleton className="h-10 w-32" />
                </CardFooter>
              </Card>
          ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Edit Medical Store Profile</CardTitle>
                  <CardDescription>
                    Update your store information. This will be visible to patients.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src="https://i.pravatar.cc/150?u=owner" />
                        <AvatarFallback>OW</AvatarFallback>
                      </Avatar>
                      <FormField
                        control={form.control}
                        name="ownerPhoto"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Owner Photo</FormLabel>
                            <FormControl>
                              <Input type="file" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  <FormField
                    control={form.control}
                    name="storeName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Store Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your store's name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ownerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Owner Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Owner's full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address & Location</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Your store's full address"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                         <FormDescription>
                          This will be used to show your store on the map.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="licenseNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>License/Registration Number</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., LIC12345" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Store's contact number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="offers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Offers/Discounts</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe any special offers"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="medicineList"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Upload Medicine List / Add Stock</FormLabel>
                        <FormControl>
                          <Input type="file" {...field} />
                        </FormControl>
                         <FormDescription>
                          Upload a file (e.g., CSV, Excel) with your medicine stock.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <Button type="submit">Save Changes</Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
          )}
        </div>
      </main>
    </div>
  )
}
