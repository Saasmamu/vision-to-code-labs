
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string | null;
          full_name: string | null;
          avatar_url: string | null;
          company: string | null;
          role: string;
          created_at: string;
          updated_at: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          icon: string | null;
          created_at: string;
        };
      };
      apps: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          long_description: string | null;
          category_id: string | null;
          creator_id: string | null;
          status: string;
          featured: boolean;
          custom_domain: boolean;
          version: string;
          demo_url: string | null;
          github_url: string | null;
          images: any;
          tags: string[];
          downloads: number;
          rating: number;
          rating_count: number;
          created_at: string;
          updated_at: string;
        };
      };
      pricing_plans: {
        Row: {
          id: string;
          app_id: string;
          name: string;
          price: number;
          billing_period: string;
          features: any;
          is_popular: boolean;
          created_at: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string | null;
          app_id: string | null;
          plan_id: string | null;
          amount: number;
          currency: string;
          status: string;
          stripe_session_id: string | null;
          stripe_customer_id: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      user_apps: {
        Row: {
          id: string;
          user_id: string | null;
          app_id: string | null;
          plan_id: string | null;
          order_id: string | null;
          status: string;
          expires_at: string | null;
          created_at: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          user_id: string | null;
          app_id: string | null;
          rating: number | null;
          comment: string | null;
          created_at: string;
        };
      };
    };
  };
}
