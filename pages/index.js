import React from 'react'
import {parse} from 'cookie'

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

export const getServerSideProps = async ctx => {
    const {req, res} = ctx
    const {session} = parse(req.headers?.cookie || '')

    const url = req.url || ''

    if (url.match(/ssoToken/gi)) {
        const resp = await fetch('https://sso-consumer.herokuapp.com/api/session', {
            headers, method: 'POST',
            withCredential: true,
            body: JSON.stringify({ssoToken: url.split('ssoToken=')[1]})
        })

        console.log({resp})

        if (resp.ok) {
            const data = await resp.json()
            console.log({data})
        }
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