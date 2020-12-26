import {parse, serialize} from 'cookie'

const TOKEN_NAME = 'session'
const MAX_AGE = 60 * 60 * 24 // 24 hours

const Session = {
    add(req, res) {
        const { token } = req.body

        if (!token) return res.status(422).send({error: 'Token Empty'})

        const cookie = serialize(TOKEN_NAME, token, {
            maxAge: MAX_AGE,
            expires: new Date(Date.now() + MAX_AGE * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            sameSite: 'lax'
        })

        res.setHeader('Set-Cookie', cookie)

        return res.send(parse(cookie))
    }
}

export default Session