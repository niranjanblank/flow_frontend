import { cookies } from "next/headers";

// Helper function to get the value of a cookie by name
export function getCookie(name: string) {
    const cookieStore = cookies();
    return cookieStore.get(name)?.value || null;
  }
  