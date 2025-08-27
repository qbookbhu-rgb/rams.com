
"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


const specialities = [
  { 
    name: "Gynaecology", 
    price: "599",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
        <path d="M32 60C46.3594 60 58 48.3594 58 34C58 19.6406 46.3594 8 32 8C17.6406 8 6 19.6406 6 34C6 48.3594 17.6406 60 32 60Z" fill="#D1C4E9"/>
        <path d="M32 8C32 3.58172 35.5817 0 40 0C44.4183 0 48 3.58172 48 8C48 12.4183 44.4183 16 40 16C35.5817 16 32 12.4183 32 8Z" fill="#7E57C2"/>
        <path d="M40.1993 35.8C38.9993 39 35.8993 41.2 32.3993 41.2C28.8993 41.2 25.7993 39 24.5993 35.8C23.3993 32.6 24.5993 28.6 27.5993 26.6C30.5993 24.6 34.1993 24.6 37.1993 26.6C40.1993 28.6 41.3993 32.6 40.1993 35.8Z" fill="#FFFFFF"/>
        <path d="M40 16C37.2386 16 35 13.7614 35 11C35 8.23858 37.2386 6 40 6C42.7614 6 45 8.23858 45 11C45 13.7614 42.7614 16 40 16Z" fill="#5E35B1"/>
      </svg>
    )
  },
  { 
    name: "Sexology", 
    price: "599",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="26" fill="#E1BEE7"/>
        <path d="M36 14H50V28" stroke="#AB47BC" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M28 50H14V36" stroke="#42A5F5" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M48 16L32 32" stroke="#AB47BC" strokeWidth="6" strokeLinecap="round"/>
        <path d="M16 48L24 40" stroke="#42A5F5" strokeWidth="6" strokeLinecap="round"/>
        <circle cx="21" cy="43" r="11" stroke="#42A5F5" strokeWidth="6"/>
        <circle cx="43" cy="21" r="11" stroke="#AB47BC" strokeWidth="6"/>
      </svg>
    )
  },
  { 
    name: "General physician", 
    price: "499",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
        <path d="M24 16C24 12.6863 26.6863 10 30 10H46C49.3137 10 52 12.6863 52 16V30C52 32.7614 49.7614 35 47 35H38V49C38 52.3137 35.3137 55 32 55C28.6863 55 26 52.3137 26 49V20C26 17.7909 24.2091 16 22 16H18C14.6863 16 12 18.6863 12 22C12 25.3137 14.6863 28 18 'react'28H24V16Z" fill="#F48FB1"/>
        <circle cx="40" cy="22" r="10" fill="#E57373"/>
        <path d="M37 20H43" stroke="white" strokeWidth="4" strokeLinecap="round"/>
        <path d="M40 23V17" stroke="white" strokeWidth="4" strokeLinecap="round"/>
      </svg>
    )
  },
  { 
    name: "Dermatology", 
    price: "549",
    icon: (
       <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
        <path d="M32 60C46.3594 60 58 48.3594 58 34C58 19.6406 46.3594 8 32 8C17.6406 8 6 19.6406 6 34C6 48.3594 17.6406 60 32 60Z" fill="#C5CAE9"/>
        <path d="M32 8C32 3.58172 35.5817 0 40 0C44.4183 0 48 3.58172 48 8C48 12.4183 44.4183 16 40 16C35.5817 16 32 12.4183 32 8Z" fill="#7986CB"/>
        <circle cx="20" cy="28" r="3" fill="#FF8A65"/>
        <circle cx="44" cy="28" r="3" fill="#FF8A65"/>
        <circle cx="32" cy="40" r="4" fill="#FF8A65"/>
        <circle cx="25" cy="48" r="2" fill="#FF8A65"/>
      </svg>
    )
  },
  { 
    name: "Psychiatry", 
    price: "599",
    icon: (
       <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="26" fill="#FFCC80"/>
        <path d="M32 18H42M42 18V28M42 18L32 28" stroke="#FB8C00" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 34H32" stroke="white" strokeWidth="4" strokeLinecap="round"/>
        <path d="M27 39V29" stroke="white" strokeWidth="4" strokeLinecap="round"/>
        <circle cx="27" cy="34" r="10" fill="#FFF"/>
      </svg>
    )
  },
  { 
    name: "Stomach and digestion", 
    price: "499",
    icon: (
       <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
        <path d="M32 6C16 6 12 18 12 26C12 42 22 58 32 58C42 58 52 42 52 26C52 18 48 6 32 6Z" fill="#81D4FA"/>
        <path d="M32 58C26 58 24 50 24 44C24 38 28 34 32 34C36 34 40 38 40 44C40 50 38 58 32 58Z" fill="#4FC3F7"/>
        <path d="M40 22C40 26.4183 36.4183 30 32 30C27.5817 30 24 26.4183 24 22C24 17.5817 27.5817 14 32 14C36.4183 14 40 17.5817 40 22Z" fill="white"/>
      </svg>
    )
  }
];

