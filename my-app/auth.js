import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "./lib/db";
import User from "./models/User";

import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
   

    Credentials({
      name: "Credentials",

      // These are the fields that our login form sends.
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        // Make sure email and password were provided.
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        await connectDB();

        // Find the user in MongoDB.
        const user = await User.findOne({
          email: credentials.email,
        });

        if (!user) {
          return null;
        }

        // Compare the password entered by the user
        // with the hashed password stored in MongoDB.
        const passwordMatches = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!passwordMatches) {
          return null;
        }

        // This object becomes available in the session.
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  // Use JWT sessions so we don't need to create a separate
  // database session collection.
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      // `user` is available when the user first logs in.
      if (user) {
        token.id = user.id;
      }

      return token;
    },

    async session({ session, token }) {
      // Add the user ID to the session.
      if (session.user) {
        session.user.id = token.id;
      }

      return session;
    },
  },

  pages: {
    // Tell Auth.js to use our own login page.
    signIn: "/login",
  },
});