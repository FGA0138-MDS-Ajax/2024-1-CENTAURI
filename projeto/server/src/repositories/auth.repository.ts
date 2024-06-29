import {mysqlConn} from '../base/mysql';
import ScrapingRepository from '../repositories/scraping.repository';
import { type CreateUsuarioInput } from '../schemas/auth.schema';

class AuthRepository {
    async registerUser(user: CreateUsuarioInput){
        const conn = await mysqlConn.getConnection();
        const [result] = await conn.query(
            'INSERT INTO usuarios (nome, email, time_favorito, senha) VALUES (?, ?, ?, ?)',
            [user.nome, user.email, user.time_favorito, user.senha]
        );
        return result;
    }
}

export default new AuthRepository();