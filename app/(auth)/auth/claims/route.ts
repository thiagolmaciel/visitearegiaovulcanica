import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getClaims()
    if (error) return NextResponse.json({ error: error.message }, { status: 401 })
    return NextResponse.json({ claims: data?.claims })
  }
  