import express from 'express'
import jobs from './jobs.json' with {type: 'json'} // with type requerido pq por default no puede importar archivos y leerlos como json por seguridad

const PORT = process.env.PORT ?? 1234
const app = express()

app.get('/', (req, res) => {
    return res.send('Hola, primer archivo de back')
})

app.get('/health', (req, res)=>{
    return res.json({
        status: 'ok',
        uptime: process.uptime()
    })
})

app.get('/jobs', (req, res)=>{
    const {limit = 10, offset = 0, text, id, titulo, empresa, ubicacion, descripcion, technology, modalidad, nivel, content, responsabilities, rquierements, about} = req.query
    let filteredJobs = jobs
    

    if (text) {
        const searchTerm = text.toLowerCase()
        filteredJobs = filteredJobs.filter(job=>
            job.titulo.toLocaleLowerCase().includes(searchTerm) || job.descripcion.toLocaleLowerCase().includes(searchTerm)
        )
    }

    if (technology) {
        const searchTerm = technology.toLocaleLowerCase()
        filteredJobs = filteredJobs.filter(job=>
            job.technology.toLocaleLowerCase().includes(searchTerm)
        )
    }

    const limitNumber = Number(limit)
    const limitOffset = Number(offset)

    const paginatedJobs = (limitOffset, limitOffset + limitNumber)

    return res.json(paginatedJobs)
})

app.get('/jobs/:id', (req, res)=>{
    const {id} = req.params

    const idNumber = Number(id)

    return res.json({
        job: {id: idNumber, title: `Job with id ${id}`}
    })
})

// Crear un nuevo recurso
app.post('/jobs', (req, res)=>{

})

// Eliminar un recurso
app.delete('/jobs/:id', (req, res)=>{

})

// Reemplazar un recurso completo
app.put('/jobs/:id', (req, res)=>{
    
})

// Actualizar parcialmente un recurso
app.patch('/jobs/:id', (req, res)=>{
    
})

app.listen(PORT, ()=>{
    console.log(`Servidor inicalizado en el puerto http://localhost:${PORT}`)
})