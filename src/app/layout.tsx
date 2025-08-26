import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Chatbot } from '@/components/chatbot';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'RAMS.com',
  description: 'Your trusted health partner.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Roboto+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background flex flex-col min-h-screen">
        <div className="flex-grow">
          {children}
        </div>
        <Chatbot />
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
