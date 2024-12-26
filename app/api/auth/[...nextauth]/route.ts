import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/provider/prismaClient";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn() {
      return true;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    async session({ session, user, token }) {
      session.user.id = token?.sub;
      session.user.name = token?.name;
      session.user.email = token?.email;
      session.user.image = token?.picture;
      session.user.role = token?.role;
      session.start = token?.iat; //token created
      session.end = token?.exp; //token created
      return session;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user?.id;
        token.name = user?.name;
        token.email = user?.email;
        token.picture = user?.image;
        token.role = user?.role; // Include the new field
      }
      return token;
    },
  },
  debug: true,
});

export { handler as GET, handler as POST };
