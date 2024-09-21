import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

console.log("DEBUG env: ", process.env);
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
