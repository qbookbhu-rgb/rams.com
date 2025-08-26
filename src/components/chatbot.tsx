
"use client"

import { useState } from "react"
import { Mic, Send, Bot, User, Loader2, Stethoscope, MessageCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { BotIcon } from "./icons"
import { aiSearchForSpecialists } from "@/ai/ai-assisted-search"
import { ScrollArea } from "./ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

interface Message {
  role: "user" | "assistant"
  content: string
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm Anand, your AI Health Assistant. How can I help you today? Feel free to describe your symptoms.",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const { specialists } = await aiSearchForSpecialists({ query: input })
      let assistantMessageContent = ""
      if (specialists && specialists.length > 0) {
        assistantMessageContent = `Based on your symptoms, I suggest consulting one of the following specialists: ${specialists.join(", ")}. Would you like to see a list of available doctors?`
      } else {
        assistantMessageContent = "I couldn't determine a specialty based on your symptoms. Could you please provide more details?"
      }
      const assistantMessage: Message = { role: "assistant", content: assistantMessageContent }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("AI search failed:", error)
      const errorMessage: Message = { role: "assistant", content: "I'm sorry, but I encountered an error. Please try again." }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg"
        size="icon"
      >
        <MessageCircle className="h-8 w-8" />
        <span className="sr-only">Open AI Chat</span>
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
                <AvatarFallback><Stethoscope className="h-5 w-5" /></AvatarFallback>
              </Avatar>
              Anand - Your AI Health Assistant
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-80 w-full pr-4">
             <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex items-start gap-3 ${message.role === "user" ? "justify-end" : ""}`}>
                  {message.role === "assistant" && (
                     <Avatar className="h-8 w-8 border">
                        <AvatarFallback><Stethoscope className="h-5 w-5" /></AvatarFallback>
                    </Avatar>
                  )}
                  <div className={`rounded-lg p-3 text-sm ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                    <p>{message.content}</p>
                  </div>
                   {message.role === "user" && (
                    <Avatar className="h-8 w-8">
                        <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
               {loading && (
                <div className="flex items-start gap-3">
                   <Avatar className="h-8 w-8 border">
                        <AvatarFallback><Stethoscope className="h-5 w-5" /></AvatarFallback>
                    </Avatar>
                  <div className="rounded-lg bg-muted p-3">
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <DialogFooter>
            <form onSubmit={handleSendMessage} className="flex w-full items-center gap-2">
              <Input
                id="chat-message"
                placeholder="Type your message or symptoms..."
                className="flex-1"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
              />
               <Button type="button" size="icon" variant="outline" disabled={loading}>
                <Mic className="h-4 w-4" />
                <span className="sr-only">Use Microphone</span>
              </Button>
              <Button type="submit" size="icon" disabled={loading}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
