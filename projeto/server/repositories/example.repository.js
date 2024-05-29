const mysql = require('../base/mysql');

class exampleRepository {
    async getExamples(){
        const [rows] = await mysql.query('SELECT exampleID, example FROM example');
        return rows;
    }

    async postExample(example){
        if (typeof example === 'undefined') {
            throw new Error('Example is undefined');
        }

        const [result] = await mysql.execute('INSERT INTO example (exampleID, example) VALUES (NULL, ?)', [example]);
        return result;
    }
}

module.exports = new exampleRepository();