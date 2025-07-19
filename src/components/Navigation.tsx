
import { NavBar } from "@/components/ui/tubelight-navbar"
import { Home, User, Briefcase, MessageSquare, Code, Phone } from "lucide-react"

const Navigation = () => {
  const navItems = [
    { name: 'Home', url: '#', icon: Home },
    { name: 'Services', url: '#services', icon: Briefcase },
    { name: 'Tech Stack', url: '#tech-stack', icon: Code },
    { name: 'About', url: '#why-choose-us', icon: User },
    { name: 'Testimonials', url: '#testimonials', icon: MessageSquare },
    { name: 'Contact', url: '#contact', icon: Phone }
  ]

  return <NavBar items={navItems} />
}

export default Navigation
