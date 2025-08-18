import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";
import { supabase } from "../../../../../../utils/supabaseClient";
import jwt from 'jsonwebtoken'
const handler = NextAuth({
  pages:{
    signIn: "/login"
  },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
              user: { label: "Username", type: "text", placeholder: "jsmith" },
              password: { label: "Password", type: "password" }
            },

            async authorize(credentials, req) {
                if(!credentials){
                  return null
                }

                return {
                  id: '1',
                  name: credentials.user,
                  user: credentials.user,
                };
                
                return null
            }
          })
    ],
    adapter: SupabaseAdapter({
      url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
      secret: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

    }),
    callbacks:{
      async session({session, user}){
        const signingSecret = process.env.SUPABASE_JWT_SECRET
        if(signingSecret){
          const payload = {
            aud: "authenticated",
            exp: Math.floor(new Date(session.expires).getTime() / 1000),
            sub: user.id,
            email: user.email,
            role: "authenticated",
          }
          session.supabaseAccessToken = jwt.sign(payload, signingSecret)
        }
        return session
      }
    }
})
export { handler as GET, handler as POST}