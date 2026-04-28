import * as z from 'zod'

const JobSchema = z.object({
    titulo: z.string().min(3).max(100),
    empresa: z.string().min(3).max(100),
    ubicacion: z.string().lowercase(),
    descripcion: z.string().optional(),
    data: z.object({
        technology: z.string().lowercase(),
        modalidad: z.string(),
        nivel: z.string()
    })
})

export function validateJob (input) {
    return JobSchema.safeParse(input)
}

export function validatePartialJob (input) {
    return JobSchema.partial().safeParse(input)
}