const healthConcerns = [
    { name: "Cough & Cold?", image: "https://picsum.photos/seed/cough/400/400", hint: "cough cold" },
    { name: "Period problems?", image: "https://picsum.photos/seed/period/400/400", hint: "woman calendar" },
    { name: "Performance issues in bed?", image: "https://picsum.photos/seed/performance/400/400", hint: "couple bed" },
    { name: "Skin problems?", image: "https://picsum.photos/seed/skin/400/400", hint: "woman mirror" },
    { name: "Depression?", image: "https://picsum.photos/seed/depression/400/400", hint: "sad person" }
];


export default function ConsultDoctorPage() {

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </Button>
        <h1 className="text-xl font-bold font-headline">Consult a Doctor</h1>
        <div className="w-9"></div>
      </header>
      <main className="flex-1 p-4 md:p-8">
        <div className="mx-auto max-w-5xl space-y-12">
            
          {/* Specialities Section */}
          <section>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-2xl font-semibold tracking-tight font-headline">25+ Specialities</h2>
                    <p className="text-muted-foreground">Consult with top doctors across specialities</p>
                </div>
                <Button variant="outline" asChild>
                    <Link href="/consult-doctor/doctors-list">See all Specialities</Link>
                </Button>
            </div>

            <Carousel opts={{ align: "start", loop: false }} className="w-full">
              <CarouselContent>
                {specialities.map((speciality, index) => (
                  <CarouselItem key={index} className="basis-1/2 md:basis-1/4 lg:basis-1/6">
                    <Link href="/consult-doctor/doctors-list" className="block">
                      <Card className="hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                           {speciality.icon}
                          <h3 className="font-semibold text-sm mt-2">{speciality.name}</h3>
                          <p className="text-sm text-muted-foreground">₹{speciality.price}</p>
                          <span className="text-primary font-semibold text-sm">Consult now &gt;</span>
                        </CardContent>
                      </Card>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-[-16px]" />
              <CarouselNext className="absolute right-[-16px]" />
            </Carousel>
          </section>

          {/* Common Health Concerns Section */}
           <section>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-2xl font-semibold tracking-tight font-headline">Common Health Concerns</h2>
                    <p className="text-muted-foreground">Consult a doctor online for any health issue</p>
                </div>
                <Button variant="outline" asChild>
                    <Link href="/consult-doctor/doctors-list">See All Symptoms</Link>
                </Button>
            </div>

            <Carousel opts={{ align: "start", loop: false }} className="w-full">
              <CarouselContent>
                {healthConcerns.map((concern, index) => (
                  <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <Link href="/consult-doctor/doctors-list" className="block">
                      <Card className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                        <Image 
                            src={concern.image}
                            alt={concern.name}
                            width={400}
                            height={400}
                            data-ai-hint={concern.hint}
                            className="aspect-square w-full object-cover"
                        />
                        <CardContent className="p-3">
                          <h3 className="font-semibold text-center">{concern.name}</h3>
                        </CardContent>
                      </Card>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-[-16px]" />
              <CarouselNext className="absolute right-[-16px]" />
            </Carousel>
          </section>

        </div>
      </main>
    </div>
  )
}
