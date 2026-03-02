import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

/**
 * Claims API endpoint
 * 
 * Returns the current user's JWT claims (user metadata, roles, etc.)
 * Useful for debugging or checking user permissions.
 * 
 * Usage: GET /auth/claims
 * Returns: { claims: {...} } or { error: "..." }
 * 
 * Note: This endpoint requires authentication. Returns 401 if user is not logged in.
 */
export async function GET() {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getClaims()
    if (error) return NextResponse.json({ error: error.message }, { status: 401 })
    return NextResponse.json({ claims: data?.claims })
  }
  