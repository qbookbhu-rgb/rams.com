
export interface Appointment {
    id: string;
    doctorId: string;
    doctorName: string;
    patientId: string;
    patientName: string;
    patientEmail: string;
    appointmentDate: string; // ISO string
    timeSlot: string;
    consultationMode: 'online' | 'offline';
    consultationFee: number;
    totalFee: number;
    status: 'confirmed' | 'cancelled' | 'completed';
    createdAt: any; // Firestore timestamp
}
