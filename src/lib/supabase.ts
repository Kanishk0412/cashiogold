import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface ContactFormData {
  id?: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  service: string;
  message: string;
  created_at?: string;
  status?: string;
}

export async function submitContactForm(data: ContactFormData) {
  const { data: result, error } = await supabase
    .from("contact_leads")
    .insert([
      {
        name: data.name,
        phone: data.phone,
        email: data.email,
        city: data.city,
        service: data.service,
        message: data.message,
        status: "new",
      },
    ])
    .select();

  if (error) throw error;
  return result;
}
