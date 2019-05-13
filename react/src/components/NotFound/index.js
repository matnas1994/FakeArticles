import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Panel, Header } from '../../helpers/theme'

const NotFound = ({ location }) => {
    const [counter, setCounter] = useState(10)
    const countdown = () => setCounter(counter - 1)
    useEffect(() => {
        const id = setInterval(countdown, 1000)
        return () =>  clearTimeout(id)
    }, [counter])
    return (
        <Panel>
            <Header>No match for <code>{location.pathname}</code></Header>
            <Header>Redirect to homepage in {counter} seconds</Header>
            {counter === 0 && <Redirect to='/' />}
        </Panel>
    )
}
export default NotFound