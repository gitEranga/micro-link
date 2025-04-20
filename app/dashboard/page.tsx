"use client"

import { useState } from "react"
import { BarChart3, ExternalLink, Link2, LogOut, Settings, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LinkCard } from "@/components/link-card"
import { LinkAnalyticsModal } from "@/components/link-analytics-modal"
import { CreateLinkForm } from "@/components/create-link-form"

// Mock data for links
const mockLinks = [
  {
    id: "1",
    originalUrl: "https://example.com/very/long/url/that/needs/to/be/shortened/for/better/sharing/on/social/media",
    shortUrl: "micro.link/abc123",
    createdAt: "2023-04-15T10:30:00Z",
    clicks: 1245,
    lastClicked: "2023-04-20T14:22:00Z",
  },
  {
    id: "2",
    originalUrl: "https://another-example.com/blog/how-to-use-url-shorteners-effectively",
    shortUrl: "micro.link/def456",
    createdAt: "2023-04-10T08:15:00Z",
    clicks: 873,
    lastClicked: "2023-04-20T09:45:00Z",
  },
  {
    id: "3",
    originalUrl: "https://docs.example.com/getting-started-with-our-api",
    shortUrl: "micro.link/ghi789",
    createdAt: "2023-04-05T16:45:00Z",
    clicks: 421,
    lastClicked: "2023-04-19T22:10:00Z",
  },
]

export default function DashboardPage() {
  const [links, setLinks] = useState(mockLinks)
  const [selectedLink, setSelectedLink] = useState<(typeof mockLinks)[0] | null>(null)
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false)

  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0)

  const handleViewAnalytics = (link: (typeof mockLinks)[0]) => {
    setSelectedLink(link)
    setIsAnalyticsOpen(true)
  }

  const handleCreateLink = (originalUrl: string) => {
    // Generate a random short code
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let shortCode = ""
    for (let i = 0; i < 6; i++) {
      shortCode += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    const newLink = {
      id: Date.now().toString(),
      originalUrl,
      shortUrl: `micro.link/${shortCode}`,
      createdAt: new Date().toISOString(),
      clicks: 0,
      lastClicked: "",
    }

    setLinks([newLink, ...links])
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link2 className="h-6 w-6" />
            <span className="text-xl font-bold">Micro Link</span>
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <div className="grid gap-6">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">Manage and track your shortened links</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Links</CardTitle>
                <Link2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{links.length}</div>
                <p className="text-xs text-muted-foreground">Active shortened URLs</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalClicks}</div>
                <p className="text-xs text-muted-foreground">Across all your links</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average CTR</CardTitle>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{links.length ? Math.round(totalClicks / links.length) : 0}</div>
                <p className="text-xs text-muted-foreground">Clicks per link</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="links">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="links">My Links</TabsTrigger>
                <TabsTrigger value="create">Create New Link</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="links" className="space-y-4">
              <div className="grid gap-4">
                {links.map((link) => (
                  <LinkCard key={link.id} link={link} onViewAnalytics={() => handleViewAnalytics(link)} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="create">
              <Card>
                <CardHeader>
                  <CardTitle>Create a new shortened link</CardTitle>
                  <CardDescription>Enter a long URL to generate a shortened link that's easy to share</CardDescription>
                </CardHeader>
                <CardContent>
                  <CreateLinkForm onSubmit={handleCreateLink} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {selectedLink && (
        <LinkAnalyticsModal link={selectedLink} isOpen={isAnalyticsOpen} onClose={() => setIsAnalyticsOpen(false)} />
      )}
    </div>
  )
}
