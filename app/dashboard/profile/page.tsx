"use client"

import type React from "react"

import { useState } from "react"
import { BarChart3 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { LinkCard } from "@/components/link-card"
import { LinkAnalyticsModal } from "@/components/link-analytics-modal"

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
]

export default function ProfilePage() {
  const [links, setLinks] = useState(mockLinks)
  const [selectedLink, setSelectedLink] = useState<(typeof mockLinks)[0] | null>(null)
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleViewAnalytics = (link: (typeof mockLinks)[0]) => {
    setSelectedLink(link)
    setIsAnalyticsOpen(true)
  }

  const handleSaveProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Manage your profile and view your link statistics.</p>
      </div>
      <Separator />
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your profile information and preferences.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSaveProfile}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" defaultValue="Digital marketer and content creator" />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save changes"}
              </Button>
            </CardContent>
          </form>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Account Statistics</CardTitle>
            <CardDescription>Overview of your account activity.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Links</p>
                <p className="text-2xl font-bold">{links.length}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Clicks</p>
                <p className="text-2xl font-bold">{links.reduce((sum, link) => sum + link.clicks, 0)}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Account Created</p>
                <p className="text-lg font-medium">Apr 1, 2023</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Current Plan</p>
                <p className="text-lg font-medium">Free</p>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <h3 className="font-medium">Recent Activity</h3>
              <div className="space-y-2">
                {links.slice(0, 2).map((link) => (
                  <div key={link.id} className="flex items-center justify-between p-2 text-sm border rounded-md">
                    <div className="truncate">{link.shortUrl}</div>
                    <div className="flex items-center gap-2">
                      <span>{link.clicks} clicks</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleViewAnalytics(link)}
                      >
                        <BarChart3 className="h-4 w-4" />
                        <span className="sr-only">View analytics</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Your Links</h2>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Links</TabsTrigger>
            <TabsTrigger value="popular">Most Popular</TabsTrigger>
            <TabsTrigger value="recent">Recently Created</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            {links.map((link) => (
              <LinkCard key={link.id} link={link} onViewAnalytics={() => handleViewAnalytics(link)} />
            ))}
          </TabsContent>
          <TabsContent value="popular" className="space-y-4">
            {[...links]
              .sort((a, b) => b.clicks - a.clicks)
              .map((link) => (
                <LinkCard key={link.id} link={link} onViewAnalytics={() => handleViewAnalytics(link)} />
              ))}
          </TabsContent>
          <TabsContent value="recent" className="space-y-4">
            {[...links]
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .map((link) => (
                <LinkCard key={link.id} link={link} onViewAnalytics={() => handleViewAnalytics(link)} />
              ))}
          </TabsContent>
        </Tabs>
      </div>

      {selectedLink && (
        <LinkAnalyticsModal link={selectedLink} isOpen={isAnalyticsOpen} onClose={() => setIsAnalyticsOpen(false)} />
      )}
    </div>
  )
}
