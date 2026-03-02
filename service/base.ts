/**
 * Base service utilities for SERVER-SIDE usage
 * Provides shared Supabase client and common query patterns
 * DO NOT import this in client components - use base-client.ts instead
 */

import { createClient as createServerClient } from "@/lib/supabase/server";
import { createResult, type Result, handleSupabaseError } from "@/lib/error-handler";

/**
 * Gets Supabase client for server-side usage
 */
export async function getServerClient() {
  return await createServerClient();
}

/**
 * Standardized query wrapper that handles errors consistently (server-side)
 */
export async function executeQuery<T>(
  queryFn: () => Promise<{ data: T | null; error: unknown }>,
  context: string
): Promise<Result<T>> {
  try {
    const { data, error } = await queryFn();

    if (error) {
      // Check if it's a "not found" error (expected case)
      const isNotFound = error && typeof error === 'object' && 'code' in error &&
        ((error as { code?: string }).code === 'PGRST116' || (error as { code?: string }).code === 'PGRST301');
      
      if (isNotFound) {
        // Return null data without error for "not found" cases
        return createResult<T>(null, null);
      }
      
      const serviceError = handleSupabaseError(error, context);
      return createResult<T>(null, new Error(serviceError.message));
    }

    if (!data) {
      // No data but no error - this is also a "not found" case
      return createResult<T>(null, null);
    }

    return createResult(data, null);
  } catch (error) {
    const serviceError = handleSupabaseError(error, context);
    return createResult<T>(null, new Error(serviceError.message));
  }
}

/**
 * Standardized query wrapper for arrays (returns empty array on error) - server-side
 */
export async function executeArrayQuery<T>(
  queryFn: () => Promise<{ data: T[] | null; error: unknown }>,
  context: string
): Promise<T[]> {
  const result = await executeQuery<T[]>(queryFn, context);
  return result.data || [];
}
