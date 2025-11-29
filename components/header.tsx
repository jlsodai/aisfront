"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
              <svg
                className="h-5 w-5 text-background"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-xl font-semibold text-foreground">AI Safety Connect</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/researchers"
              className={`text-sm transition-colors ${isActive("/researchers") ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                }`}
            >
              Researchers
            </Link>
            <Link href="/#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="/#sources" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Data Sources
            </Link>
            <Link
              href="/#how-it-works"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/about"
              className={`text-sm transition-colors ${isActive("/about") ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                }`}
            >
              About
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              Sign In
            </Button>
            <Button className="bg-foreground text-background hover:bg-foreground/90">Get Early Access</Button>
          </div>

          <button className="md:hidden text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link
                href="/researchers"
                className={`text-sm ${isActive("/researchers") ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
              >
                Researchers
              </Link>
              <Link href="/#features" className="text-sm text-muted-foreground hover:text-foreground">
                Features
              </Link>
              <Link href="/#sources" className="text-sm text-muted-foreground hover:text-foreground">
                Data Sources
              </Link>
              <Link href="/#how-it-works" className="text-sm text-muted-foreground hover:text-foreground">
                How It Works
              </Link>
              <Link
                href="/about"
                className={`text-sm ${isActive("/about") ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
              >
                About
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Button variant="ghost" className="justify-start text-muted-foreground">
                  Sign In
                </Button>
                <Button className="bg-foreground text-background">Get Early Access</Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
