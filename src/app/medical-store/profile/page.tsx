
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

const defaultValues: Partial<ProfileFormValues> = {
  storeName: "Health Plus Pharmacy",
  ownerName: "Anil Kumar",
  address: "BHU Road, Varanasi",
  licenseNo: "LIC12345",
  contact: "9876543210",
  offers: "10% off on Diabetes Medicines",
}

export default function MedicalStoreProfilePage() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  function onSubmit(data: ProfileFormValues) {
    // TODO: Save data to Firebase
    console.log(data)
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
        </div>
      </main>
    </div>
  )
}
