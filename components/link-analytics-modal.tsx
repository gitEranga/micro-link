"use client"

import { BarChart3, Globe, Link2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClicksOverTimeChart } from "@/components/charts/clicks-over-time-chart"
import { ReferrerSourcesChart } from "@/components/charts/referrer-sources-chart"
import { LocationsChart } from "@/components/charts/locations-chart"

interface LinkAnalyticsModalProps {
  link: {
    id: string
    originalUrl: string
    shortUrl: string
    createdAt: string
    clicks: number
    lastClicked: string
  }
  isOpen: boolean
  onClose: () => void
}

export function LinkAnalyticsModal({ link, isOpen, onClose }: LinkAnalyticsModalProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "Never"
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Analytics for {link.shortUrl}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{link.clicks}</div>
                <p className="text-xs text-muted-foreground">Last clicked: {formatDate(link.lastClicked)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Created</CardTitle>
                <Link2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatDate(link.createdAt).split(",")[0]}</div>
                <p className="text-xs text-muted-foreground">{formatDate(link.createdAt).split(",")[1]}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Top Location</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">United States</div>
                <p className="text-xs text-muted-foreground">42% of total clicks</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="referrers">Referrers</TabsTrigger>
              <TabsTrigger value="locations">Locations</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Clicks Over Time</CardTitle>
                  <CardDescription>View how your link has performed over the past 30 days</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ClicksOverTimeChart />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="referrers" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Top Referrers</CardTitle>
                  <CardDescription>See where your traffic is coming from</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ReferrerSourcesChart />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="locations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Geographic Distribution</CardTitle>
                  <CardDescription>View clicks by country</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <LocationsChart />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Recent Clicks</h3>
            <div className="rounded-md border">
              <div className="grid grid-cols-4 gap-4 p-4 text-sm font-medium">
                <div>Timestamp</div>
                <div>IP Address</div>
                <div>Referrer</div>
                <div>Device</div>
              </div>
              <div className="divide-y">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="grid grid-cols-4 gap-4 p-4 text-sm">
                    <div>{formatDate(new Date(Date.now() - i * 3600000).toISOString())}</div>
                    <div>
                      192.168.{Math.floor(Math.random() * 255)}.{Math.floor(Math.random() * 255)}
                    </div>
                    <div>{["Google", "Twitter", "Facebook", "Direct", "LinkedIn"][i]}</div>
                    <div>{["iPhone", "Chrome / Windows", "Safari / Mac", "Firefox / Linux", "Edge / Windows"][i]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
