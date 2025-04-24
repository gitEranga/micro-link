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

export async function GET(request: NextRequest) {
  // In a real app, we would get the user ID from the session
  const userId = "user1"

  // Filter links by user ID
  const userLinks = links.filter((link) => link.userId === userId)

  return NextResponse.json(userLinks)
}

export async function POST(request: NextRequest) {
  try {
    const { originalUrl } = await request.json()

    if (!originalUrl) {
      return NextResponse.json({ error: "Original URL is required" }, { status: 400 })
    }

    // In a real app, we would get the user ID from the session
    const userId = "user1"

    // Generate a random short code
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let shortCode = ""
    for (let i = 0; i < 6; i++) {
      shortCode += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    const newLink = {
      id: Date.now().toString(),
      userId,
      originalUrl,
      shortCode,
      createdAt: new Date().toISOString(),
      clicks: 0,
      lastClicked: "",
    }

    // Add the new link to our "database"
    links.push(newLink)

    // Log the event for server-side analytics
    console.log(JSON.stringify({
      event: "link_created",
      originalUrl,
      shortCode,
      userId,
      timestamp: new Date().toISOString()
    }))

    return NextResponse.json(newLink, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create link" }, { status: 500 })
  }
}
