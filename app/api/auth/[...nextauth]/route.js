import NextAuth from "next-auth";

import { connectToDatabase } from "@/lib/dbConnect";
import { verifyPassword } from "@/lib/auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "test@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { db } = await connectToDatabase();
        const userCollection = db.collection("user");
        const user = await userCollection.findOne({ email: credentials.email });

        if (!user) {
          console.log("User not found");
          return null;
        }

        const isvalid = await verifyPassword(
          credentials.password,
          user.password,
        );

        if (!isvalid) {
          console.log("Invalid password");
          return null;
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name || "User",
        };
      },
    }),
  ],
  callbacks: {
    // این callbacks برای مدیریت اطلاعات سشن و توکن JWT هستن
    async jwt({ token, user, account, profile, isNewUser }) {
      // console.log("JWT Callback:", { token, user, account, profile, isNewUser });
      if (account && account.provider === "credentials") {
        // وقتی کاربر با Credentials لاگین میکنه، اطلاعاتش رو به توکن اضافه کن
        token.userId = user.id; // از اطلاعاتی که authorize برگردونده
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token, user }) {
      // console.log("Session Callback:", { session, token, user });
      // اطلاعات توکن رو به آبجکت session اضافه کن
      session.user.id = token.userId;
      session.user.email = token.email;
      session.user.name = token.name;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler, handler as GET, handler as POST }; // GET و POST رو export کن
