
"use client"

import { useState } from "react"
import {
  generateImage,
  GenerateImageOutput,
} from "@/ai/image-generation-flow"
import { Sparkles, Image as ImageIcon, Loader2 } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ImageGeneratorPage() {
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<GenerateImageOutput | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGeneration = async () => {
    if (!prompt) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await generateImage({ prompt })
      setResult(res)
    } catch (e) {
      console.error(e)
      setError("An error occurred while generating the image. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container mx-auto grid gap-8 p-4 md:p-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight font-headline flex items-center justify-center gap-2">
              <Sparkles className="h-8 w-8 text-primary" />
              AI Image Generator
            </h1>
            <p className="text-muted-foreground">
              Describe the image you want to create, and I'll generate it for you.
            </p>
          </div>

          <div className="mx-auto w-full max-w-lg">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="e.g., 'A logo for a modern healthcare company'"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGeneration()}
                disabled={loading}
                className="flex-1"
              />
              <Button onClick={handleGeneration} disabled={loading || !prompt}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ImageIcon className="mr-2 h-4 w-4" />}
                {loading ? "Generating..." : "Generate"}
              </Button>
            </div>
          </div>

          {error && (
            <Alert variant="destructive" className="mx-auto w-full max-w-lg">
                <AlertTitle>Generation Failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {loading && (
             <Card className="mx-auto w-full max-w-lg">
                <CardContent className="p-6">
                    <div className="aspect-square w-full flex items-center justify-center bg-muted rounded-md">
                        <Loader2 className="h-16 w-16 animate-spin text-primary" />
                    </div>
                </CardContent>
             </Card>
          )}

          {result && (
            <Card className="mx-auto w-full max-w-lg">
                <CardHeader>
                    <CardTitle>Generated Image</CardTitle>
                    <CardDescription>Right-click to save the image. You can use it in the app code.</CardDescription>
                </CardHeader>
              <CardContent>
                <div className="aspect-square w-full relative">
                    <Image 
                        src={result.image}
                        alt={prompt}
                        fill
                        className="rounded-md object-contain"
                    />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
