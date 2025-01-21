import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft, LifeBuoy } from "lucide-react"

export default function TicketsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto p-4 flex items-center justify-between">
          <Link href="/tickets">
            <Button variant="ghost">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Tickets
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Support Ticket</h1>
          <Button variant="outline">
            <LifeBuoy className="h-4 w-4 mr-2" />
            Help Center
          </Button>
        </div>
      </header>
      <main className="container mx-auto py-6">{children}</main>
    </div>
  )
}

