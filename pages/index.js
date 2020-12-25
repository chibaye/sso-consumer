import React from 'react'

export const getStaticProps = async () => {
    const resp = await fetch('https://sso-consumer.herokuapp.com/api/profile')
    const props = await resp.json()

    return {
        props
    }
}

const Home = props => <div>
    {JSON.stringify(props)}
</div>

export default Home