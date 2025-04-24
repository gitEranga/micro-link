import { type NextRequest, NextResponse } from "next/server"

// Mock database for links
const links = [
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

export async function GET(request: NextRequest, { params }: { params: { shortCode: string } }) {
  const shortCode = params.shortCode

  // Find the link by short code
  const link = links.find((link) => link.shortCode === shortCode)

  if (!link) {
    // Redirect to home page if link not found
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Update click count and last clicked timestamp
  link.clicks += 1
  link.lastClicked = new Date().toISOString()

  // Log the event for server-side analytics
  console.log(JSON.stringify({
    event: "link_clicked",
    shortCode,
    originalUrl: link.originalUrl,
    timestamp: new Date().toISOString(),
    referrer: request.headers.get('referer') || 'direct',
    userAgent: request.headers.get('user-agent') || 'unknown'
  }))

  // Redirect to the original URL
  return NextResponse.redirect(link.originalUrl)
}
