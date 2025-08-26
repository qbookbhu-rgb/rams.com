
export interface Doctor {
    id: string;
    name: string;
    clinicName: string;
    qualification: string;
    specialization: string;
    experience: number;
    consultationFee: number;
    contact: string;
    location: string;
    availableSlots: string;
    bio?: string;
    userId: string;
    updatedAt: any; // Ideally should be a Timestamp or Date type
}
