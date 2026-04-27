import jobs from '../jobs.json' with {type: 'json'} // with type requerido pq por default no puede importar archivos y leerlos como json por seguridad
import { DEFAULTS } from '../config.js'

export class JobModel {
    static async getAll ({limit = DEFAULTS.LIMIT_PAGINATION,
        offset = DEFAULTS.LIMIT_OFFSET,
        text, id, titulo, empresa, location, descripcion, technology, modalidad, level, content, responsabilities, rquierements,
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
                job.data.technology.includes(searchTerm)
            )
        }

        if (location) {
            const searchTerm = location.toLocaleLowerCase()
            filteredJobs = filteredJobs.filter(job=>{
                const matchUbicacion = job.ubicacion?.toLowerCase().includes(searchTerm)
                const matchModalidad = job.data?.modalidad?.toLowerCase().includes(searchTerm)
                return matchUbicacion || matchModalidad}
            )
        }

        if (level) {
            const searchTerm = level.toLocaleLowerCase()
            filteredJobs = filteredJobs.filter(job=>
                job.data.nivel.includes(searchTerm)
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