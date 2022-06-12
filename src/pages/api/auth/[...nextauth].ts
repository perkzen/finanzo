import NextAuth, { Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface UserSession extends Session {
  user: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
    id?: string | null | undefined;
  };
}

export default NextAuth({
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
  },
  providers: [
    // ...add more providers here
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    session: ({ session, user }): UserSession => {
      return {
        ...session,
        user,
      };
    },
  },
  events: {
    signIn: async ({ user, isNewUser }) => {
      const currentYear = new Date().getFullYear();
      if (isNewUser) {
        await prisma.monthlyReport.createMany({
          data: [
            { month: 'January', year: currentYear, userId: user.id },
            { month: 'February', year: currentYear, userId: user.id },
            { month: 'March', year: currentYear, userId: user.id },
            { month: 'April', year: currentYear, userId: user.id },
            { month: 'May', year: currentYear, userId: user.id },
            { month: 'June', year: currentYear, userId: user.id },
            { month: 'July', year: currentYear, userId: user.id },
            { month: 'August', year: currentYear, userId: user.id },
            { month: 'September', year: currentYear, userId: user.id },
            { month: 'October', year: currentYear, userId: user.id },
            { month: 'November', year: currentYear, userId: user.id },
            { month: 'December', year: currentYear, userId: user.id },
          ],
        });
      }
    },
  },
});
