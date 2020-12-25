import {serialize} from 'cookie'

const TOKEN_NAME = 'session'
const MAX_AGE = 60 * 60 * 24 // 24 hours

const redirect = res => res.redirect('https://sso-server.vercel.app')

const auth = async (req, res, next) => {
    const {query} = req
    const { ssoToken: token } = query

    if (!token || !req.cookies) return redirect(res)

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

        return redirect(res)
    }

    return next()
}

export default auth