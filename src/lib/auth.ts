import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { bearer } from "better-auth/plugins";
import { NextRequest } from 'next/server';
import { headers } from "next/headers"
import { db } from "@/db";
 
export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "sqlite",
	}),
	emailAndPassword: {    
		enabled: true
	},
	plugins: [bearer()]
});

export async function getCurrentUser(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }

    const token = authHeader.slice(7);
    
    if (!token) {
      return null;
    }

    const headersList = await headers();
    const session = await auth.api.getSession({ headers: headersList });
    
    if (!session?.user) {
      return null;
    }
    
    return session.user;
  } catch (error) {
    console.error("getCurrentUser error:", error);
    return null;
  }
}