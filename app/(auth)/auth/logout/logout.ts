import { createClient } from "@/lib/supabase/client";

export const handleLogout = async () => {
    const supabase = createClient();

    try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error;
    } catch (error: unknown) {
        throw error
    }
};