"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Plus, MessageCircle, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/hooks/useSupabase"

type Ticket = {
  id: number
  title: string
  status: "open" | "closed"
}

type Message = {
  id: number
  sender: "user" | "agent"
  content: string
}

export default function TicketCreationScreen() {
  const router = useRouter()
  const { supabase } = useSupabase()
  const [tickets, setTickets] = useState<Ticket[]>([
    { id: 1, title: "Issue with login", status: "open" },
    { id: 2, title: "Can't upload files", status: "closed" },
  ])
  const [newTicketTitle, setNewTicketTitle] = useState("")
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")

  const createTicket = () => {
    if (newTicketTitle.trim()) {
      const newTicket: Ticket = {
        id: tickets.length + 1,
        title: newTicketTitle,
        status: "open",
      }
      setTickets([...tickets, newTicket])
      setNewTicketTitle("")
    }
  }

  const selectTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket)
    setMessages([{ id: 1, sender: "agent", content: `Hello! How can I help you with "${ticket.title}"?` }])
  }

  const sendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: Message = {
        id: messages.length + 1,
        sender: "user",
        content: newMessage,
      }
      setMessages([...messages, userMessage])
      setNewMessage("")

      // Simulate agent response
      setTimeout(() => {
        const agentMessage: Message = {
          id: messages.length + 2,
          sender: "agent",
          content: "Thank you for your message. An agent will respond shortly.",
        }
        setMessages((prevMessages) => [...prevMessages, agentMessage])
      }, 1000)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/auth')
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Super Duper Ticket System</h1>
        <Button variant="ghost" onClick={handleSignOut}>
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Create New Ticket</CardTitle>
            <CardDescription>Describe your issue and we'll help you out!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input
                placeholder="Enter ticket title"
                value={newTicketTitle}
                onChange={(e) => setNewTicketTitle(e.target.value)}
              />
              <Button onClick={createTicket}>
                <Plus className="mr-2 h-4 w-4" /> Create
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Tickets</CardTitle>
            <CardDescription>Click on a ticket to start chatting</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <AnimatePresence>
                {tickets.map((ticket) => (
                  <motion.li
                    key={ticket.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button variant="outline" className="w-full justify-start" onClick={() => selectTicket(ticket)}>
                      <MessageCircle className="mr-2 h-4 w-4" />
                      {ticket.title}
                      <span
                        className={`ml-auto px-2 py-1 text-xs rounded-full ${
                          ticket.status === "open" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </Button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </CardContent>
        </Card>
      </div>

      {selectedTicket && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Chat with Agent</CardTitle>
            <CardDescription>Ticket: {selectedTicket.title}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 h-64 overflow-y-auto mb-4">
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
                      className={`flex items-start space-x-2 ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : "flex-row"}`}
                    >
                      <Avatar>
                        <AvatarFallback>{message.sender === "user" ? "U" : "A"}</AvatarFallback>
                      </Avatar>
                      <div className={`p-3 rounded-lg ${message.sender === "user" ? "bg-blue-100" : "bg-gray-100"}`}>
                        {message.content}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex w-full space-x-2">
              <Textarea
                placeholder="Type your message here"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-grow"
              />
              <Button onClick={sendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

