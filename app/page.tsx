import Link from "next/link"
import { ArrowRight, BarChart3, Link2, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link2 className="h-6 w-6" />
            <span className="text-xl font-bold">Micro Link</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:underline underline-offset-4">
              Pricing
            </Link>
            <Link href="#faq" className="text-sm font-medium hover:underline underline-offset-4">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-20 md:py-32">
          <div className="container flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter max-w-3xl">
              Shorten, share, and track your links in one place
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl">
              Micro Link helps you create shortened URLs that are easy to share and provides detailed analytics on every
              click.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button size="lg" className="gap-2">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-muted/50">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">Powerful Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm">
                <div className="p-3 rounded-full bg-primary/10 mb-4">
                  <Link2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">URL Shortening</h3>
                <p className="text-muted-foreground">
                  Create compact, memorable links that redirect to your original URLs. Perfect for social media, emails,
                  and more.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm">
                <div className="p-3 rounded-full bg-primary/10 mb-4">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Detailed Analytics</h3>
                <p className="text-muted-foreground">
                  Track clicks, referral sources, geographic locations, and more with our comprehensive analytics
                  dashboard.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm">
                <div className="p-3 rounded-full bg-primary/10 mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Secure & Reliable</h3>
                <p className="text-muted-foreground">
                  Your links are always available with 99.9% uptime and protected with enterprise-grade security.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">Simple, Transparent Pricing</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="flex flex-col p-6 bg-background rounded-lg border">
                <h3 className="text-xl font-bold mb-2">Free</h3>
                <p className="text-3xl font-bold mb-4">
                  $0<span className="text-muted-foreground text-sm font-normal">/month</span>
                </p>
                <p className="text-muted-foreground mb-6">Perfect for personal use and trying out the service.</p>
                <ul className="space-y-2 mb-6 flex-1">
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> 50 links per month
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> Basic analytics
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> 7-day history
                  </li>
                </ul>
                <Link href="/signup">
                  <Button className="w-full" variant="outline">
                    Get Started
                  </Button>
                </Link>
              </div>
              <div className="flex flex-col p-6 bg-primary text-primary-foreground rounded-lg border border-primary shadow-lg">
                <div className="py-1 px-3 text-xs bg-primary-foreground text-primary rounded-full w-fit mb-4">
                  Popular
                </div>
                <h3 className="text-xl font-bold mb-2">Pro</h3>
                <p className="text-3xl font-bold mb-4">
<<<<<<< HEAD
                  $12<span className="text-primary-foreground/70 text-sm font-normal">/month</span>
=======
                  Rs:1200<span className="text-primary-foreground/70 text-sm font-normal">/month</span>
>>>>>>> 99d80d84b58e08c277d7f748552d6607cb1de566
                </p>
                <p className="text-primary-foreground/70 mb-6">For professionals and small teams.</p>
                <ul className="space-y-2 mb-6 flex-1">
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> Unlimited links
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> Advanced analytics
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> 1-year history
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> Custom domains
                  </li>
                </ul>
                <Link href="/signup">
                  <Button className="w-full" variant="secondary">
                    Get Started
                  </Button>
                </Link>
              </div>
              <div className="flex flex-col p-6 bg-background rounded-lg border">
                <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                <p className="text-3xl font-bold mb-4">
                  $49<span className="text-muted-foreground text-sm font-normal">/month</span>
                </p>
                <p className="text-muted-foreground mb-6">For large teams and organizations.</p>
                <ul className="space-y-2 mb-6 flex-1">
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> Everything in Pro
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> Team management
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> API access
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> Priority support
                  </li>
                </ul>
                <Link href="/signup">
                  <Button className="w-full" variant="outline">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tighter mb-6">Ready to get started?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of marketers, content creators, and businesses who use Micro Link to optimize their
                online presence.
              </p>
              <Link href="/signup">
                <Button size="lg" className="gap-2">
                  Sign Up Now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-8">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Link2 className="h-5 w-5" />
            <span className="font-semibold">Micro Link</span>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:underline underline-offset-4">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline underline-offset-4">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline underline-offset-4">
              Contact
            </Link>
          </div>
          <div className="text-sm text-muted-foreground mt-4 md:mt-0">
            © {new Date().getFullYear()} Micro Link. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
