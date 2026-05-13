import { Router } from "express"
import { JobController } from "../controllers/jobs.js"
import { validateJob, validatePartialJob } from "../schemas/jobs.js"

export const jobsRouter = Router()

function valdiateCreate (req, res, next) {
    const result = validateJob(req.body)
    if (!result.success){
        return res.status(400).json({ message: 'Req invalido', errors: result.error.errors})
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

function validatePartial (req, res, next) {
    const result = validatePartialJob(req.body)
    if (!result.success){
        return res.status(400).json({ message: 'Req invalido', errors: result.error.errors})
    }
    req.body = result.data
    return next()
}

jobsRouter.get('/', JobController.getAll)
jobsRouter.get('/:id', JobController.getId)
jobsRouter.post('/', valdiateCreate, JobController.create)
jobsRouter.delete('/:id', JobController.delete)
jobsRouter.put('/:id', validateUpdate, JobController.update)
jobsRouter.patch('/:id', validatePartial, JobController.partialUpdate)