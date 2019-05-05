import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { verify } from '../../helpers/AuthApi'
import { ErrorMsg, SuccessMsg } from '../../helpers/theme'


class Verfication extends Component {
    state = {
        response: null
    }

    token = () => this.props.match.params.token

    componentDidMount = async () => {
        const response = await verify(this.token())
        this.setState({ response })
    }

    render() {
        return (
            <div>
                {this.state.response ?
                    <div>
                        <SuccessMsg>{this.state.response.success}</SuccessMsg>
                        <ErrorMsg>{this.state.response.error} </ErrorMsg>
                        Click here to <Link to={'/login'}>log in.</Link>
                    </div>
                    : 'Loading...'}
            </div>
        )
    }
}

export default withRouter(Verfication)