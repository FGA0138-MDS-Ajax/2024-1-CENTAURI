import {mysqlConn} from '../base/mysql';
import { type CreateUsuarioInput } from '../schemas/auth.schema';
import bcrypt from 'bcrypt';

type User = {
    id: number;
    nome: string;
    email: string;
    senha_hash: string;
};

class AuthRepository {
    async registerUser(user: CreateUsuarioInput){
        const hashedPassword = await bcrypt.hash(user.senha, 10);
        const conn = await mysqlConn.getConnection();
        const [result] = await conn.query(
            'INSERT INTO USUARIO (nome, email, time_favorito, senha_hash) VALUES (?, ?, ?, ?)',
            [user.nome, user.email, user.time_favorito, hashedPassword]
        );
        return result;
    }
    async getFavoritoByUser(id: number){
        const conn = await mysqlConn.getConnection();
        const [result] = await conn.query(
            'SELECT TIME_FAVORITO FROM USUARIO WHERE IDUSUARIO = ?',
            [id]
        );
        // @ts-ignore
        return result[0];
    }

    async login(email: string, senha: string):Promise<User | null> {
        try {
            const conn = await mysqlConn.getConnection();

            const [results]: [any[], any] = await conn.query(
                'SELECT IDUSUARIO, NOME, EMAIL, SENHA_HASH FROM USUARIO WHERE email = ?',
                [email]
            );
            conn.release();

            if (results.length === 0) {
                return null;
            }

            const dbUser = results[0];

            const user: User = {
                id: dbUser.IDUSUARIO,
                nome: dbUser.NOME,
                email: dbUser.EMAIL,
                senha_hash: dbUser.SENHA_HASH
            };

            const isValidPassword = bcrypt.compareSync(senha, user.senha_hash);

            if (!isValidPassword) {
                return null;
            }
            return user;
        } catch (error) {
            console.error("Error in AuthRepository.login:", error);
            throw error;
        }
    }
}

export default new AuthRepository();