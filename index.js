app.use((req, res, next)=>{
    const timeString = new Date().toLocaleDateString()
    console.log(`[${timeString}] ${req.method} ${req.url}`)
    next()
})

app.get('/', (req, res) => {
    return res.send('Hola, primer archivo de back')
})

app.get('/health', (req, res)=>{
    return res.json({
        status: 'ok',
        uptime: process.uptime()
    })
})

// CRUD: Create, Read, Update, Delete



