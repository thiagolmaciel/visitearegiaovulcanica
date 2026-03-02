/**
 * Centralized error handling utility
 * Provides standardized error types and logging
 */

export type Result<T> = {
  data: T | null;
  error: Error | null;
};

export type ServiceError = {
  code: string;
  message: string;
  details?: unknown;
};

/**
 * Creates a standardized result object
 */
export function createResult<T>(data: T | null, error: Error | null = null): Result<T> {
  return { data, error };
}

/**
 * Logs errors in a structured way
 * In production, this should integrate with a logging service
 */
export function logError(
  context: string,
  error: unknown,
  details?: Record<string, unknown>
): void {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorStack = error instanceof Error ? error.stack : undefined;

  // In development, log to console
  if (process.env.NODE_ENV === 'development') {
    console.error(`[${context}]`, {
      message: errorMessage,
      stack: errorStack,
      ...details,
    });
  }

  // In production, you would send to a logging service
  // Example: sendToLoggingService({ context, error: errorMessage, details });
}

/**
 * Wraps async functions with error handling
 */
export async function withErrorHandling<T>(
  fn: () => Promise<T>,
  context: string
): Promise<Result<T>> {
  try {
    const data = await fn();
    return createResult(data, null);
  } catch (error) {
    logError(context, error);
    return createResult<T>(null, error instanceof Error ? error : new Error(String(error)));
  }
}

/**
 * Checks if an error is a "not found" error (expected case, not a real error)
 */
function isNotFoundError(error: unknown): boolean {
  if (error && typeof error === 'object' && 'code' in error) {
    const code = (error as { code?: string }).code;
    // PGRST116: The result contains 0 rows (expected for .single() queries)
    // PGRST301: No rows found (expected for queries that might not return results)
    return code === 'PGRST116' || code === 'PGRST301';
  }
  
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    return message.includes('0 rows') || 
           message.includes('no rows') || 
           message.includes('not found') ||
           message.includes('result contains 0 rows');
  }
  
  return false;
}

/**
 * Converts Supabase errors to standardized format
 */
export function handleSupabaseError(error: unknown, context: string): ServiceError {
  // Don't log "not found" errors - they're expected cases
  const isNotFound = isNotFoundError(error);
  
  if (error && typeof error === 'object' && 'message' in error) {
    const supabaseError = error as { message: string; code?: string; details?: unknown };
    
    // Only log if it's not a "not found" error
    if (!isNotFound) {
      logError(context, error);
    }
    
    return {
      code: supabaseError.code || 'UNKNOWN_ERROR',
      message: supabaseError.message,
      details: supabaseError.details,
    };
  }

  const errorMessage = error instanceof Error ? error.message : String(error);
  
  // Only log if it's not a "not found" error
  if (!isNotFound) {
    logError(context, error);
  }
  
  return {
    code: 'UNKNOWN_ERROR',
    message: errorMessage,
  };
}
