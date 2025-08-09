
-- Create a default admin user
-- First, we'll insert directly into auth.users (this simulates what happens during signup)
INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    role,
    aud,
    confirmation_token,
    email_change_token_new,
    email_change_token_current,
    recovery_token
) VALUES (
    'a0000000-0000-0000-0000-000000000001'::uuid,
    '00000000-0000-0000-0000-000000000000'::uuid,
    'admin@admin.com',
    crypt('admin123', gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"full_name":"Admin User"}'::jsonb,
    false,
    'authenticated',
    'authenticated',
    '',
    '',
    '',
    ''
);

-- Create the profile for the admin user
INSERT INTO public.profiles (
    id,
    username,
    full_name,
    role,
    company,
    created_at,
    updated_at
) VALUES (
    'a0000000-0000-0000-0000-000000000001'::uuid,
    'admin',
    'Admin User',
    'admin',
    'System',
    now(),
    now()
) ON CONFLICT (id) DO UPDATE SET
    role = 'admin',
    username = 'admin',
    full_name = 'Admin User',
    company = 'System';
