import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { UserRole } from '@prisma/client'

import authConfig from '@/auth.config';
import { db } from './libs/db';
import { getUserById } from './database/read/get-users';
import { getTwoFactorConfirmationByUserId } from './database/read/get-two-factor';

export const {
      handlers: { GET, POST },
      auth,
      signIn,
      signOut,
} = NextAuth({
      pages: {
            signIn: "/auth/login",
            error: "/auth/error",
      },
      events: {
            async linkAccount({ user }) {
                  await db.user.update({
                        where: { id: user.id },
                        data: { emailVerified: new Date() }
                  })
            }
      },
      callbacks: {
            async signIn({ user, account }) {
                  // Allow OAuth without email verification
                  if (account?.provider !== "credentials") return true;

                  const existingUser = await getUserById(user.id);

                  // Prevent sign in without email verification
                  if (!existingUser?.emailVerified) {
                        return false;
                  }

                  if (existingUser?.isTwoFactorEnabled) {
                        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

                        if (!twoFactorConfirmation) return false;

                        // Delete two factor confirmation for next sign in
                        await db.twoFactorConfirmation.delete({
                              where: { id: twoFactorConfirmation.id }
                        });
                  }

                  return true;

            },

            async session({ token, session }) {
                  if (token.sub && session.user) {
                        session.user.id = token.sub;
                  }

                  if (token.role && session.user) {
                        session.user.role = token.role as UserRole;
                  }

                  return session;
            },

            async jwt({ token }) {
                  if (!token.sub) return token;

                  const existingUser = await getUserById(token.sub);

                  if (existingUser) {
                        token.role = existingUser.role;
                  }

                  return token;
            }
      },
      adapter: PrismaAdapter(db),
      session: { strategy: 'jwt' },
      ...authConfig,
});
