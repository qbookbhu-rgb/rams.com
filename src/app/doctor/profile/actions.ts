
"use server"

import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { z } from "zod";

const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  clinicName: z.string().min(2, "Clinic name must be at least 2 characters."),
  qualification: z.string().min(2, "Qualification is required."),
  specialization: z.string().min(2, "Specialization is required."),
  experience: z.coerce.number().min(0, "Experience must be a positive number."),
  consultationFee: z.coerce.number().min(0, "Fee must be a positive number."),
  contact: z.string().min(10, "Contact number must be at least 10 digits."),
  location: z.string().min(3, "Location is required."),
  availableSlots: z.string().min(3, "Available slots are required."),
  bio: z.string().max(280, "Bio cannot be longer than 280 characters.").optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export async function updateDoctorProfile(data: ProfileFormValues) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("You must be logged in to update your profile.");
  }

  const {
    // We omit photo and certificate for now as they require file storage.
    // This will be implemented in a later step.
    photo,
    certificate,
    ...restOfData
  } = data;
  
  const validatedData = profileFormSchema.parse(restOfData);

  try {
    await setDoc(doc(db, "doctors", user.uid), {
        ...validatedData,
        userId: user.uid,
        updatedAt: new Date(),
    }, { merge: true });
  } catch (error) {
    console.error("Error writing document: ", error);
    throw new Error("Failed to save profile to the database.");
  }
}
