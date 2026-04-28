import { Router } from "express"
import { JobController } from "../controllers/jobs.js"
import { validateJob, validatePartialJob } from "../schemas/jobs.js"

export const jobsRouter = Router()

function valdiateCreate (req, res, next) {
    const result = validateJob(req.body)
    if (!result.success){
        return res.status(400).json({ error: 'Req invalido', details: result.error.errors})
    }
    req.body = result.data
    return next()
}

function validateUpdate (req, res, next) {
    const result = validateJob(req.body)
    if (!result.success){
        return res.status(400).json({ error: JSON.parse(result.error.message)})
    }
    req.body = result.data
    return next()
}

jobsRouter.get('/', JobController.getAll)
jobsRouter.get('/:id', JobController.getId)
// Crear un nuevo recurso
jobsRouter.post('/', JobController.create)
// Eliminar un recurso
jobsRouter.delete('/:id', JobController.delete)
// Reemplazar un recurso completo
jobsRouter.put('/:id', JobController.update)
// Actualizar parcialmente un recurso
jobsRouter.patch('/:id', JobController.partialUpdate)