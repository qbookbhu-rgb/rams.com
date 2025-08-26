
"use client"

import { useState } from "react"
import {
  aiSearchForSpecialists,
  AISearchForSpecialistsOutput,
} from "@/ai/ai-assisted-search"
import { Search, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AISearchPage() {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<AISearchForSpecialistsOutput | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async () => {
    if (!query) return
    setLoading(true)
    setError(null)
    setResults(null)
    try {
      const res = await aiSearchForSpecialists({ query })
      setResults(res)
    } catch (e) {
      console.error(e)
      setError("An error occurred while searching. Please try again.")
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
              Anand - Your AI Health Assistant
            </h1>
            <p className="text-muted-foreground">
              Describe your symptoms, and I'll help you find the right specialist.
            </p>
          </div>

          <div className="mx-auto w-full max-w-lg">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="e.g., 'I have a fever and a sore throat'"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                disabled={loading}
                className="flex-1"
              />
              <Button onClick={handleSearch} disabled={loading}>
                {loading ? "Searching..." : <><Search className="mr-2 h-4 w-4" /> Search</>}
              </Button>
            </div>
          </div>

          {error && <p className="text-center text-red-500">{error}</p>}

          {results && (
            <Card className="mx-auto w-full max-w-lg">
              <CardHeader>
                <CardTitle>AI-Powered Suggestions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md border bg-muted p-4 text-sm">
                  <p>{results.response}</p>
                </div>
                {results.specialists.length > 0 ? (
                    <div>
                        <h3 className="font-semibold mb-2">Suggested Specialists:</h3>
                        <ul className="space-y-2">
                            {results.specialists.map((specialist, index) => (
                            <li key={index} className="rounded-md border p-4 text-center font-medium">
                                {specialist}
                            </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                  <p className="text-center text-muted-foreground">
                    No specific specialists could be determined. Please try being more specific with your symptoms.
                  </p>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
