import { createClient } from "@/lib/supabase/client";
import { logError } from "@/lib/error-handler";

/**
 * Handles user logout
 * @throws Error if logout fails
 */
export const handleLogout = async () => {
    const supabase = createClient();

    try {
        const { error } = await supabase.auth.signOut();
        if (error) {
            logError('handleLogout', error);
            throw error;
        }
    } catch (error: unknown) {
        logError('handleLogout - exception', error);
        throw error;
    }
};