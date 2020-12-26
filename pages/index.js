import React from 'react'
import {parse} from 'cookie'

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://sso-consumer.herokuapp.com'

export const getServerSideProps = async ctx => {
    const {req, res} = ctx
    const {session} = parse(req.headers?.cookie || '')

    const url = req.url || ''
    let hasAuth = !!session

    if (url.match(/ssoToken/gi) && !session) {

        const resp = await fetch(`${BASE_URL}/api/session`, {
            headers, method: 'POST',
            withCredential: true,
            body: JSON.stringify({token: url.split('ssoToken=')[1]})
        })

        if (resp.ok) {
            const data = await resp.json()
            hasAuth = !!data.session
        }
    }

    if (!hasAuth) {
        res.writeHead(303, {Location: 'https://sso-server.vercel.app/login?refid=consumer'})
        res.end()
    }

    return {
        props: {}
    }
}

const Home = props => <div>
    {JSON.stringify(props)}
</div>

export default Home