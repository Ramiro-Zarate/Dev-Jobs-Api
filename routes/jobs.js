import { Router } from "express"
import { JobController } from "../controllers/jobs.js"

export const jobsRouter = Router()

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