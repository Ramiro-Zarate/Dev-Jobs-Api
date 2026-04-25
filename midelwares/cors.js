import cors from 'cors'

const ACCEPTED_ORIGINS = [
    'http://localhost:5173'
]

export const corsMidelware = ({acceptedOrigins = ACCEPTED_ORIGINS} = {}) =>{
    return cors({
        origin: (origin, callback) => {
            if (acceptedOrigins.includes(origin) || !origin) {
                return callback(null, true)
            }
            return callback(new Error('El callback no esta permitido'))
        }
    })

}
