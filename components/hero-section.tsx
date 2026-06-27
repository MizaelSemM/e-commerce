"use client"

import { ArrowRight, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const WHATSAPP_NUMBER = "5511999999999"
const WHATSAPP_MESSAGE = "Olá! Gostaria de saber mais sobre os produtos da KICKS."

export function HeroSection() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1920&h=1080&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-background/85" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <span className="inline-block text-sm font-medium tracking-widest text-primary uppercase opacity-0-initial animate-fade-in-up">
            Nova Coleção 2026
          </span>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-balance opacity-0-initial animate-fade-in-up animate-delay-100">
            Eleve Seu
            <br />
            <span className="text-primary">Estilo</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty opacity-0-initial animate-fade-in-up animate-delay-200">
            Descubra nossa coleção exclusiva de tênis, camisetas e bonés premium.
            Qualidade e estilo para quem busca o extraordinário.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 opacity-0-initial animate-fade-in-up animate-delay-300">
            <Link href="/#sneakers">
              <Button size="lg" className="group min-w-[200px] bg-primary text-primary-foreground hover:bg-primary/90">
                Ver Coleção
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="min-w-[200px] border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <MessageCircle className="mr-2 h-4 w-4" />
                Fale Conosco
              </Button>
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-0-initial animate-fade-in-up animate-delay-500">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}
