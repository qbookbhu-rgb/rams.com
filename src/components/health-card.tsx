
"use client"

import { useState, useEffect } from 'react';
import { QrCodeIcon } from "@/components/icons"
import { Skeleton } from "@/components/ui/skeleton"

interface HealthCardProps {
  name: string
  userId: string
}

function ChipIcon() {
  return (
    <svg
      width="44"
      height="32"
      viewBox="0 0 44 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-12 right-6"
    >
      <path
        d="M39.6 0H4.4C1.972 0 0 1.972 0 4.4V27.6C0 30.028 1.972 32 4.4 32H39.6C42.028 32 44 30.028 44 27.6V4.4C44 1.972 42.028 0 39.6 0Z"
        fill="#FFCA28"
      />
      <path
        d="M26.4 12.8V6.4H17.6V12.8H26.4ZM17.6 16H6.4V22.4H17.6V16ZM37.6 16H26.4V22.4H37.6V16ZM26.4 25.6V28.8H17.6V25.6H26.4Z"
        fill="#BCAAA4"
      />
    </svg>
  )
}


export function HealthCard({ name, userId }: HealthCardProps) {
  const [validThru, setValidThru] = useState('');

  useEffect(() => {
    // This code runs only on the client, after the component has mounted.
    // This avoids hydration mismatch errors.
    const currentYear = new Date().getFullYear();
    // Assuming card is valid for 3 years from the current year for display
    const expiryYear = (currentYear + 3).toString().slice(-2);
    setValidThru(`12/${expiryYear}`);
  }, []);

  // Format the user ID into groups of 4
  const formattedUserId = userId.replace(/(.{4})/g, '$1 ').trim();

  return (
    <div className="relative w-full aspect-[1.586] rounded-xl bg-[#005288] shadow-2xl text-white overflow-hidden font-mono">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute w-[500px] h-[500px] bg-[#006BAA] -top-20 -left-60 rounded-full opacity-50"></div>
        <div className="absolute w-[300px] h-[300px] bg-[#0083B0] -bottom-20 -right-20 rounded-full opacity-30"></div>
      </div>
      
      {/* Teal curve */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#00838F] origin-bottom -skew-y-12"></div>
      
      <div className="relative z-10 p-6 flex flex-col h-full">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-semibold capitalize tracking-wider">{name}</h2>
          <p className="text-lg tracking-[0.2em] opacity-80 mt-1">{formattedUserId}</p>
        </div>

        {/* Chip Icon */}
        <ChipIcon />
        
        {/* Valid Thru */}
        <div className="absolute top-[88px] right-6 text-center">
            <p className="text-[10px] opacity-70">VALID THRU</p>
            {validThru ? (
               <p className="font-semibold text-lg tracking-wider">{validThru}</p>
            ) : (
               <Skeleton className="h-6 w-12 bg-white/20 mt-1" />
            )}
        </div>


        {/* Footer */}
        <div className="mt-auto flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2">
                <div className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                </div>
                <div className="font-sans">
                    <p className="text-3xl font-bold tracking-tighter">RAMS</p>
                    <p className="text-xs tracking-[0.2em] -mt-1">HEALTH CARD</p>
                </div>
            </div>
            <p className="text-sm mt-2 font-sans font-semibold tracking-wider">
              आपका स्वास्थ्य, हमारी ज़िम्मेदारी
            </p>
          </div>

          {/* QR Code */}
          <div className="bg-white p-1.5 rounded-lg">
            <QrCodeIcon className="h-16 w-16" />
          </div>
        </div>
      </div>
    </div>
  )
}

HealthCard.Skeleton = function HealthCardSkeleton() {
    return (
        <Skeleton className="w-full aspect-[1.586] rounded-xl" />
    )
}
