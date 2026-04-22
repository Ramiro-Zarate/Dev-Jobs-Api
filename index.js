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

app.get('/get-jobs', (req, res)=>{
    const {limit, text, offset, id, titulo, empresa, ubicacion, descripcion, technology, modalidad, nivel, content, responsabilities, rquierements, about} = req.query
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
    return res.json(filteredJobs)
})

app.listen(PORT, ()=>{
    console.log(`Servidor inicalizado en el puerto http://localhost:${PORT}`)
})