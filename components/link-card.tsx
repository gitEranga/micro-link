"use client"

import { useState } from "react"
import { BarChart3, Copy, ExternalLink, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"

interface LinkCardProps {
  link: {
    id: string
    originalUrl: string
    shortUrl: string
    createdAt: string
    clicks: number
    lastClicked: string
  }
  onViewAnalytics: () => void
}

export function LinkCard({ link, onViewAnalytics }: LinkCardProps) {
  const [isCopied, setIsCopied] = useState(false)

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

  const truncateUrl = (url: string, maxLength = 50) => {
    return url.length > maxLength ? `${url.substring(0, maxLength)}...` : url
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link.shortUrl)
    setIsCopied(true)
    toast({
      title: "Link copied",
      description: "The shortened URL has been copied to your clipboard.",
    })
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid gap-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="font-medium">{link.shortUrl}</div>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={copyToClipboard}>
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy link</span>
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm text-muted-foreground">Created: {formatDate(link.createdAt)}</div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={onViewAnalytics}>
                    <BarChart3 className="mr-2 h-4 w-4" />
                    <span>View Analytics</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={copyToClipboard}>
                    <Copy className="mr-2 h-4 w-4" />
                    <span>Copy Link</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    <span>Open Original</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Original URL:</div>
            <div className="text-sm break-all">{truncateUrl(link.originalUrl)}</div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">{link.clicks}</div>
              <div className="text-sm text-muted-foreground">Total Clicks</div>
            </div>
            <div className="text-sm text-muted-foreground sm:ml-auto">Last clicked: {formatDate(link.lastClicked)}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button variant="outline" className="w-full" onClick={onViewAnalytics}>
          <BarChart3 className="mr-2 h-4 w-4" />
          View Detailed Analytics
        </Button>
      </CardFooter>
    </Card>
  )
}
