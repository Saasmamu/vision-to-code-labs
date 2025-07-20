
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  company TEXT,
  role TEXT DEFAULT 'user', -- user, admin, developer
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categories table
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Apps table
CREATE TABLE public.apps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  long_description TEXT,
  category_id UUID REFERENCES public.categories(id),
  creator_id UUID REFERENCES auth.users(id),
  status TEXT DEFAULT 'draft', -- draft, active, inactive
  featured BOOLEAN DEFAULT false,
  custom_domain BOOLEAN DEFAULT false,
  version TEXT DEFAULT '1.0.0',
  demo_url TEXT,
  github_url TEXT,
  images JSONB DEFAULT '[]',
  tags TEXT[] DEFAULT '{}',
  downloads INTEGER DEFAULT 0,
  rating DECIMAL(2,1) DEFAULT 0,
  rating_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pricing plans table
CREATE TABLE public.pricing_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  app_id UUID REFERENCES public.apps(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  billing_period TEXT DEFAULT 'monthly',
  features JSONB DEFAULT '[]',
  is_popular BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  app_id UUID REFERENCES public.apps(id),
  plan_id UUID REFERENCES public.pricing_plans(id),
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  status TEXT DEFAULT 'pending',
  stripe_session_id TEXT,
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User apps access table
CREATE TABLE public.user_apps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  app_id UUID REFERENCES public.apps(id),
  plan_id UUID REFERENCES public.pricing_plans(id),
  order_id UUID REFERENCES public.orders(id),
  status TEXT DEFAULT 'active',
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews table
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  app_id UUID REFERENCES public.apps(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Updates table
CREATE TABLE public.updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  app_id UUID REFERENCES public.apps(id),
  title TEXT NOT NULL,
  content TEXT,
  version TEXT,
  type TEXT DEFAULT 'feature',
  target_users TEXT[],
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.updates ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Categories (public read)
CREATE POLICY "Categories are publicly readable" ON public.categories FOR SELECT USING (true);

-- Apps (public read for active apps)
CREATE POLICY "Active apps are publicly readable" ON public.apps FOR SELECT USING (status = 'active');
CREATE POLICY "Creators can manage own apps" ON public.apps FOR ALL USING (auth.uid() = creator_id);

-- Pricing plans (public read)
CREATE POLICY "Pricing plans are publicly readable" ON public.pricing_plans FOR SELECT USING (true);

-- Orders (users can view own orders)
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User apps (users can view own apps)
CREATE POLICY "Users can view own app access" ON public.user_apps FOR SELECT USING (auth.uid() = user_id);

-- Reviews (public read, users can manage own)
CREATE POLICY "Reviews are publicly readable" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Users can manage own reviews" ON public.reviews FOR ALL USING (auth.uid() = user_id);

-- Updates (public read)
CREATE POLICY "Updates are publicly readable" ON public.updates FOR SELECT USING (true);

-- Insert default categories
INSERT INTO public.categories (name, slug, description, icon) VALUES
('AI & Machine Learning', 'ai', 'AI-powered applications and tools', 'Brain'),
('Productivity', 'productivity', 'Tools to boost productivity', 'Zap'),
('Analytics', 'analytics', 'Data analysis and reporting tools', 'BarChart'),
('CRM', 'crm', 'Customer relationship management', 'Users'),
('Marketing', 'marketing', 'Marketing automation and tools', 'Megaphone'),
('E-commerce', 'ecommerce', 'Online store and sales tools', 'ShoppingCart');

-- Function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
