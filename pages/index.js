import React from 'react'
import {parse} from 'cookie'

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

export const getServerSideProps = async ctx => {
    const {req, res} = ctx
    const {session} = parse(req.headers?.cookie || '')

    const uri = req.uri || ''

    if (uri.match(/ssoToken/gi)) {
        await fetch('/api/session', {
            headers, method: 'POST',
            withCredential: true,
            body: JSON.stringify({ssoToken: uri.split('ssoToken=')[1]})
        })
    }

    if (!session) {
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