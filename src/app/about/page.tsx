
"use client"

import { Header } from "@/components/header"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function AboutUsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container mx-auto grid gap-8 p-4 py-8 md:p-12">
          <div className="mx-auto max-w-3xl">
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-4xl font-bold font-headline text-primary">About RAMS.com</CardTitle>
                <CardDescription className="text-lg">Our Mission, Vision, and Values</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 pt-6 text-base md:text-lg">
                <section>
                  <h2 className="mb-4 text-2xl font-semibold font-headline">✨ About Us (Short Overview)</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
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
                
                <Separator />

                <section>
                  <h2 className="mb-4 text-2xl font-semibold font-headline">✨ RAMS.com – About Us (संक्षिप्त विवरण)</h2>
                   <div className="space-y-4 text-muted-foreground leading-relaxed">
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

              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
