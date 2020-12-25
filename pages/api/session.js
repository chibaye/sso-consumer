import cors from 'cors'
import nextConnect from 'next-connect'

import Session from '@/controllers/session'

const handler = nextConnect()

handler
    .use(cors({
        origin: '*',
        credentials: true,
        allowedHeaders: 'Origin, Content-Type, X-Auth-Token',
        methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS']
    }))
    .post(Session.add)

export default handler