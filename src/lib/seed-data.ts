
import { Doctor } from './types/doctors';
import { Lab } from './types/labs';
import { MedicalStore } from './types/medical-stores';
import { YogaCenter } from './types/yoga';


export const seedDoctors: Doctor[] = [
  {
    id: "doc1",
    name: "Dr. Alok Gupta",
    clinicName: "Gupta Health Clinic",
    qualification: "MBBS, MD (Cardiology)",
    specialization: "Cardiologist",
    experience: 15,
    consultationFee: 800,
    contact: "9876543210",
    location: "Sigra, Varanasi",
    availableTimeSlots: {
      weekdays: { morning: "10:00 AM - 1:00 PM", evening: "5:00 PM - 8:00 PM" },
      weekends: { morning: "11:00 AM - 2:00 PM", evening: "Closed" },
    },
    bio: "Renowned cardiologist with 15 years of experience in treating heart conditions.",
    userId: "seed_doc1",
    updatedAt: new Date(),
  },
  {
    id: "doc2",
    name: "Dr. Priya Singh",
    clinicName: "Skin & Care Clinic",
    qualification: "MBBS, DDVL",
    specialization: "Dermatologist",
    experience: 8,
    consultationFee: 600,
    contact: "9876543211",
    location: "Lanka, Varanasi",
     availableTimeSlots: {
      weekdays: { morning: "11:00 AM - 2:00 PM", evening: "6:00 PM - 9:00 PM" },
      weekends: { morning: "10:00 AM - 1:00 PM", evening: "Closed" },
    },
    bio: "Specializes in all types of skin and hair treatments.",
    userId: "seed_doc2",
    updatedAt: new Date(),
  },
  {
    id: "doc3",
    name: "Dr. Rajesh Kumar",
    clinicName: "Child Care Center",
    qualification: "MBBS, DCH",
    specialization: "Pediatrician",
    experience: 12,
    consultationFee: 500,
    contact: "9876543212",
    location: "Mahmoorganj, Varanasi",
    availableTimeSlots: {
      weekdays: { morning: "9:00 AM - 12:00 PM", evening: "4:00 PM - 7:00 PM" },
      weekends: { morning: "9:00 AM - 1:00 PM", evening: "Closed" },
    },
    bio: "Dedicated pediatrician focused on child wellness and development.",
    userId: "seed_doc3",
    updatedAt: new Date(),
  },
   {
    id: "doc4",
    name: "Dr. Anita Verma",
    clinicName: "Verma Dental Care",
    qualification: "BDS, MDS",
    specialization: "Dentist",
    experience: 10,
    consultationFee: 400,
    contact: "9876543213",
    location: "Pandeypur, Varanasi",
     availableTimeSlots: {
      weekdays: { morning: "10:00 AM - 1:00 PM", evening: "5:00 PM - 8:00 PM" },
      weekends: { morning: "10:00 AM - 2:00 PM", evening: "Closed" },
    },
    bio: "Expert in dental procedures including root canals, implants, and cosmetic dentistry.",
    userId: "seed_doc4",
    updatedAt: new Date(),
  },
];


export const seedLabs: Lab[] = [
    {
        id: "lab1",
        labName: "Modern Pathology Lab",
        technicianName: "Mr. Rakesh Singh",
        address: "Bhelupur, Varanasi",
        registrationID: "LABVNS001",
        services: "Blood Test, Urine Test, Sugar Test, Thyroid Profile",
        charges: "Varies per test. Basic blood test starts at ₹150.",
        homeCollection: true,
        userId: "seed_lab1",
        updatedAt: new Date(),
    },
     {
        id: "lab2",
        labName: "Accurate Diagnostics",
        technicianName: "Ms. Sunita Patel",
        address: "Lanka, Varanasi",
        registrationID: "LABVNS002",
        services: "X-Ray, Ultrasound, CT Scan, MRI",
        charges: "X-Ray starts at ₹300. Advanced imaging as per rate card.",
        homeCollection: false,
        userId: "seed_lab2",
        updatedAt: new Date(),
    },
     {
        id: "lab3",
        labName: "Varanasi Health Scans",
        technicianName: "Mr. Anand Kumar",
        address: "Mahmoorganj, Varanasi",
        registrationID: "LABVNS003",
        services: "Full Body Checkup, Cardiac Markers, Cancer Markers",
        charges: "Health packages start from ₹999.",
        homeCollection: true,
        userId: "seed_lab3",
        updatedAt: new Date(),
    }
];

export const seedMedicalStores: MedicalStore[] = [
    {
        id: "ms1",
        storeName: "Apollo Pharmacy",
        ownerName: "Mr. Suresh Gupta",
        address: "Sigra, Varanasi",
        licenseNo: "UPVNS12345",
        contact: "8876543210",
        offers: "15% off on all medicines",
        userId: "seed_ms1",
        updatedAt: new Date(),
    },
    {
        id: "ms2",
        storeName: "Jeevan Medicals",
        ownerName: "Mr. Dinesh Sharma",
        address: "Lanka, Varanasi",
        licenseNo: "UPVNS67890",
        contact: "8876543211",
        offers: "24/7 Service Available",
        userId: "seed_ms2",
        updatedAt: new Date(),
    },
    {
        id: "ms3",
        storeName: "Kashi Medicos",
        ownerName: "Mr. Rajan Mishra",
        address: "Chowk, Varanasi",
        licenseNo: "UPVNS11223",
        contact: "8876543212",
        offers: "Free home delivery within 5km",
        userId: "seed_ms3",
        updatedAt: new Date(),
    }
];

export const seedYogaCenters: YogaCenter[] = [
    {
        id: "yoga1",
        centerName: "Kashi Yoga Shala",
        instructorName: "Yogi Adityanath",
        address: "Assi Ghat, Varanasi",
        classTypes: "Hatha, Ashtanga, Meditation",
        schedule: "Mon-Sat: 6-8 AM & 5-7 PM",
        fee: "₹2500/month",
        onlineClasses: true,
        bio: "Traditional yoga taught on the serene banks of the Ganges.",
        userId: "seed_yoga1",
        updatedAt: new Date(),
    },
    {
        id: "yoga2",
        centerName: "Varanasi Wellness Center",
        instructorName: "Priya Sharma",
        address: "Nadesar, Varanasi",
        classTypes: "Vinyasa, Power Yoga, Prenatal Yoga",
        schedule: "Mon-Fri: 7-8 AM, 6-7 PM",
        fee: "₹3000/month, ₹400/class",
        onlineClasses: true,
        bio: "A modern studio focusing on fitness and wellness through dynamic yoga flows.",
        userId: "seed_yoga2",
        updatedAt: new Date(),
    }
];
