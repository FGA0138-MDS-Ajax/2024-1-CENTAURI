import {mysqlConn} from '../base/mysql';
import ScrapingRepository from '../repositories/scraping.repository';
import { type CreateUsuarioInput } from '../schemas/auth.schema';
import bcrypt from 'bcrypt';

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
    async getFavoritoByUser(email: string){
        const conn = await mysqlConn.getConnection();
        const [result] = await conn.query(
            'SELECT time_favorito FROM USUARIO WHERE email = ?',
            [email]
        );
        return result;
    }

    async login(email: string, senha: string){
        const conn = await mysqlConn.getConnection();
        const [results] = await conn.query(
            'SELECT * FROM USUARIO WHERE email = ? AND senha_hash = ?',
            [email, senha]
        );
        return results;
    }
}

export default new AuthRepository();