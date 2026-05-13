import { JobModel } from "../models/jobs.js"
import { DEFAULTS } from "../config.js"

export class JobController{
    static async getAll(req, res){
        const {
        limit = DEFAULTS.LIMIT_PAGINATION,
        offset = DEFAULTS.LIMIT_OFFSET,
        text, title, level, technology, location} = req.query

        const {jobs, total} = await JobModel.getAll({text, title, level, limit, technology, offset, location})
            
        return res.json({
            data: jobs,
            total: total
            })
    }

    static async getId(req, res){
        const {id} = req.params

        const job = await JobModel.getById(id)

        if (!job) {
            return res.status(404).json({error: 'Job not found'})
        }

        return res.json(job)
    }

    static async create(req, res){
        const {titulo, empresa, ubicacion, data} = req.body

        const newJob = await JobModel.create({titulo, empresa, ubicacion, data})

        return res.status(201).json(newJob)
    }

    static async update(req, res){
        const {id} = req.params
        const data = req.body

        const updatedJob = await JobModel.update(id, data)

        if (!updatedJob) {
            return res.status(404).json({error: 'Job not found'})
        }

        return res.json(updatedJob)
    }

    static async partialUpdate(req, res){
        const {id} = req.params
        const data = req.body

        const updatedJob = await JobModel.partialUpdate(id, data)

        if (!updatedJob) {
            return res.status(404).json({error: 'Job not found'})
        }

        return res.json(updatedJob)
    }

    static async delete(req, res){
        const {id} = req.params

        const deleted = await JobModel.delete(id)

        if (!deleted) {
            return res.status(404).json({error: 'Job not found'})
        }

        return res.status(204).send()
    }
}