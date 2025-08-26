
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Header } from "@/components/header"
import { useToast } from "@/hooks/use-toast"
import { updateAmbulanceProfile } from "./actions"

const profileFormSchema = z.object({
  driverName: z.string().min(2, "Driver name must be at least 2 characters."),
  photo: z.any().optional(),
  numberPlate: z.string().min(5, "Number plate is required."),
  vehicleType: z.string({
    required_error: "Please select a vehicle type.",
  }),
  charges: z.string().min(1, "Charges are required."),
  status: z.boolean().default(false).describe("Online/Offline status"),
  contact: z.string().min(10, "Contact number must be at least 10 digits."),
  serviceArea: z.string().min(3, "Service area is required."),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

const defaultValues: Partial<ProfileFormValues> = {
  driverName: "Ramesh Kumar",
  numberPlate: "UP65AB1234",
  vehicleType: "ICU Ambulance",
  charges: "₹25/km",
  status: true,
  contact: "9876543210",
  serviceArea: "Varanasi"
}

export default function AmbulanceProfilePage() {
  const { toast } = useToast()
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  async function onSubmit(data: ProfileFormValues) {
    try {
      // Omit photo for now as it requires file storage.
      const { photo, ...formData } = data;
      await updateAmbulanceProfile(formData)
      toast({
        title: "Profile Updated",
        description: "Your vehicle information has been saved successfully.",
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Edit Ambulance Profile</CardTitle>
                  <CardDescription>
                    Update your vehicle and service information.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src="https://i.pravatar.cc/150?u=ambulance" />
                        <AvatarFallback>AD</AvatarFallback>
                      </Avatar>
                      <FormField
                        control={form.control}
                        name="photo"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Driver/Service Photo</FormLabel>
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
                    name="driverName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Driver/Service Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Driver or service name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="numberPlate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ambulance Number/ID</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., UP65AB1234" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="vehicleType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vehicle Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select vehicle type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Basic">Basic</SelectItem>
                            <SelectItem value="ICU Ambulance">ICU Ambulance</SelectItem>
                            <SelectItem value="Ventilator">Ventilator</SelectItem>
                            <SelectItem value="Cardiac">Cardiac</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="serviceArea"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Area / City</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Varanasi" {...field} />
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
                    name="charges"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Per Km or Per Trip Charges</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., ₹25/km or ₹1500 per trip" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Availability Status</FormLabel>
                          <FormDescription>
                            Toggle to set your status to Online or Offline.
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
        </div>
      </main>
    </div>
  )
}
