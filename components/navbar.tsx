"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const productCategories = [
  { href: "/products?category=sneakers", label: "Tênis" },
  { href: "/products?category=tshirts", label: "Camisetas" },
  { href: "/products?category=caps", label: "Bonés" },
]

const WHATSAPP_NUMBER = "5511999999999"
const WHATSAPP_MESSAGE = "Olá! Gostaria de saber mais sobre os produtos."

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Orange top bar */}
      <div className="h-1 bg-primary" />
      <nav className="bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">SneakerVault</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Início
            </Link>
            
            {/* Produtos Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Produtos
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="bg-popover">
                <DropdownMenuItem asChild>
                  <Link href="/products" className="cursor-pointer">
                    Ver Todos
                  </Link>
                </DropdownMenuItem>
                {productCategories.map((cat) => (
                  <DropdownMenuItem key={cat.href} asChild>
                    <Link href={cat.href} className="cursor-pointer">
                      {cat.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Sobre
            </Link>
            
            <Link
              href="/contact"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Contato
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button className="bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all">
                Fale Conosco
              </Button>
            </a>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-background p-4">
              <div className="flex flex-col gap-6 mt-8">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                >
                  Início
                </Link>

                {/* Mobile Products Accordion */}
                <div className="space-y-2">
                  <button
                    onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                    className="flex items-center justify-between w-full text-lg font-medium text-foreground"
                  >
                    Produtos
                    <ChevronDown className={`h-5 w-5 transition-transform ${mobileProductsOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobileProductsOpen && (
                    <div className="pl-4 space-y-3 pt-2">
                      {productCategories.map((cat) => (
                        <Link
                          key={cat.href}
                          href={cat.href}
                          onClick={() => setIsOpen(false)}
                          className="block text-muted-foreground hover:text-primary transition-colors"
                        >
                          {cat.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  href="/about"
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                >
                  Sobre
                </Link>
                
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                >
                  Contato
                </Link>

                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    Fale Conosco
                  </Button>
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
