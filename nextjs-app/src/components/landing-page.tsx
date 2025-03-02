"use client"

import { ModeToggle } from "./ui/mode-toggle"
import { Badge } from "./ui/badge"
import { Logo } from "./ui/logo"

import { toast } from "sonner" 
import { ScrollAppear } from "./utils/scroll-appear"

import motion from "framer-motion"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Package,
  FileText,
  Sparkles,
  Zap,
  Layers,
  RefreshCw,
  CheckCircle,
  ChevronRight,
  Menu,
  X,
  Minus,
  Minimize2,
  SparklesIcon,
  CpuIcon,
  SquarePenIcon,
  ArrowUp,
  LoaderCircle,
  ArrowRight,
  SquareArrowOutUpRight
} from "lucide-react"
import { useRef, useState } from "react"
import Image from "next/image"

interface MacOsWindowProps {
  children?: React.ReactNode
  windowTitle?: string
  inputPlaceholders?: [string, string]
  onGenerated?: VoidFunction
}

const MacOsWindow = (
  {
    children,
    windowTitle,
    inputPlaceholders,
    onGenerated
  }:MacOsWindowProps) => {
    
    const input_ref = useRef<HTMLFormElement>(null)
    const [isGenerating, setIsGenerating] = useState<boolean>(false)

    return ( 
      <div className="relative flex items-center justify-center">
        <div className="w-full h-[400px] sm:h-[500px] overflow-hidden rounded-xl border bg-card p-4 shadow-lg">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 pb-4 border-b">
              <div className="flex gap-1 group">
                <div className="h-3 w-3 rounded-full bg-red-500 items-center justify-center flex">
                  <X size={7.5} strokeWidth={4} className="text-black opacity-0 group-hover:opacity-40 transition-opacity"/>
                </div>
                <div className="h-3 w-3 rounded-full bg-yellow-500 items-center justify-center flex">
                  <Minus size={7.5} strokeWidth={4} className="text-black opacity-0 group-hover:opacity-40 transition-opacity"/>
                </div>
                <div className="h-3 w-3 rounded-full bg-green-500 items-center justify-center flex">
                  <Minimize2 size={7.5} strokeWidth={4} className="text-black opacity-0 group-hover:opacity-40 transition-opacity"/>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">{windowTitle}</div>
            </div>

            <div className="flex-1 overflow-auto py-4 space-y-4">
              {children}
            </div>

            <div className="pt-4 border-t flex items-center gap-2">
              <div className="flex w-full items-center space-x-2">
                <form 
                    className="relative w-full" 
                    ref={input_ref}
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.currentTarget.reset()
                        setIsGenerating(true)

                        window.setTimeout(() => {
                          setIsGenerating(false)
                          
                          onGenerated?.()
                        }, 2000)

                        }
                      }
                >
                    <Input 
                        disabled={isGenerating}
                        type="text"
                        placeholder={!isGenerating ? inputPlaceholders?.[0] : inputPlaceholders?.[1]}
                        className="rounded-full p-6 dark:bg-neutral-900 focus-visible:ring-neutral-500/50"
                    />

                    <Button 
                        disabled={isGenerating}
                        type="submit"
                        className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-full p-4 size-10"
                    >
                        {isGenerating?<LoaderCircle className="animate-spin" strokeWidth={2.5} size={10}/>:<ArrowUp strokeWidth={2.5} size={10}/>}
                    </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 w-full">
        <ScrollAppear yOffset={-40} delay={0.2} className="w-full border-b bg-background/75 backdrop-blur-2xl">
          <div className="container flex h-16 items-center justify-between px-4 md:px-6 m-auto">
            <Link href="/" className="flex items-center gap-2">
              <Logo size={20}className="size-6"/>
              <span className="text-xl font-bold">Notate</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
                How It Works
              </Link>
              <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
                Pricing
              </Link>
              <Link href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">
                Testimonials
              </Link>
            </nav>
            <div className="hidden md:flex gap-4">
              <Link href="/login">
                <Button variant="ghost">Log in</Button>
              </Link>
              <Link href="/signup">
                <Button>Sign up</Button>
              </Link>
            </div>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
          {isMenuOpen && (
            <div className="md:hidden absolute w-full bg-background border-b py-4">
              <nav className="container flex flex-col gap-4 px-4">
                <Link
                  href="#features"
                  className="text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  href="#how-it-works"
                  className="text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  How It Works
                </Link>
                <Link
                  href="#pricing"
                  className="text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  href="#testimonials"
                  className="text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Testimonials
                </Link>
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
        </ScrollAppear>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 m-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_800px] ">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <ScrollAppear delay={0.2} duration={0.5}>
                    <Badge icon={Sparkles} text="AI-Powered Note Taking" />
                  </ScrollAppear>
                  <ScrollAppear>
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                      Notes that organize themselves
                    </h1>
                  </ScrollAppear>
                  <ScrollAppear delay={0.4} duration={0.8}>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                      Notate uses artificial intelligens to automatically organize your notes, generate fitting content, and make
                      information easy to read and understand.
                    </p>
                  </ScrollAppear>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <ScrollAppear delay={0.5} duration={0.8}>
                    <Link href="/signup">
                      <Button>
                        Get Started Free
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </ScrollAppear>
                  <ScrollAppear delay={0.6}>
                    <Link href="#how-it-works">
                      <Button variant="outline">See How It Works</Button>
                    </Link>
                  </ScrollAppear>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <ScrollAppear delay={0.8+i*0.05} key={i}>
                        <div
                          className="inline-block h-8 w-8 rounded-full border-2 border-background bg-neutral-200 dark:bg-muted overflow-hidden"
                        >
                          <span className="sr-only">User {i}</span>
                        </div>
                      </ScrollAppear>
                    ))}
                  </div>
                  <ScrollAppear delay={0.9}>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">5,000+</span> users already taking smarter notes
                  </div>
                  </ScrollAppear>
                </div>
              </div>
              <ScrollAppear duration={1.5} yOffset={40} delay={1}>
                <MacOsWindow 
                  windowTitle="Meeting Notes - Project Apollo" 
                  inputPlaceholders={["What's something on your mind?","Generating your notes..."]}
                  onGenerated={()=>
                    toast("Generated notes.",
                    {
                      description:"Notate AI has generated your notes.",
                      action: {
                        label: "Revert",
                        onClick: () => 
                          {
                            toast("Reverted changes.",{
                              duration:1250
                            })
                          },
                      },
                    })}
                >
                  <>
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-primary">AI-Organized Summary</div>
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground">• Project timeline extended by 2 weeks</div>
                        <div className="text-xs text-muted-foreground">• New feature requests prioritized for Q3</div>
                        <div className="text-xs text-muted-foreground">
                          • Budget increase approved for design team
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-primary">Key Action Items</div>
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground flex items-center">
                          <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                          Sarah to finalize wireframes by Friday
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                          Michael to coordinate with backend team
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          <CheckCircle className="h-3 w-3 mr-1 text-muted-foreground" />
                          Schedule user testing for prototype v2
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-primary">Discussion Notes</div>
                      <div className="text-xs text-muted-foreground leading-relaxed">
                        The team discussed the challenges with the current implementation approach. Alex suggested we
                        pivot to a microservices architecture to improve scalability.
                        <span className="block mt-2">
                          <span className="text-primary">AI Enhancement:</span> Consider Docker containers for
                          consistent deployment across environments.
                        </span>
                      </div>
                    </div>
                  </>
                </MacOsWindow>
              </ScrollAppear>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 bg-muted/40 dark:bg-muted/15 border-y">
          <div className="container px-4 md:px-6 m-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <ScrollAppear delay={0.4}>
                  <Badge icon={Zap} text="Powerful Features" />
                </ScrollAppear>
                <ScrollAppear delay={0.2}>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Smart notes that work for you</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                    Notate combines powerful AI with intuitive design to transform how you capture and organize
                    information.
                  </p>
                </ScrollAppear>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              {[
                {
                  icon: Package,
                  title: "AI Organization",
                  description:
                    "Our AI automatically categorizes and structures your notes, creating a logical flow of information.",
                },
                {
                  icon: Sparkles,
                  title: "Content Generation",
                  description:
                    "Get AI-powered suggestions and content enhancements that fit perfectly with your existing notes.",
                },
                {
                  icon: FileText,
                  title: "Smart Formatting",
                  description:
                    "Notes are automatically formatted for maximum readability with headings, bullet points, and highlights.",
                },
                {
                  icon: Layers,
                  title: "Contextual Connections",
                  description:
                    "Discover relationships between notes you never knew existed with AI-powered connections.",
                },
                {
                  icon: RefreshCw,
                  title: "Real-time Sync",
                  description: "Your notes sync instantly across all devices, so you're always up to date.",
                },
                {
                  icon: CheckCircle,
                  title: "Action Items",
                  description:
                    "AI identifies and tracks action items from your notes, helping you stay on top of tasks.",
                },
              ].map((feature, index) => (
                <div key={index} className="relative group h-full">
                  <ScrollAppear delay={0.4 + 0.15*index} className="h-full">
                    <div className="flex flex-col items-center space-y-1 rounded-xl border bg-card p-6 shadow transition-all hover:shadow-sm h-full dark:bg-radial-[at_50%_3.5rem] from-muted/25 to-background">
                      <feature.icon className="h-10 w-10 text-foreground mb-5 mt-3" />
                      <h3 className="text-xl font-bold">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground text-center">{feature.description}</p>
                    </div>
                  </ScrollAppear>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 m-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <ScrollAppear delay={0.6}>
                  <Badge icon={RefreshCw} text="The Process" />
                </ScrollAppear>
                
                <ScrollAppear delay={0.4}>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How Notate works</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                    From chaotic thoughts to organized brilliance in seconds
                  </p>
                </ScrollAppear>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3 group">
              {[
                {
                  step: "01",
                  icon: SquarePenIcon,
                  title: "Capture",
                  description:
                    "Type, dictate, or import your notes in any format. No structure needed—just get your thoughts down.",
                },
                {
                  step: "02",
                  icon: CpuIcon,
                  title: "AI Processing",
                  description:
                    "Our AI analyzes your content, identifies key themes, and organizes information into a coherent structure.",
                },
                {
                  step: "03",
                  icon: SparklesIcon,
                  title: "Enhance & Use",
                  description:
                    "Review your organized notes, accept AI suggestions, and easily share or export your polished content.",
                },
              ].map((step, index) => (
                <div key={index} className="relative">
                  <ScrollAppear delay={0.6+0.75*index} yOffset={80} duration={1} className="h-full">
                    <div className="flex flex-col space-y-4 rounded-xl border bg-radial-[at_0_0] to-80% from-muted/40 to-transparent p-6 shadow-sm h-full duration-500 hover:shadow-lg hover:from-muted dark:hover:from-muted/75 hover:scale-105 transition">
                      <div className="text-4xl font-bold opacity-15">{step.step}</div>
                      <h3 className="text-xl font-bold flex items-center gap-2">
                        {step.title}
                        <div className="items-center justify-center flex">
                          <step.icon className={`size-5 text-foreground opacity-30 animate-pulse delay-${
                            index === 0 ? '' :
                            index === 1 ? '500' :
                            '1000'
                          }`} />
                        </div>
                      </h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                      {index < 2 && (
                        <div className="hidden lg:block absolute -right-10 top-1/2 transform -translate-y-1/2 z-10 group-hover:opacity-0 transition-opacity duration-500">
                          <ChevronRight strokeWidth={3} className="size-4 text-foreground/10 dark:text-muted -translate-x-5 -translate-y-1/2" />
                        </div>
                      )}
                    </div>
                  </ScrollAppear>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <ScrollAppear delay={1.8} yOffset={75}>
                <Link href="/signup">
                  <Button>
                    Try It Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </ScrollAppear>
            </div>
          </div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 bg-muted/40 dark:bg-muted/15 border-y">
          <div className="container px-4 md:px-6 m-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <ScrollAppear duration={1}>
                  <Badge icon={CheckCircle} text="Testimonials" />
                </ScrollAppear>
                <ScrollAppear delay={0.3}>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What our users say</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                    Join thousands of professionals who've transformed how they take notes
                  </p>
                </ScrollAppear>
              </div>
            </div>
            <ScrollAppear duration={1} delay={0.4} yOffset={60}>
              <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 relative">
                {[
                  {
                    quote:
                      "I used to spend hours organizing my lecture notes. Now Notate does it in seconds, and the suggestions are spot on.",
                    author: "Jamie Wong",
                    role: "Graduate Student",
                  },
                  {
                    quote:
                      "The real-time sync across devices means I can start notes on my phone and continue on my laptop without missing a beat.",
                    author: "Taylor Smith",
                    role: "Entrepreneur",
                  },
                  {
                    quote:
                      "As someone with ADHD, staying organized is a challenge. Notate's AI structure helps me focus on content, not organization.",
                    author: "Jordan Lee",
                    role: "Software Developer",
                  },
                  {
                    quote:
                      "Notate has completely changed how I prepare for meetings. The AI organizes my chaotic thoughts into clear action items.",
                    author: "Sarah J.",
                    role: "Product Manager",
                  },
                  {
                    quote:
                      "As a researcher, I need to process tons of information. Notate's AI helps me connect ideas I would have missed otherwise.",
                    author: "Dr. Michael Chen",
                    role: "Research Scientist",
                  },
                  {
                    quote:
                      "The content generation feature is like having a writing assistant. It fills in gaps and makes my notes more comprehensive.",
                    author: "Alex Rivera",
                    role: "Content Strategist",
                  },
                ].map((testimonial, index) => (
                  <div key={index} className="relative group">
                    <div className="flex flex-col justify-between space-y-4 rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md h-full">
                      <p className="text-sm text-muted-foreground italic">"{testimonial.quote}"</p>
                      <div>
                        <p className="text-sm font-medium">{testimonial.author}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="hidden absolute bottom-0 md:flex items-end justify-center left-1/2 -translate-x-1/2 bg-linear-to-t from-[#fbfbfb] dark:from-[#0f0f0f] from-30% to-transparent h-1/2 w-screen" >
                  <ScrollAppear delay={1} className="flex justify-center">
                    <Button>
                      Read more
                      <SquareArrowOutUpRight/>
                    </Button>
                    </ScrollAppear>
                </div>
                <ScrollAppear delay={1} className="flex justify-center">
                  <Button variant="outline" className="flex w-fit md:hidden">
                      Read more
                      <SquareArrowOutUpRight/>
                  </Button>
                </ScrollAppear>
              </div>
            </ScrollAppear>
          </div>
        </section>

        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 m-auto">
            <ScrollAppear delay={0.2} className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge icon={Zap} text="Pricing" />
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple, transparent pricing</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Choose the plan that's right for you
                </p>
              </div>
            </ScrollAppear>
            <ScrollAppear delay={0.4} className="mx-auto grid max-w-5xl gap-6 py-12 sm:w-80 lg:grid-cols-3 lg:w-auto">
              {[
                {
                  name: "Free",
                  price: "$0",
                  description: "Perfect for getting started",
                  features: [
                    "Up to 50 notes",
                    "Basic AI organization",
                    "Limited content suggestions",
                    "Web access only",
                  ],
                },
                {
                  name: "Pro",
                  price: "$9.99",
                  period: "/month",
                  description: "For serious note-takers",
                  features: [
                    "Unlimited notes",
                    "Advanced AI organization",
                    "Full content generation",
                    "Cross-device sync",
                    "Export in multiple formats",
                    "Priority support",
                  ],
                  popular: true,
                },
                {
                  name: "Team",
                  price: "$19.99",
                  period: "/user/month",
                  description: "For collaborative teams",
                  features: [
                    "Everything in Pro",
                    "Collaborative notes",
                    "Team workspaces",
                    "Admin controls",
                    "Advanced security",
                    "API access",
                  ],
                },
              ].map((plan, index) => (
                <div key={index} className="relative group">
                  <div
                    className={`flex flex-col space-y-6 rounded-xl border h-full shadow-sm transition-all hover:shadow-md ${
                      plan.popular ? "border-primary bg-card ring-1 ring-primary" : "border-border bg-card"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 right-6 transform -translate-y-1/2">
                        <div className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                          Most Popular
                        </div>
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold">{plan.name}</h3>
                      <div className="mt-4 flex items-baseline">
                        <span className="text-3xl font-bold">{plan.price}</span>
                        {plan.period && <span className="ml-1 text-sm text-muted-foreground">{plan.period}</span>}
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                    </div>
                    <div className="flex-1 p-6 pt-0">
                      <ul className="space-y-3">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                            <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-6 pt-0">
                      <Link href="/signup" className="w-full">
                        <Button
                          className={`w-full ${plan.popular ? "" : "bg-muted hover:bg-muted/80"}`}
                          variant={plan.popular ? "default" : "outline"}
                        >
                          Get Started
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollAppear>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-muted/40 dark:bg-muted/15 border-y">
          <div className="container px-4 md:px-6 m-auto">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <ScrollAppear delay={0.2} duration={0.5}>
                  <Badge icon={Sparkles} text="Get Started Today" />
                </ScrollAppear>
                <ScrollAppear>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Transform your note-taking experience
                  </h2>
                </ScrollAppear>
                <ScrollAppear delay={0.4} duration={0.8}>
                  <p className="text-muted-foreground md:text-xl">
                    Join thousands of professionals who've discovered the power of AI-organized notes. Try Notate free for
                    14 days.
                  </p>
                </ScrollAppear>  
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <ScrollAppear delay={0.6}>
                    <Link href="/signup">
                      <Button>Start Your Free Trial</Button>
                    </Link>
                  </ScrollAppear>
                  <ScrollAppear delay={0.5} duration={0.8}>
                    <Link href="#features">
                      <Button variant="outline">Learn More</Button>
                    </Link>
                  </ScrollAppear>
                </div>
              </div>
              
              <ScrollAppear duration={1.5} yOffset={40} delay={1}>
                <MacOsWindow 
                  windowTitle="Notate AI Assistant" 
                  inputPlaceholders={["Ask Notate AI...","Notate AI's thinking..."]}
                  onGenerated={()=>
                    toast("Try Notate for free for 14 days.",{
                      action: {
                        label: "Free Trial",
                        onClick: () => window.location.href = "/signup"
                      }
                    })
                  }
                >
                  <>
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs text-secondary">NO</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-muted-foreground">Notate AI</div>
                        <div className="mt-1 text-sm text-muted-foreground">
                          I've analyzed your meeting notes and identified 3 key action items that need attention by
                          Friday. Would you like me to organize them by priority?
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-xs">JO</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-muted-foreground">John Doe</div>
                        <div className="mt-1 text-sm">
                          Yes, please organize by priority and add any relevant context.
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs text-secondary">NO</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-muted-foreground">Notate AI</div>
                        <div className="mt-1 text-sm text-muted-foreground">
                          <div className="space-y-2">
                            <div className="font-medium text-primary">High Priority</div>
                            <div className="flex items-center">
                              <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                              <span>Finalize Q3 budget proposal (Deadline: Thursday)</span>
                            </div>
                            <div className="font-medium text-primary mt-3">Medium Priority</div>
                            <div className="flex items-center">
                              <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                              <span>Schedule team review meeting (Suggested: Wednesday)</span>
                            </div>
                            <div className="font-medium text-primary mt-3">Low Priority</div>
                            <div className="flex items-center">
                              <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                              <span>Update project documentation (By Friday)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                </MacOsWindow>
              </ScrollAppear>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 bg-background">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row px-4 md:px-6 m-auto">
          <div className="flex items-center gap-2">
            <ModeToggle/>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Notate. All rights reserved.
          </p>
          <div className="flex gap-4 items-center">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

