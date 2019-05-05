import React, { Component } from 'react'
import { Formik } from 'formik'
import { ErrorMsg, LoginButton, TextInput, Header , Panel, InputContainer, Icon}  from '../../helpers/theme'
import { Redirect } from 'react-router-dom'
import { CurrentUserConsumer } from '../../context/CurrentUser.context'
import Loading from '../../components/Loading'
import { FacebookLoginButton } from "react-social-login-buttons";
import styled from 'styled-components'
import $ from 'jquery'

export const LoginHr = styled.hr` 
    border: 3px solid rgba(0,0,0,0.6);
`
export const LoginA = styled.a` 
    color:white;
`

class LoginForm extends Component {

    componentDidMount = () => {
        $( "#login" ).addClass( "active")
    }

    componentWillUnmount = () =>{
        $( "#login" ).removeClass( "active")
    }
    
    render() {
        const { from } = this.props.location.state || { from: { pathname: "/" } }

        return (
            <CurrentUserConsumer>
                {({ user, login, fbLogin, processing, error }) => (
                    <div>
                        {user && <Redirect to={from} />}
                        <Panel>
                            <Header>SING IN</Header>
                            <Formik
                                onSubmit={async (values, { setSubmitting }) => {
                                    await login(values)
                                    setSubmitting(false)
                                }}
                                render={({
                                    values,
                                    errors,
                                    touched,
                                    handleBlur,
                                    handleChange,
                                    handleSubmit,
                                    isSubmitting
                                }) => (
                                        <form onSubmit={handleSubmit}>
                                            <InputContainer>
                                                <Icon className="fas fa-user"></Icon>
                                                <TextInput name='email' onChange={handleChange} placeholder="Email" value={values.email || ''} />
                                            </InputContainer>
                                            <InputContainer>
                                                <Icon className="fas fa-lock"></Icon>
                                                <TextInput name='password' type="password" placeholder="Password" onChange={handleChange} />
                                            </InputContainer>
                                            <ErrorMsg>{error}</ErrorMsg>
                                            {isSubmitting ? <Loading /> :
                                                <LoginButton className="btn" type='submit'>Login</LoginButton>
                                            }
                                            <LoginA href={`/password_reset`}>Forgot password?</LoginA>
                                            <LoginHr/>
                                            <FacebookLoginButton onClick={fbLogin}/>
                                        </form>
                                    )}     
                            />
                        </Panel>
                    </div>
                )}
            </CurrentUserConsumer>
        )
    }

}

export default LoginForm