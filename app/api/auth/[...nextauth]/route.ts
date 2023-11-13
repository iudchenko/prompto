import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import process from "process";
import { Session } from "next-auth";
import User from "@models/user";

import { connectToDB } from "@utils/database";
import { IProfile } from "@/types/types";

const googleId = process.env.GOOGLE_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!googleId || !googleClientSecret) {
  throw new Error("Google credentials are not defined");
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: googleId,
      clientSecret: googleClientSecret,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session?.user?.email });

      if (session?.user && sessionUser) {
        (session.user as IProfile).id = sessionUser._id.toString();
      }

      return session;
    },

    async signIn({ profile }: { profile?: IProfile }): Promise<boolean> {
      try {
        await connectToDB();
        // check if use already exists
        const userExists = await User.findOne({ email: profile?.email });
        // if not, create a new user
        if (!userExists) {
          const username = profile?.name
            ? profile.name.replace(" ", "").toLowerCase()
            : undefined;

          await User.create({
            email: profile?.email,
            username: username,
            image: profile?.picture,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
