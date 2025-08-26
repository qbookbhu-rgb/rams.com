
"use server"

import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { z } from "zod";

const profileFormSchema = z.object({
  labName: z.string().min(2, "Lab name must be at least 2 characters."),
  technicianName: z.string().min(2, "Technician name is required."),
  address: z.string().min(10, "Address is required."),
  registrationID: z.string().min(5, "Registration ID is required."),
  services: z.string().min(5, "Services are required."),
  charges: z.string().min(1, "Charges are required."),
  homeCollection: z.boolean().default(false),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export async function updateLabProfile(data: ProfileFormValues) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("You must be logged in to update your profile.");
  }

  const validatedData = profileFormSchema.parse(data);

  try {
    await setDoc(doc(db, "labs", user.uid), {
        ...validatedData,
        userId: user.uid,
        updatedAt: new Date(),
    }, { merge: true });
  } catch (error) {
    console.error("Error writing document: ", error);
    throw new Error("Failed to save profile to the database.");
  }
}
