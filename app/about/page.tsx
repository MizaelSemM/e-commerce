"use client"

import { useEffect, useRef, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Users, Award, Heart, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const WHATSAPP_NUMBER = "5511999999999"
const WHATSAPP_MESSAGE = "Olá! Gostaria de conhecer mais sobre a KICKS."

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return { ref, isInView }
}

export default function AboutPage() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
  
  const storySection = useInView()
  const valuesSection = useInView()
  const statsSection = useInView()

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance opacity-0-initial animate-fade-in-up">
            Sobre a <span className="text-primary">KICKS</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty opacity-0-initial animate-fade-in-up animate-delay-100">
            Somos apaixonados por sneakers e streetwear. Nossa missão é trazer os melhores 
            produtos para quem vive e respira a cultura urbana.
          </p>
          <div className="mt-8 opacity-0-initial animate-fade-in-up animate-delay-200">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-green-600 text-white hover:bg-green-700">
                <MessageCircle className="mr-2 h-5 w-5" />
                Fale Conosco
              </Button>
            </a>
          </div>
        </section>

        {/* Story Section */}
        <section className="container mx-auto px-4 py-16" ref={storySection.ref}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div 
              className={cn(
                "aspect-square rounded-lg bg-cover bg-center bg-secondary transition-all duration-700",
                storySection.isInView ? "animate-fade-in-left" : "opacity-0"
              )}
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&h=800&fit=crop')"
              }}
            />
            <div className={cn(
              "space-y-6 transition-all duration-700",
              storySection.isInView ? "animate-fade-in-right" : "opacity-0"
            )}>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Nossa História</h2>
              <p className="text-muted-foreground leading-relaxed">
                A KICKS nasceu em 2020 da paixão de um grupo de amigos pelo universo dos sneakers. 
                O que começou como um hobby de colecionar tênis raros se transformou em uma missão: 
                democratizar o acesso a produtos premium de streetwear no Brasil.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Hoje, somos referência no mercado, oferecendo uma curadoria cuidadosa de tênis, 
                camisetas e bonés das melhores marcas mundiais. Cada produto que vendemos passa 
                por uma rigorosa verificação de autenticidade e qualidade.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-card/50 py-16" ref={valuesSection.ref}>
          <div className="container mx-auto px-4">
            <h2 className={cn(
              "text-3xl md:text-4xl font-bold tracking-tight text-center mb-12 transition-all duration-700",
              valuesSection.isInView ? "animate-fade-in-up" : "opacity-0"
            )}>
              Nossos Valores
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className={cn(
                "bg-card rounded-lg p-8 border border-border text-center space-y-4 transition-all duration-500",
                valuesSection.isInView ? "animate-fade-in-up" : "opacity-0"
              )} style={{ animationDelay: "0.1s" }}>
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Autenticidade</h3>
                <p className="text-muted-foreground">
                  100% dos nossos produtos são originais e verificados. Garantimos procedência 
                  e qualidade em cada item.
                </p>
              </div>
              <div className={cn(
                "bg-card rounded-lg p-8 border border-border text-center space-y-4 transition-all duration-500",
                valuesSection.isInView ? "animate-fade-in-up" : "opacity-0"
              )} style={{ animationDelay: "0.2s" }}>
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Comunidade</h3>
                <p className="text-muted-foreground">
                  Mais do que uma loja, somos uma comunidade de apaixonados por sneakers 
                  e cultura urbana.
                </p>
              </div>
              <div className={cn(
                "bg-card rounded-lg p-8 border border-border text-center space-y-4 transition-all duration-500",
                valuesSection.isInView ? "animate-fade-in-up" : "opacity-0"
              )} style={{ animationDelay: "0.3s" }}>
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Paixão</h3>
                <p className="text-muted-foreground">
                  Cada tênis conta uma história. Trabalhamos com amor pelo que fazemos 
                  e pelo que vendemos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 py-16" ref={statsSection.ref}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className={cn(
              "transition-all duration-500",
              statsSection.isInView ? "animate-fade-in-up" : "opacity-0"
            )} style={{ animationDelay: "0.1s" }}>
              <div className="text-4xl md:text-5xl font-bold text-primary">5K+</div>
              <p className="text-muted-foreground mt-2">Clientes Satisfeitos</p>
            </div>
            <div className={cn(
              "transition-all duration-500",
              statsSection.isInView ? "animate-fade-in-up" : "opacity-0"
            )} style={{ animationDelay: "0.2s" }}>
              <div className="text-4xl md:text-5xl font-bold text-primary">500+</div>
              <p className="text-muted-foreground mt-2">Produtos Vendidos</p>
            </div>
            <div className={cn(
              "transition-all duration-500",
              statsSection.isInView ? "animate-fade-in-up" : "opacity-0"
            )} style={{ animationDelay: "0.3s" }}>
              <div className="text-4xl md:text-5xl font-bold text-primary">50+</div>
              <p className="text-muted-foreground mt-2">Marcas Parceiras</p>
            </div>
            <div className={cn(
              "transition-all duration-500",
              statsSection.isInView ? "animate-fade-in-up" : "opacity-0"
            )} style={{ animationDelay: "0.4s" }}>
              <div className="text-4xl md:text-5xl font-bold text-primary">4.9</div>
              <p className="text-muted-foreground mt-2">Avaliação Média</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
