import express from 'express'

const PORT = process.env.PORT ?? 1234
const app = express()

app.get('/', (request, response) => {
    return response.send('Hola, primer archivo de back')
})

app.get('/health', (request, respone)=>{
    return respone.json({
        status: 'ok',
        uptime: process.uptime()
    })
})

app.listen(PORT, ()=>{
    console.log(`Servidor inicalizado en el puerto http://localhost:${PORT}`)
})