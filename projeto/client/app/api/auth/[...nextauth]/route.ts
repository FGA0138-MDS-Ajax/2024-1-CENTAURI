
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';
import axios from 'axios';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials) => {
                try {
                    const response = await axios.post('http://localhost:8000/auth/login', {
                        email: credentials?.email,
                        password: credentials?.password,
                    });

                    if (response.status === 200 && response.data) {
                        return {
                            id: response.data.id,
                            name: response.data.nome,
                            email: response.data.email,
                        };
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error('Login error:', error);
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: '/auth/login',
        error: '/auth/error',
    },
    callbacks: {
        async session({ session, token }) {
            // @ts-ignore
            session.user.id = token.id;
            // @ts-ignore
            session.user.name = token.name;
            // @ts-ignore
            session.user.email = token.email;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },
    },
    secret: '123',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
