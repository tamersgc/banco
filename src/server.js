const { randomUUID } = require("crypto");

const Banco = require('./banco')

const express = require("express")

//So para o front
const cors =  require("cors")

const PORT = 3333;

const app = express()

////So para o front
app.use(cors())

app.use(express.json())

const banco = new Banco()

app.get("/alunos", async (request, response) => {

    const { id } = request.query

    const alunos = await banco.listar()

    if (id) {
        const aluno = alunos.filter(data => data.id == id)

        return response.json(aluno)
    }

    return response.json(alunos)
})

app.post("/alunos", (request, response) => {

    const { nome, email } = request.body

    const uuid = randomUUID()

    const aluno = {
        uuid,
        nome,
        email
    }

    banco.inserir(aluno)

    return response.json(aluno)
})

app.put("/alunos/:id", async (request, response) => {

    const { id } = request.params

    const { nome, email } = request.body

    const aluno = {
        id,
        nome,
        email
    }

    const result = await banco.buscar(id)

    if(!result)
        return response.status(400).json({ message: "Aluno not found" })

    banco.atualizar(aluno)

    return response.json()
})

app.delete("/alunos/:id", async (request, response) => {

    const { id } = request.params

    const aluno = await banco.buscar(id)

    if(!aluno)
        return response.status(400).json({ message: "Aluno not found" })

    banco.remover(id)

    return response.json()
})

app.listen(PORT, () => {
    console.log(`Running Server on port ${PORT}`)
})