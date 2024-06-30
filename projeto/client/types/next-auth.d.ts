import 'next-auth';

declare module 'next-auth' {
    /**
     * Extends the built-in session/user types with the additional properties
     */
    interface Session {
        user: {
            id: number;
            nome: string;
            email: string;
        }
    }
}
