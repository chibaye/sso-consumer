import cors from 'cors'
import nextConnect from 'next-connect'

import Session from '@/controllers/session'

const handler = nextConnect()

handler
    .use(cors({
        origin: '*',
        credentials: true,
        methods: ['GET', 'POST']
    }))
    .post(Session.add)

export default handler