
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Portfolio from "./pages/Portfolio";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminApps from "./pages/admin/AdminApps";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminUpdates from "./pages/admin/AdminUpdates";
import BuySaaS from "./pages/BuySaaS";
import AppDetail from "./pages/AppDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/buysaas" element={<BuySaaS />} />
            <Route path="/buysaas/:slug" element={<AppDetail />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/apps" element={<AdminApps />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/updates" element={<AdminUpdates />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
