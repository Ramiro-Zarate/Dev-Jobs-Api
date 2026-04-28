import express from 'express'
import { corsMidelware } from './midelwares/cors.js'
import {jobsRouter} from './routes/jobs.js'
import { DEFAULTS } from './config.js'

const PORT = process.env.PORT ?? DEFAULTS.PORT
const app = express()

app.use(corsMidelware())
app.use(express.json()) // Midelware que parsea peticiones POST, detecta si tiene la cabecera del json

app.use('/jobs', jobsRouter)

if (procces.env.NODE_ENV !== 'production'){
    app.listen(PORT, ()=>{
    console.log(`Servidor inicalizado en el puerto http://localhost:${PORT}`)
})
}



export default app 