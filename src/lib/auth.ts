import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { bearer } from "better-auth/plugins";
import { NextRequest } from 'next/server';
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
    // Use the request headers directly for proper bearer token support
    const session = await auth.api.getSession({ headers: request.headers });
    return session?.user || null;
  } catch (error) {
    console.error("getCurrentUser error:", error);
    return null;
  }
}