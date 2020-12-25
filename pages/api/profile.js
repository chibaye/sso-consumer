import nextConnect from 'next-connect'

import auth from '@/helpers/auth'
import Profile from '@/controllers/profile'

const handler = nextConnect()

handler
    .use(auth)
    .get(Profile.list)

export default handler