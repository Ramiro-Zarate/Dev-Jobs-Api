import { JobModel } from "../models/jobs.js"
import { DEFAULTS } from "../config.js"

export class JobController{
    static async getAll(req, res){
        const {
        limit = DEFAULTS.LIMIT_PAGINATION,
        offset = DEFAULTS.LIMIT_OFFSET,
        text, title, level, technology} = req.query

        const {jobs, total} = await JobModel.getAll({text, title, level, limit, technology, offset})
            
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
    }

    static async partialUpdate(req, res){

    }

    static async delete(req, res){

    }
}