import { type NextRequest, NextResponse } from "next/server"

// Mock database for links
let links = [
  {
    id: "1",
    userId: "user1",
    originalUrl: "https://example.com/very/long/url/that/needs/to/be/shortened",
    shortCode: "abc123",
    createdAt: "2023-04-15T10:30:00Z",
    clicks: 1245,
    lastClicked: "2023-04-20T14:22:00Z",
  },
  {
    id: "2",
    userId: "user1",
    originalUrl: "https://another-example.com/blog/how-to-use-url-shorteners",
    shortCode: "def456",
    createdAt: "2023-04-10T08:15:00Z",
    clicks: 873,
    lastClicked: "2023-04-20T09:45:00Z",
  },
]

// Mock database for analytics
let analytics = [
  {
    id: "1",
    linkId: "1",
    timestamp: "2023-04-20T14:22:00Z",
    ipAddress: "192.168.1.1",
    referrer: "twitter.com",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)",
  },
  {
    id: "2",
    linkId: "1",
    timestamp: "2023-04-20T10:15:00Z",
    ipAddress: "192.168.1.2",
    referrer: "facebook.com",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
  },
]

export async function GET(request: NextRequest, { params }: { params: { shortCode: string } }) {
  const shortCode = params.shortCode

  // Find the link by short code
  const link = links.find((link) => link.shortCode === shortCode)

  if (!link) {
    return NextResponse.json({ error: "Link not found" }, { status: 404 })
  }

  // Get analytics for the link
  const linkAnalytics = analytics.filter((item) => item.linkId === link.id)

  return NextResponse.json({
    link,
    analytics: linkAnalytics,
  })
}

export async function PUT(request: NextRequest, { params }: { params: { shortCode: string } }) {
  try {
    const shortCode = params.shortCode

    // Find the link by short code
    const linkIndex = links.findIndex((link) => link.shortCode === shortCode)

    if (linkIndex === -1) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 })
    }

    const { originalUrl } = await request.json()

    if (originalUrl) {
      links[linkIndex] = {
        ...links[linkIndex],
        originalUrl,
      }
    }

    return NextResponse.json(links[linkIndex])
  } catch (error) {
    return NextResponse.json({ error: "Failed to update link" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { shortCode: string } }) {
  const shortCode = params.shortCode

  // Find the link by short code
  const linkIndex = links.findIndex((link) => link.shortCode === shortCode)

  if (linkIndex === -1) {
    return NextResponse.json({ error: "Link not found" }, { status: 404 })
  }

  // Remove the link from our "database"
  const deletedLink = links[linkIndex]
  links = links.filter((_, index) => index !== linkIndex)

  // Remove associated analytics
  analytics = analytics.filter((item) => item.linkId !== deletedLink.id)

  return NextResponse.json({ success: true })
}
