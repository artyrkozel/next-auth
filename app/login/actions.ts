'use server'


import useSupabaseServer from '@/utils/supabase-server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation'

export async function Login(formData: FormData) {
    const coolieStore = cookies();
  const supabase = useSupabaseServer(coolieStore)

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/watches')
}

export async function Signup(formData: FormData) {
  const coolieStore = cookies();
  const supabase = useSupabaseServer(coolieStore);

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/')
  redirect('/')
}

export async function Logout() {
  const coolieStore = cookies();
  const supabase = useSupabaseServer(coolieStore);
  await supabase.auth.signOut();
  
  redirect("/login");
};