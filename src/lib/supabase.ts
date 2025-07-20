import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pjphxschnyidaviyqqct.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqcGh4c2NobnlpZGF2aXlxcWN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5OTUyMTMsImV4cCI6MjA2ODU3MTIxM30.RjULwOTq35bA-wp7FjWywCRS5DQ_OOJPez0_Jg9_R4g';

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
