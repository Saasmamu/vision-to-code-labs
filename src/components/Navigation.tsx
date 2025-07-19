
import { NavBar } from "@/components/ui/tubelight-navbar"
import { Home, User, Briefcase, MessageSquare, Code, Phone, FolderOpen } from "lucide-react"

const Navigation = () => {
  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Services', url: '/services', icon: Briefcase },
    { name: 'Portfolio', url: '/portfolio', icon: FolderOpen },
    { name: 'Tech Stack', url: '#tech-stack', icon: Code },
    { name: 'About', url: '/about', icon: User },
    { name: 'Contact', url: '/contact', icon: Phone }
  ]

  return <NavBar items={navItems} />
}

export default Navigation
