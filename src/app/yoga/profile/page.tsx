
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
import { updateYogaProfile } from "./actions"
import { useEffect, useState } from "react"
import { auth, db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"
import { YogaCenter } from "@/lib/types/yoga"
import { Skeleton } from "@/components/ui/skeleton"

export const dynamic = 'force-dynamic';

const profileFormSchema = z.object({
  centerName: z.string().min(2, "Center name must be at least 2 characters."),
  instructorName: z.string().min(2, "Instructor name is required."),
  photo: z.any().optional(),
  address: z.string().min(10, "Address is required for offline classes."),
  classTypes: z.string().min(5, "Please list the types of yoga you offer."),
  schedule: z.string().min(5, "Please provide your class schedule."),
  fee: z.string().min(1, "Please provide your fee structure."),
  onlineClasses: z.boolean().default(false),
  bio: z.string().max(500, "Bio cannot be longer than 500 characters.").optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>


export default function YogaProfilePage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      centerName: "",
      instructorName: "",
      address: "",
      classTypes: "",
      schedule: "",
      fee: "",
      onlineClasses: false,
      bio: "",
    },
    mode: "onChange",
  })
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const fetchYogaData = async () => {
          setLoading(true);
          const docRef = doc(db, "yoga_centers", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data() as YogaCenter;
            form.reset(data);
          }
          setLoading(false);
        };
        fetchYogaData();
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [form]);

  async function onSubmit(data: ProfileFormValues) {
    try {
      // Omit photo for now as it requires file storage.
      const { photo, ...formData } = data;
      await updateYogaProfile(formData)
      toast({
        title: "Profile Updated",
        description: "Your yoga center information has been saved successfully.",
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
                  <CardTitle>Edit Yoga Center Profile</CardTitle>
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
                  <CardTitle>Edit Yoga Center Profile</CardTitle>
                  <CardDescription>
                    Update your center information. This will be visible to users.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src="https://i.pravatar.cc/150?u=yoga" />
                        <AvatarFallback>YC</AvatarFallback>
                      </Avatar>
                      <FormField
                        control={form.control}
                        name="photo"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Instructor/Center Photo</FormLabel>
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
                    name="centerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Yoga Center / Studio Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your center's name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="instructorName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lead Instructor Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Instructor's full name" {...field} />
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
                        <FormLabel>Address & Location (for offline classes)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Your center's full address"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This will be used to show your center on the map.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="classTypes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Types of Yoga/Wellness Offered</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Hatha, Vinyasa, Meditation" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="schedule"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Weekly Schedule</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., Mon-Fri: 7-8 AM, 6-7 PM | Sat-Sun: 8-9:30 AM"
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
                    name="fee"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fee Structure</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., ₹200/class, ₹2000/month" {...field} />
                        </FormControl>
                         <FormDescription>
                          Mention per class, monthly, or package fees.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>About Your Center/Classes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell users about your unique approach to yoga and wellness."
                            className="resize-none h-24"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="onlineClasses"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Offer Online Classes</FormLabel>
                          <FormDescription>
                            Do you provide live online yoga sessions for remote users?
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
