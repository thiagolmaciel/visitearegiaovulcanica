import { redirect } from "next/navigation";

/**
 * Redirect /auth to /auth/login
 * This page was a demo/starter page and is no longer used
 */
export default function Auth() {
  redirect("/auth/login");
}
