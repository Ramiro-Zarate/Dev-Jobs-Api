import jobs from '../jobs.json' with {type: 'json'} // with type requerido pq por default no puede importar archivos y leerlos como json por seguridad
import { DEFAULTS } from '../config.js'

export class JobModel {
    static async getAll ({limit = DEFAULTS.LIMIT_PAGINATION,
        offset = DEFAULTS.LIMIT_OFFSET,
        text, id, titulo, empresa, ubicacion, descripcion, technology, modalidad, nivel, content, responsabilities, rquierements,
        about}){
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

        const totalJobs = filteredJobs.length

        const limitNumber = Number(limit)
        const offsetNumber = Number(offset)

        const paginatedJobs = filteredJobs.slice(offsetNumber, offsetNumber + limitNumber)

        return {
            jobs: paginatedJobs,
            total: totalJobs
        }
    }

    static async getById(id){
        const foundJob = jobs.find(job => job.id === id)
        return foundJob
    }

    static async create({titulo, empresa, ubicacion, data}){
        const newJob = {
            id: crypto.randomUUID(),
            titulo, 
            empresa, 
            ubicacion,
            data
        }

        jobs.push(newJob)

        return newJob
    }
}