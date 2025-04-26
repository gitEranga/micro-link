"use client"

import type React from "react"
import { useState } from "react"
import { Link2 } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

interface CreateLinkFormProps {
  onSubmit: (url: string) => void
}

export function CreateLinkForm({ onSubmit }: CreateLinkFormProps) {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a URL to shorten",
        variant: "destructive",
      })
      return
    }

    // Basic URL validation
    try {
      // Add protocol if missing
      const urlToValidate = url.startsWith("http") ? url : `https://${url}`
      new URL(urlToValidate)

      setIsLoading(true)

      // Simulate API call
      setTimeout(() => {
        onSubmit(urlToValidate)
        
        // Add Datadog RUM custom event tracking here
        if (typeof window !== 'undefined' && window.DD_RUM) {
          window.DD_RUM.addAction('link_created', {
            originalUrl: urlToValidate,
            timestamp: new Date().toISOString(),
            source: 'create_form'
          })
        }
        
        setUrl("")
        setIsLoading(false)
        toast({
          title: "Link created",
          description: "Your shortened link has been created successfully.",
        })
      }, 1000)
    } catch (error) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col space-y-2">
        <div className="relative">
          <Input
            placeholder="Enter your long URL here (e.g., https://example.com/very/long/url)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="pr-10"
          />
          <Link2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
        <p className="text-xs text-muted-foreground">
          The URL will be shortened to a micro.link format for easy sharing
        </p>
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating..." : "Create Shortened Link"}
      </Button>
    </form>
  )
}
