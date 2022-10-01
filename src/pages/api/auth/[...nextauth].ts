import NextAuth, { Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { createMonthlyReports } from '../../../server/helpers/createMonthlyReports';

const prisma = new PrismaClient();

export interface UserSession extends Session {
  user: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
    id: string;
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
      if (!isNewUser) return;
      const currentYear = new Date().getFullYear();
      try {
        const { id } = await prisma.yearlyReport.create({
          data: { userId: user.id, year: currentYear },
        });
        const reports = createMonthlyReports(user.id, id);
        await prisma.monthlyReport.createMany({
          data: reports,
        });
      } catch (e) {
        console.error(e);
      }

      // what if fail
    },
  },
});
