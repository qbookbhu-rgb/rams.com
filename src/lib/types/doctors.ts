
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
    availableTimeSlots: {
        weekdays: {
            morning: string;
            evening: string;
        };
        weekends: {
            morning: string;
            evening: string;
        };
    };
    bio?: string;
    userId: string;
    updatedAt: any; 
}

