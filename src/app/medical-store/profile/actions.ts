
"use server"

import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { z } from "zod";

const profileFormSchema = z.object({
  storeName: z.string().min(2, "Store name must be at least 2 characters."),
  ownerName: z.string().min(2, "Owner name must be at least 2 characters."),
  address: z.string().min(10, "Address is required."),
  licenseNo: z.string().min(5, "License number is required."),
  contact: z.string().min(10, "Contact number is required."),
  offers: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export async function updateMedicalStoreProfile(data: ProfileFormValues) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("You must be logged in to update your profile.");
  }
  
  const validatedData = profileFormSchema.parse(data);

  try {
    await setDoc(doc(db, "medical_stores", user.uid), {
        ...validatedData,
        userId: user.uid,
        updatedAt: new Date(),
    }, { merge: true });
  } catch (error) {
    console.error("Error writing document: ", error);
    throw new Error("Failed to save profile to the database.");
  }
}
