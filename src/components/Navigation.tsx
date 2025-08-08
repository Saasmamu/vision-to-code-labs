
import { useState } from 'react';
import { NavBar } from "@/components/ui/tubelight-navbar";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/auth/AuthModal";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  Home, 
  User, 
  Briefcase, 
  MessageSquare, 
  Code, 
  Phone, 
  FolderOpen,
  LogOut,
  Settings,
  Package
} from "lucide-react";

const Navigation = () => {
  const { user, profile, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();

  const publicNavItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Services', url: '/services', icon: Briefcase },
    { name: 'Portfolio', url: '/portfolio', icon: FolderOpen },
    { name: 'Tech Stack', url: '#tech-stack', icon: Code },
    { name: 'About', url: '/about', icon: User },
    { name: 'Contact', url: '/contact', icon: Phone }
  ];

  const userNavItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Dashboard', url: '/dashboard', icon: Settings },
    { name: 'Browse Apps', url: '/buysaas', icon: Package },
    { name: 'Services', url: '/services', icon: Briefcase },
    { name: 'About', url: '/about', icon: User },
    { name: 'Contact', url: '/contact', icon: Phone }
  ];

  const adminNavItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Dashboard', url: '/dashboard', icon: Settings },
    { name: 'Admin', url: '/admin', icon: Settings },
    { name: 'Browse Apps', url: '/buysaas', icon: Package },
    { name: 'Services', url: '/services', icon: Briefcase }
  ];

  const getNavItems = () => {
    if (!user) return publicNavItems;
    if (profile?.role === 'admin') return adminNavItems;
    return userNavItems;
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <NavBar items={getNavItems()} />
        
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground hidden md:block">
                {profile?.full_name || user.email}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="flex items-center space-x-1"
              >
                <LogOut className="h-3 w-3" />
                <span className="hidden md:inline">Sign Out</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAuthModal(true)}
                className="hidden md:flex"
              >
                Sign In
              </Button>
              <Button
                onClick={handleGetStarted}
                className="neon-glow"
                size="sm"
              >
                Get Started
              </Button>
            </div>
          )}
        </div>
      </div>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
};

export default Navigation;
