
"use client"

import { useState } from "react"
import { Mic, Send, Bot } from "lucide-react"

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


export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg"
        size="icon"
      >
        <BotIcon className="h-8 w-8" />
        <span className="sr-only">Open AI Chat</span>
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BotIcon className="h-6 w-6" />
              Anand - Your AI Health Assistant
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="h-64 overflow-y-auto rounded-md border p-4 space-y-4">
              {/* Chat messages will appear here */}
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <BotIcon className="h-5 w-5" />
                </div>
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-sm">
                    Hello! How can I help you today? Feel free to describe your symptoms.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <div className="flex w-full items-center gap-2">
              <Input
                id="chat-message"
                placeholder="Type your message or symptoms..."
                className="flex-1"
              />
               <Button type="button" size="icon" variant="outline">
                <Mic className="h-4 w-4" />
                <span className="sr-only">Use Microphone</span>
              </Button>
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
