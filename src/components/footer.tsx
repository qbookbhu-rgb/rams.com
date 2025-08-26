
"use client"

import { useState, useEffect } from 'react';
import { Separator } from './ui/separator';

export function Footer() {

  return (
    <footer className="bg-card text-card-foreground p-6 md:p-8 mt-auto">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} RAMS.com. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
