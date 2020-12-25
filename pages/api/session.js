import cors from 'cors'
import nextConnect from 'next-connect'

import Session from '@/controllers/session'

const handler = nextConnect()

handler
    .use(cors())
    .post(Session.add)

export default handler