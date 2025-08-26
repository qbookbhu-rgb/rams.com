
"use server"

import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { z } from "zod";

const profileFormSchema = z.object({
  centerName: z.string().min(2, "Center name must be at least 2 characters."),
  instructorName: z.string().min(2, "Instructor name is required."),
  address: z.string().min(10, "Address is required for offline classes."),
  classTypes: z.string().min(5, "Please list the types of yoga you offer."),
  schedule: z.string().min(5, "Please provide your class schedule."),
  fee: z.string().min(1, "Please provide your fee structure."),
  onlineClasses: z.boolean().default(false),
  bio: z.string().max(500, "Bio cannot be longer than 500 characters.").optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export async function updateYogaProfile(data: ProfileFormValues) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("You must be logged in to update your profile.");
  }
  
  const validatedData = profileFormSchema.parse(data);

  try {
    await setDoc(doc(db, "yoga_centers", user.uid), {
        ...validatedData,
        userId: user.uid,
        updatedAt: new Date(),
    }, { merge: true });
  } catch (error) {
    console.error("Error writing document: ", error);
    throw new Error("Failed to save profile to the database.");
  }
}
