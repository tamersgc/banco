const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')

class Banco {

    constructor() {
        this.criarBanco();
    }

    async sqliteConnection() {
        const database = await sqlite.open({
            filename: "database.db",
            driver: sqlite3.Database
        })

        return database;
    }

    async criarBanco() {
        const banco = await this.sqliteConnection()
        const createAlunos = `
           CREATE TABLE IF NOT EXISTS alunos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome VARCHAR,
            email VARCHAR,
            uuid VARCHAR
        )`;
        banco.exec(createAlunos)
    }

    async inserir(aluno) {
        const { uuid, nome, email } = aluno

        const banco = await this.sqliteConnection()

        banco.run("INSERT INTO alunos (nome,email,uuid) VALUES (? ,? ,?)", [nome, email, uuid])
    }

    async atualizar(aluno) {
        const { id, nome, email } = aluno

        const banco = await this.sqliteConnection()

        banco.run("UPDATE alunos SET nome=?, email=? WHERE id=?", [nome, email, id])
    }

    async remover(id) {

        console.log(id)

        const banco = await this.sqliteConnection()

        banco.run("DELETE FROM alunos WHERE id=?", [id])

    }

    async listar() {

        const banco = await this.sqliteConnection()

        const alunos = await banco.all("SELECT * FROM alunos")

        return alunos
    }

    async buscar(id) {

        const banco = await this.sqliteConnection()

        const aluno = await banco.get("SELECT * FROM alunos WHERE id=?",id)

        return aluno
    }

}

module.exports = Banco;
