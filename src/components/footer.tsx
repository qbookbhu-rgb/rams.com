
"use client"

import { useState, useEffect } from 'react';
import { Separator } from './ui/separator';

export function Footer() {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // This code runs only on the client
    if (typeof window !== 'undefined' && window.navigator) {
      const browserLang = navigator.language || (navigator as any).userLanguage;
      if (browserLang.startsWith('hi')) {
        setLanguage('hi');
      } else {
        setLanguage('en');
      }
    }
  }, []);

  return (
    <footer className="bg-card text-card-foreground p-6 md:p-8 mt-auto">
      <div className="container mx-auto max-w-5xl">
        {language === 'en' ? (
          <section>
            <h2 className="mb-4 text-xl font-semibold font-headline text-center">✨ About Us ✨</h2>
            <div className="space-y-3 text-center text-muted-foreground text-sm leading-relaxed">
              <p>
                RAMS (Remote Access Medical Service) is not just an app, it is a trusted healthcare partner for every family. We believe that health is not a privilege, it is a right for every human being.
              </p>
              <p>
                Our mission is to deliver affordable, accessible, and reliable healthcare services to every home – from villages to cities. Whether it is online doctor consultations, nearby pharmacies, lab tests, or emergency ambulance support – RAMS is always by your side.
              </p>
              <p>
                Our vision is to make India the capital of digital healthcare, where no patient is left untreated because of money, distance, or time. In the coming years, we want every Indian family to say – “When it comes to healthcare, we trust only RAMS.”
              </p>
              <p>
                The foundation of RAMS rests on three core values – <span className="font-semibold text-foreground">Trust</span>, <span className="font-semibold text-foreground">Transparency</span>, and <span className="font-semibold text-foreground">Care</span>. These are not just words, but our true identity and strength.
              </p>
            </div>
          </section>
        ) : (
          <section>
            <h2 className="mb-4 text-xl font-semibold font-headline text-center">✨ हमारे बारे में ✨</h2>
            <div className="space-y-3 text-center text-muted-foreground text-sm leading-relaxed">
              <p>
                RAMS (रिमोट एक्सेस मेडिकल सर्विस) सिर्फ एक ऐप नहीं, बल्कि हर परिवार के लिए भरोसेमंद स्वास्थ्य साथी है। हमारा विश्वास है कि स्वास्थ्य किसी विशेषाधिकार का नहीं बल्कि हर इंसान का अधिकार है।
              </p>
              <p>
                हमारा मिशन है कि गांव से शहर तक, हर घर तक सस्ती, सरल और सुरक्षित हेल्थकेयर सेवाएँ पहुँचें। चाहे ऑनलाइन डॉक्टर से परामर्श हो, नज़दीकी मेडिकल स्टोर से दवा, लैब टेस्ट, या आपातकाल में एम्बुलेंस – RAMS हर कदम पर आपके साथ खड़ा है।
              </p>
              <p>
                हमारा विज़न है कि भारत को डिजिटल हेल्थकेयर की राजधानी बनाया जाए, जहाँ कोई भी मरीज पैसे, दूरी या समय की वजह से इलाज से वंचित न रहे। आने वाले वर्षों में हम चाहते हैं कि हर भारतीय परिवार कहे – “स्वास्थ्य की बात हो तो सिर्फ RAMS पर भरोसा।”
              </p>
              <p>
                RAMS की बुनियाद तीन मूल्यों पर बनी है – <span className="font-semibold text-foreground">भरोसा (Trust)</span>, <span className="font-semibold text-foreground">पारदर्शिता (Transparency)</span>, और <span className="font-semibold text-foreground">देखभाल (Care)</span>। यही हमारी ताकत है और यही हमारी पहचान।
              </p>
            </div>
          </section>
        )}
        <Separator className="my-6" />
        <div className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} RAMS.com. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
