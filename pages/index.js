import React from 'react'
import {parse} from 'cookie'

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

export const getServerSideProps = async ctx => {
    const {req, res} = ctx
    const {session} = parse(req.headers?.cookie || '')

    if (!session) {
        res.writeHead(303, {Location: 'https://sso-server.vercel.app/login?refid=consumer'})
        res.end()
    }

    if (req.uri.match(/refid/gi)) {
        await fetch('/api/session', {
            headers, method: 'POST',
            body: JSON.stringify({ssoToken: req.url.split('=')[1]})
        })
    }

    return {
        props: {}
    }
}

const Home = props => <div>
    {JSON.stringify(props)}
</div>

export default Home