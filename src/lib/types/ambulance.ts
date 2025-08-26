
export interface Ambulance {
    id: string;
    driverName: string;
    numberPlate: string;
    vehicleType: string;
    charges: string;
    status: boolean;
    contact: string;
    serviceArea: string;
    userId: string;
    updatedAt: any;
    location?: {
        latitude: number;
        longitude: number;
    };
}
