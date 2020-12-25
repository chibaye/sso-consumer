import React from 'react'
import {parse} from 'cookie'

export const getServerSideProps = async ctx => {
    const {req, res} = ctx
    const {session} = parse(req.headers?.cookie || '')

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