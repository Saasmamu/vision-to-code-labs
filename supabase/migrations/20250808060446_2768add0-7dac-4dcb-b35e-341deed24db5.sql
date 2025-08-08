
-- Phase 1: Critical Security Fixes

-- First, let's add the missing role column to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'user';

-- Add foreign key constraints that are missing
ALTER TABLE public.apps ADD CONSTRAINT apps_creator_id_fkey 
  FOREIGN KEY (creator_id) REFERENCES public.profiles(id);

ALTER TABLE public.apps ADD CONSTRAINT apps_category_id_fkey 
  FOREIGN KEY (category_id) REFERENCES public.categories(id);

ALTER TABLE public.pricing_plans ADD CONSTRAINT pricing_plans_app_id_fkey 
  FOREIGN KEY (app_id) REFERENCES public.apps(id) ON DELETE CASCADE;

ALTER TABLE public.orders ADD CONSTRAINT orders_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES public.profiles(id);

ALTER TABLE public.orders ADD CONSTRAINT orders_app_id_fkey 
  FOREIGN KEY (app_id) REFERENCES public.apps(id);

ALTER TABLE public.orders ADD CONSTRAINT orders_plan_id_fkey 
  FOREIGN KEY (plan_id) REFERENCES public.pricing_plans(id);

ALTER TABLE public.user_apps ADD CONSTRAINT user_apps_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES public.profiles(id);

ALTER TABLE public.user_apps ADD CONSTRAINT user_apps_app_id_fkey 
  FOREIGN KEY (app_id) REFERENCES public.apps(id);

ALTER TABLE public.user_apps ADD CONSTRAINT user_apps_plan_id_fkey 
  FOREIGN KEY (plan_id) REFERENCES public.pricing_plans(id);

ALTER TABLE public.user_apps ADD CONSTRAINT user_apps_order_id_fkey 
  FOREIGN KEY (order_id) REFERENCES public.orders(id);

ALTER TABLE public.reviews ADD CONSTRAINT reviews_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES public.profiles(id);

ALTER TABLE public.reviews ADD CONSTRAINT reviews_app_id_fkey 
  FOREIGN KEY (app_id) REFERENCES public.apps(id);

ALTER TABLE public.updates ADD CONSTRAINT updates_app_id_fkey 
  FOREIGN KEY (app_id) REFERENCES public.apps(id);

-- Create security definer function for role checking (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = _user_id
      AND role = _role
  )
$$;

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.updates ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles table
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all profiles" ON public.profiles
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for apps table
CREATE POLICY "Anyone can view published apps" ON public.apps
  FOR SELECT USING (status = 'published');

CREATE POLICY "Creators can view their own apps" ON public.apps
  FOR SELECT USING (auth.uid() = creator_id);

CREATE POLICY "Admins can view all apps" ON public.apps
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Creators can create apps" ON public.apps
  FOR INSERT WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Creators can update their own apps" ON public.apps
  FOR UPDATE USING (auth.uid() = creator_id);

CREATE POLICY "Admins can manage all apps" ON public.apps
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for categories table (public read)
CREATE POLICY "Anyone can view categories" ON public.categories
  FOR SELECT TO public USING (true);

CREATE POLICY "Admins can manage categories" ON public.categories
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for pricing_plans table
CREATE POLICY "Anyone can view pricing plans" ON public.pricing_plans
  FOR SELECT TO public USING (true);

CREATE POLICY "App creators can manage their pricing plans" ON public.pricing_plans
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.apps 
      WHERE apps.id = pricing_plans.app_id 
      AND apps.creator_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all pricing plans" ON public.pricing_plans
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for orders table
CREATE POLICY "Users can view their own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all orders" ON public.orders
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user_apps table
CREATE POLICY "Users can view their own apps" ON public.user_apps
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own app entries" ON public.user_apps
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all user apps" ON public.user_apps
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for reviews table
CREATE POLICY "Anyone can view reviews" ON public.reviews
  FOR SELECT TO public USING (true);

CREATE POLICY "Users can create reviews" ON public.reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews" ON public.reviews
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reviews" ON public.reviews
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all reviews" ON public.reviews
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for updates table
CREATE POLICY "Anyone can view updates" ON public.updates
  FOR SELECT TO public USING (true);

CREATE POLICY "Admins can manage updates" ON public.updates
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Create function to automatically assign profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    'user'
  );
  RETURN new;
END;
$$;

-- Create trigger for new user profiles
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
