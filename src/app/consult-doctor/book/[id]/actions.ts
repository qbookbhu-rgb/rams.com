
"use server"

import { auth, db } from "@/lib/firebase";
import { doc, setDoc, collection, serverTimestamp } from "firebase/firestore";
import { z } from "zod";
import type { Doctor } from "@/lib/types/doctors";

const bookAppointmentSchema = z.object({
  doctorId: z.string(),
  doctorName: z.string(),
  patientId: z.string(),
  patientName: z.string(),
  patientEmail: z.string(),
  appointmentDate: z.string(), // Storing as ISO string
  timeSlot: z.string(),
  consultationMode: z.string(),
  consultationFee: z.number(),
  totalFee: z.number(),
});

type BookAppointmentValues = z.infer<typeof bookAppointmentSchema>;

export async function bookAppointment(data: BookAppointmentValues) {
  const user = auth.currentUser;

  if (!user || user.uid !== data.patientId) {
    throw new Error("You must be logged in to book an appointment.");
  }
  
  const validatedData = bookAppointmentSchema.parse(data);

  const appointmentRef = doc(collection(db, "appointments"));

  try {
    await setDoc(appointmentRef, {
        ...validatedData,
        id: appointmentRef.id,
        status: "confirmed",
        createdAt: serverTimestamp(),
    });

    return { success: true, appointmentId: appointmentRef.id };
  } catch (error) {
    console.error("Error creating appointment: ", error);
    throw new Error("Failed to book appointment.");
  }
}
