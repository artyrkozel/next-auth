'use client'
import { useEffect, useState } from "react";
import useSupabase from "./useSupabase";
import { User } from "@supabase/auth-helpers-react";

const useUser = () => {
    const supabase = useSupabase();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchUser = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
        setLoading(false);
      };
  
      fetchUser();
    }, []);
  
    return { user, loading };
  };
  
  export default useUser;