'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

import { Logo } from '@/components/ui/logo'
import { Button } from '@/components/ui/button'
import { ScrollAppear } from '../utils/scroll-appear'

type HeaderProps = {
  animated?: boolean;
  navLinks?: {href:string, label:string}[];
}

export default function Header({ animated = false, navLinks }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const Wrapper = animated ? ScrollAppear : React.Fragment
  const wrapperProps = animated
    ? { yOffset: -40, delay: 0.2, className: 'w-full border-b bg-background sm:bg-background/75 backdrop-blur-2xl' }
    : {}

  return (
    <header className="sticky top-0 z-40 w-full">
      <Wrapper {...wrapperProps}>
        <div className="container flex h-16 items-center justify-between px-4 md:px-6 m-auto">
          <Link href="/" className="flex items-center gap-2">
            <Logo size={20} className="size-6" />
            <span className="text-xl font-bold">Notate</span>
          </Link>

          <nav className="hidden md:flex gap-6">
            {navLinks && navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex gap-4">
            <Link href="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign up</Button>
            </Link>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute w-full bg-background border-b py-4 z-30">
            <nav className="container flex flex-col gap-4 px-4">
              {navLinks&&navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
              <div className="flex gap-4 pt-2">
                <Link href="/login" className="w-full">
                  <Button variant="outline" className="w-full">
                    Log in
                  </Button>
                </Link>
                <Link href="/signup" className="w-full">
                  <Button className="w-full">Sign up</Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </Wrapper>
    </header>
  )
}
