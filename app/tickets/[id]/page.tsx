"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Paperclip, ThumbsUp, Smile } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type Message = {
  id: number
  content: string
  sender: "user" | "agent"
  timestamp: Date
  reactions: string[]
}

export default function TicketPage({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulating fetching initial messages
    setMessages([
      { id: 1, content: "Hello! How can I assist you today?", sender: "agent", timestamp: new Date(), reactions: [] },
    ])
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: Message = {
        id: messages.length + 1,
        content: newMessage,
        sender: "user",
        timestamp: new Date(),
        reactions: [],
      }
      setMessages((prev) => [...prev, userMessage])
      setNewMessage("")
      simulateAgentResponse()
    }
  }

  const simulateAgentResponse = () => {
    setIsTyping(true)
    setTimeout(() => {
      const agentMessage: Message = {
        id: messages.length + 2,
        content: "Thank you for your message. I'm looking into your issue and will get back to you shortly.",
        sender: "agent",
        timestamp: new Date(),
        reactions: [],
      }
      setMessages((prev) => [...prev, agentMessage])
      setIsTyping(false)
    }, 3000)
  }

  const addReaction = (messageId: number, reaction: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, reactions: Array.from(new Set([...msg.reactions, reaction])) } : msg,
      ),
    )
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl h-screen flex flex-col">
      <header className="mb-4">
        <h1 className="text-2xl font-bold">Ticket #{params.id}</h1>
        <Badge variant="outline">Open</Badge>
      </header>

      <div className="flex-grow overflow-y-auto mb-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex items-start space-x-2 max-w-[70%] ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : "flex-row"}`}
              >
                <Avatar>
                  <AvatarImage src={message.sender === "user" ? "/user-avatar.png" : "/agent-avatar.png"} />
                  <AvatarFallback>{message.sender === "user" ? "U" : "A"}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div
                    className={`p-3 rounded-lg ${message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-100"}`}
                  >
                    {message.content}
                  </div>
                  <div className={`text-xs text-gray-500 ${message.sender === "user" ? "text-right" : "text-left"}`}>
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                  <div className="flex space-x-1">
                    {message.reactions.map((reaction, index) => (
                      <Badge key={index} variant="secondary">
                        {reaction}
                      </Badge>
                    ))}
                  </div>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => addReaction(message.id, "👍")}
                      >
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>React to message</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isTyping && (
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon">
          <Paperclip className="h-4 w-4" />
        </Button>
        <Input
          placeholder="Type your message here..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          className="flex-grow"
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <Smile className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add emoji</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Button onClick={sendMessage}>
          <Send className="h-4 w-4 mr-2" />
          Send
        </Button>
      </div>
    </div>
  )
}

