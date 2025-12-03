"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, User } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/hooks/use-auth"
import { Logo } from "@/components/logo"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, isLoading: loading } = useAuth()
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + "/")

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Logo />

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/researchers"
              className={`text-sm transition-colors ${isActive("/researchers") ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                }`}
            >
              Researchers
            </Link>
            <Link
              href="/papers"
              className={`text-sm transition-colors ${isActive("/papers") ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                }`}
            >
              Papers
            </Link>
            <Link
              href="/projects"
              className={`text-sm transition-colors ${isActive("/projects") ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                }`}
            >
              Projects
            </Link>
            <Link
              href="/about"
              className={`text-sm transition-colors ${isActive("/about") ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                }`}
            >
              About
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            {loading ? (
              <div className="h-9 w-20 bg-muted animate-pulse rounded-md" />
            ) : user ? (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/dashboard" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground" asChild>
                  <Link href="/auth/login">Sign In</Link>
                </Button>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                  <Link href="/auth/sign-up">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button className="text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link
                href="/researchers"
                className={`text-sm ${isActive("/researchers") ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Researchers
              </Link>
              <Link
                href="/papers"
                className={`text-sm ${isActive("/papers") ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Papers
              </Link>
              <Link
                href="/projects"
                className={`text-sm ${isActive("/projects") ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                href="/about"
                className={`text-sm ${isActive("/about") ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                {loading ? (
                  <div className="h-9 w-full bg-muted animate-pulse rounded-md" />
                ) : user ? (
                  <Button asChild onClick={() => setMobileMenuOpen(false)}>
                    <Link href="/dashboard" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Dashboard
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button variant="ghost" className="justify-start text-muted-foreground" asChild>
                      <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                        Sign In
                      </Link>
                    </Button>
                    <Button className="bg-primary text-primary-foreground" asChild>
                      <Link href="/auth/sign-up" onClick={() => setMobileMenuOpen(false)}>
                        Get Started
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
