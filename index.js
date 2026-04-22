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
    return res.json(jobs)
})

app.listen(PORT, ()=>{
    console.log(`Servidor inicalizado en el puerto http://localhost:${PORT}`)
})