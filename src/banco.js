const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')

class Banco {

    constructor() {
        // this.banco = new sqlite3.Database('./database.db');
        this.criarBanco();
    }

    async sqliteConnection() {
        // const database = sqlite3.open('./database.db')

        const database = await sqlite.open({
            filename: "database.db",
            driver: sqlite3.Database
        })

        return database;
    }

    async criarBanco() {
        const banco = await this.sqliteConnection()
        const createAlunos = `
           CREATE TABLE IF NOT EXISTS projetos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title VARCHAR,
            description VARCHAR,
            uuid VARCHAR
        )`;
        banco.exec(createAlunos)
    }

    async inserir(project) {
        const { uuid, title, description } = project

        const banco = await this.sqliteConnection()

        banco.run("INSERT INTO projetos (title,description,uuid) VALUES (? ,? ,?)", [title, description, uuid])
    }

    async remover(id) {

        console.log(id)

        const banco = await this.sqliteConnection()

        banco.run("DELETE FROM projetos WHERE id=?", [id])

    }

    async listar() {

        const banco = await this.sqliteConnection()

        const alunos = await banco.all("SELECT * FROM projetos")

        return alunos
    }

}

module.exports = Banco;
