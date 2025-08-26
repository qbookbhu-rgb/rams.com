
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
import { updateDoctorProfile } from "./actions"
import { useEffect, useState } from "react"
import { auth, db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"
import { Doctor } from "@/lib/types/doctors"
import { Skeleton } from "@/components/ui/skeleton"

const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  photo: z.any().optional(),
  clinicName: z.string().min(2, "Clinic name must be at least 2 characters."),
  qualification: z.string().min(2, "Qualification is required."),
  specialization: z.string().min(2, "Specialization is required."),
  experience: z.coerce.number().min(0, "Experience must be a positive number."),
  consultationFee: z.coerce.number().min(0, "Fee must be a positive number."),
  contact: z.string().min(10, "Contact number must be at least 10 digits."),
  location: z.string().min(3, "Location is required."),
  availableSlots: z.string().min(3, "Available slots are required."),
  bio: z.string().max(280, "Bio cannot be longer than 280 characters.").optional(),
  certificate: z.any().optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export default function DoctorProfilePage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      clinicName: "",
      qualification: "",
      specialization: "",
      experience: 0,
      consultationFee: 0,
      contact: "",
      location: "",
      availableSlots: "",
      bio: "",
    },
    mode: "onChange",
  })
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const fetchDoctorData = async () => {
          setLoading(true);
          const docRef = doc(db, "doctors", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data() as Doctor;
            form.reset(data);
          }
          setLoading(false);
        };
        fetchDoctorData();
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [form]);


  async function onSubmit(data: ProfileFormValues) {
    try {
      await updateDoctorProfile(data)
      toast({
        title: "Profile Updated",
        description: "Your information has been saved successfully.",
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
                  <CardTitle>Edit Doctor Profile</CardTitle>
                  <CardDescription>
                    <Skeleton className="h-4 w-3/4" />
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Skeleton className="h-24 w-full" />
                   {Array.from({ length: 9 }).map((_, i) => (
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
                    <CardTitle>Edit Doctor Profile</CardTitle>
                    <CardDescription>
                      Update your professional information. This will be visible to patients.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704e" />
                          <AvatarFallback>DR</AvatarFallback>
                        </Avatar>
                        <FormField
                          control={form.control}
                          name="photo"
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel>Profile Photo</FormLabel>
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
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="clinicName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Clinic Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your clinic's name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="qualification"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Qualification</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., MBBS, MD" {...field} />
                          </FormControl>
                          <FormDescription>
                            Your highest medical degrees.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="specialization"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Specialization</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Cardiologist" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Experience (in years)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="e.g., 10" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="consultationFee"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Consultation Fee</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="e.g., 500" {...field} />
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
                            <Input placeholder="Your contact number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="Your clinic's address" {...field} />
                          </FormControl>
                          <FormDescription>
                            This will be used to show your clinic on the map.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="availableSlots"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Available Slots</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 10:00AM-12:00PM, 5:00PM-8:00PM" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell patients a little about yourself"
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
                            <FormLabel>Upload Registration Certificate</FormLabel>
                            <FormControl>
                              <Input type="file" {...field} />
                            </FormControl>
                            <FormDescription>
                              Upload a scan of your medical registration certificate.
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
