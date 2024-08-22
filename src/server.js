const { randomUUID } = require("crypto");

const Banco = require('./banco2')

const express = require("express")

const PORT = 3333;

const app = express()

app.use(express.json())

const banco = new Banco()

app.get("/projetos", async (request, response) => {

    const { id } = request.query

    const projects = await banco.listar()

    console.log(projects)

    if (id) {
        const project = projects.filter(data => data.id == id)

        return response.json(project)
    }

    return response.json(projects)
})

app.post("/projetos", (request, response) => {

    const { title, description } = request.body

    const uuid = randomUUID()

    const project = {
        uuid,
        title,
        description
    }

    banco.inserir(project)

    return response.json(project)
})

app.put("/projetos/:id", (request, response) => {

    const { id } = request.params

    const { title, description } = request.body

    const index = projects.findIndex(data => data.id == id)

    if (index < 0)
        return response.status(400).json({ message: "Projeto not found" })

    const project = {
        id,
        title,
        description
    }

    projects[index] = project

    return response.json()
})

app.delete("/projetos/:id", (request, response) => {

    const { id } = request.params

    const index = projects.findIndex(data => data.id == id)

    if (index < 0)
        return response.status(400).json({ message: "Projeto not found" })

    projects.splice(index, 1)

    return response.json()
})

app.listen(PORT, () => {
    console.log(`Running Server on port ${PORT}`)
})