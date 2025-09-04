
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
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Header } from "@/components/header"
import { useToast } from "@/hooks/use-toast"
import { updateLabProfile } from "./actions"
import { useEffect, useState } from "react"
import { auth, db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"
import { Lab } from "@/lib/types/labs"
import { Skeleton } from "@/components/ui/skeleton"

export const dynamic = 'force-dynamic';

const profileFormSchema = z.object({
  labName: z.string().min(2, "Lab name must be at least 2 characters."),
  technicianName: z.string().min(2, "Technician name is required."),
  photo: z.any().optional(),
  address: z.string().min(10, "Address is required."),
  registrationID: z.string().min(5, "Registration ID is required."),
  services: z.string().min(5, "Services are required."),
  charges: z.string().min(1, "Charges are required."),
  certificate: z.any().optional(),
  homeCollection: z.boolean().default(false),
  contact: z.string().min(10, "Contact number is required."),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>


export default function LabProfilePage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
        labName: "",
        technicianName: "",
        address: "",
        registrationID: "",
        services: "",
        charges: "",
        homeCollection: false,
        contact: "",
    },
    mode: "onChange",
  })
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const fetchLabData = async () => {
          setLoading(true);
          const docRef = doc(db, "labs", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data() as Lab;
            form.reset(data);
          }
          setLoading(false);
        };
        fetchLabData();
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [form]);

  async function onSubmit(data: ProfileFormValues) {
    try {
      // Omit photo and certificate for now as they require file storage.
      const { photo, certificate, ...formData } = data;
      await updateLabProfile(formData)
      toast({
        title: "Profile Updated",
        description: "Your lab information has been saved successfully.",
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
                  <CardTitle>Edit Lab Profile</CardTitle>
                  <CardDescription>
                    <Skeleton className="h-4 w-3/4" />
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Skeleton className="h-24 w-full" />
                   {Array.from({ length: 8 }).map((_, i) => (
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
                  <CardTitle>Edit Lab Profile</CardTitle>
                  <CardDescription>
                    Update your lab information. This will be visible to patients.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src="https://i.pravatar.cc/150?u=lab" />
                        <AvatarFallback>LT</AvatarFallback>
                      </Avatar>
                      <FormField
                        control={form.control}
                        name="photo"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Technician/Lab Photo</FormLabel>
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
                    name="labName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lab/Center Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your lab's name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="technicianName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Technician Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Technician's full name" {...field} />
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
                            placeholder="Your lab's full address"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This will be used to show your lab on the map.
                        </FormDescription>
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
                          <Input placeholder="Lab contact number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="registrationID"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Registration ID</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., REG4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="services"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Services Offered</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Blood Test, X-Ray, MRI" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="charges"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Charges for Different Tests</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., Blood Test: ₹200, X-Ray: ₹500"
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
                      name="certificate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Upload Lab Certificate</FormLabel>
                          <FormControl>
                            <Input type="file" {...field} />
                          </FormControl>
                          <FormDescription>
                            Upload a scan of your lab's registration certificate.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  <FormField
                    control={form.control}
                    name="homeCollection"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Home Sample Collection</FormLabel>
                          <FormDescription>
                            Do you offer sample collection from the patient's home?
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
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
