"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Plus, MessageCircle, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/hooks/useSupabase"
import { useAuth } from "@/components/AuthContext"

type Request = {
  id: string
  title: string
  description: string
  status: string
  priority: string
  category?: string
  created_at: string
}

type Message = {
  id: string
  content: string
  sender_type: string
  created_at: string
}

export default function TicketCreationScreen() {
  const router = useRouter()
  const supabase = useSupabase()
  const { user, loading: authLoading } = useAuth()
  const [requests, setRequests] = useState<Request[]>([])
  const [newTicketTitle, setNewTicketTitle] = useState("")
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)

  // Fetch tickets
  useEffect(() => {
    if (!authLoading && user) {
      fetchRequests()
    }
  }, [user, authLoading])

  // Fetch messages when a ticket is selected
  useEffect(() => {
    if (selectedRequest) {
      fetchMessages(selectedRequest.id)
    }
  }, [selectedRequest])

  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('requests')
        .select('*')
        .eq('customer_id', user?.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setRequests(data || [])
    } catch (error) {
      console.error('Error fetching requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMessages = async (requestId: string) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('request_id', requestId)
        .order('created_at', { ascending: true })

      if (error) throw error
      setMessages(data || [])
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  const createTicket = async () => {
    if (!newTicketTitle.trim() || !user) return

    try {
      const { data, error } = await supabase
        .from('requests')
        .insert([
          {
            title: newTicketTitle,
            description: '',
            customer_id: user.id,
            status: 'new',
            priority: 'medium'
          }
        ])
        .select()
        .single()

      if (error) throw error
      
      setRequests([data, ...requests])
      setNewTicketTitle("")
    } catch (error) {
      console.error('Error creating ticket:', error)
    }
  }

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedRequest || !user) return

    try {
      const { data, error } = await supabase
        .from('messages')
        .insert([
          {
            content: newMessage,
            request_id: selectedRequest.id,
            sender_id: user.id,
            sender_type: 'customer'
          }
        ])
        .select()
        .single()

      if (error) throw error

      setMessages([...messages, data])
      setNewMessage("")
    } catch (error) {
      console.error('Error sending message:', error)
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
                {requests.map((request) => (
                  <motion.li
                    key={request.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button variant="outline" className="w-full justify-start" onClick={() => setSelectedRequest(request)}>
                      <MessageCircle className="mr-2 h-4 w-4" />
                      {request.title}
                      <span
                        className={`ml-auto px-2 py-1 text-xs rounded-full ${
                          request.status === "new" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {request.status}
                      </span>
                    </Button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </CardContent>
        </Card>
      </div>

      {selectedRequest && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Chat with Agent</CardTitle>
            <CardDescription>Ticket: {selectedRequest.title}</CardDescription>
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
                    className={`flex ${message.sender_type === "customer" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex items-start space-x-2 ${message.sender_type === "customer" ? "flex-row-reverse space-x-reverse" : "flex-row"}`}
                    >
                      <Avatar>
                        <AvatarFallback>{message.sender_type === "customer" ? "U" : "A"}</AvatarFallback>
                      </Avatar>
                      <div className={`p-3 rounded-lg ${message.sender_type === "customer" ? "bg-blue-100" : "bg-gray-100"}`}>
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

