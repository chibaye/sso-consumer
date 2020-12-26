import React from 'react'
import {parse, serialize} from 'cookie'

const TOKEN_NAME = 'session'
const MAX_AGE = 60 * 60 * 24 // 24 hours

export const getServerSideProps = async ctx => {
    const {req, res} = ctx
    const {session} = parse(req.headers?.cookie || '')

    const url = req.url || ''
    let hasAuth = !!session

    if (url.match(/ssoToken/gi) && !session) {
        const {ssoToken} = parse(url.slice(2))

        const cookie = serialize(TOKEN_NAME, ssoToken, {
            maxAge: MAX_AGE,
            expires: new Date(Date.now() + MAX_AGE * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            sameSite: 'lax'
        })

        res.setHeader('Set-Cookie', cookie)
        hasAuth = true
    }

    if (!hasAuth) {
        res.writeHead(303, {Location: 'https://sso-server.vercel.app/login?refid=consumer'})
        res.end()
    }


    return {
        props: {}
    }
}

const Home = () => <div>
    <h1>Secure page for the SSO Consumer app</h1>
    <a href='https://sso-server.vercel.app'>Go to the Server app</a>
</div>

export default Home