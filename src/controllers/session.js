import {serialize} from 'cookie'

const TOKEN_NAME = 'session'
const MAX_AGE = 60 * 60 * 24 // 24 hours

const Session = {
    add(req, res) {
        const {query} = req
        const { ssoToken: token } = query

        if (token) {
            const cookie = serialize(TOKEN_NAME, token, {
                maxAge: MAX_AGE,
                expires: new Date(Date.now() + MAX_AGE * 1000),
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                sameSite: 'lax'
            })

            res.setHeader('Set-Cookie', cookie)

            return res.redirect('https://sso-server.vercel.app')
        }

        return res.send({message: 'ok'})
    }
}

export default Session