
"use server"

import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { z } from "zod";

const profileFormSchema = z.object({
  driverName: z.string().min(2, "Driver name must be at least 2 characters."),
  numberPlate: z.string().min(5, "Number plate is required."),
  vehicleType: z.string({
    required_error: "Please select a vehicle type.",
  }),
  charges: z.string().min(1, "Charges are required."),
  status: z.boolean().default(false).describe("Online/Offline status"),
  contact: z.string().min(10, "Contact number must be at least 10 digits."),
  serviceArea: z.string().min(3, "Service area is required."),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export async function updateAmbulanceProfile(data: ProfileFormValues) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("You must be logged in to update your profile.");
  }
  
  const validatedData = profileFormSchema.parse(data);

  try {
    await setDoc(doc(db, "ambulances", user.uid), {
        ...validatedData,
        userId: user.uid,
        updatedAt: new Date(),
    }, { merge: true });
  } catch (error) {
    console.error("Error writing document: ", error);
    throw new Error("Failed to save profile to the database.");
  }
}
