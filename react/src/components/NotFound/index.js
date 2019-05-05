import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {  Panel , Header}  from '../../helpers/theme'
class NotFound extends Component {
    state = {
        counter: 10
    }

    componentDidMount = () => {
        const intervalId = setInterval(this.countdown, 1000)
        this.setState({ intervalId })
    }

    countdown = () => this.setState({ counter: this.state.counter - 1 })

    componentWillUnmount = () => clearInterval(this.state.intervalId)

    render() {
        const { location } = this.props
        const { counter } = this.state
        return (
            <Panel>
                <Header>No match for <code>{location.pathname}</code></Header>
                <Header>Redirect to homepage in {counter} seconds</Header>
                {counter === 0 && <Redirect to='/' />}
            </Panel>
        )
    }
}

export default NotFound