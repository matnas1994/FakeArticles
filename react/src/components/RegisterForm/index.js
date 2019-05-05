import React, { Component } from 'react'
import { Formik } from 'formik'
import { ErrorMsg, LoginButton, TextInput, Header , Panel, InputContainer, Icon}  from '../../helpers/theme'
import { register } from '../../helpers/AuthApi'
import { CurrentUserConsumer } from '../../context/CurrentUser.context'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import $ from 'jquery'


export const LoginA = styled.a` 
    color:white;
`


class RegisterForm extends Component {

    state = {
        errors: null
    }

    componentDidMount = () => {
        $( "#register" ).addClass( "active")
    }

    componentWillUnmount = () =>{
        $( "#register" ).removeClass( "active")
    }

    render() {
        return (
            <CurrentUserConsumer>
                {({ setUser, user }) => (
                    <Panel>
                        {user && <Redirect to={'/'} />}
                        <Header>CREATE ACCOUNT</Header>
                        <Formik
                            onSubmit={(values, { setSubmitting, setErrors }) => {
                                register(values).then((response) => {
                                    if (response.user) {
                                        localStorage.setItem('api_token', response.user.api_token)
                                        setUser(response.user)
                                        user = response.user
                                        this.props.history.push({ pathname: '/' })
                                    } else {
                                        setSubmitting(false)
                                        setErrors(response)
                                    }
                                }).catch((error) => console.log(error))
                            }}

                            validate={(values) => {
                                let errors = {}
                                if (!values.name) {
                                    errors.name = "Required"
                                }

                                return errors;
                            }}

                            render={({
                                values,
                                errors,
                                touched,
                                handlerblur,
                                handleChange,
                                handleSubmit,
                                isSubmitting = true

                            }) => (
                                    <form onSubmit={handleSubmit}>
                                         <ErrorMsg>{errors.name}</ErrorMsg>
                                        <InputContainer>
                                            <Icon className="fas fa-user"></Icon>
                                            <TextInput name="name" placeholder="Name" onChange={handleChange} value={values.name || ""} />
                                        </InputContainer>
                                        <ErrorMsg>{errors.email}</ErrorMsg>
                                        <InputContainer>
                                            <Icon className="fas fa-envelope"></Icon>
                                            <TextInput name="email" type="email" placeholder="Email" onChange={handleChange} value={values.email || ""} />
                                        </InputContainer>
                                        <ErrorMsg>{errors.password}</ErrorMsg>
                                        <InputContainer>
                                            <Icon className="fas fa-lock"></Icon>
                                            <TextInput name="password" type="password" placeholder="Password" onChange={handleChange} value={values.password || ""} />
                                        </InputContainer>
                                        <InputContainer>
                                            <Icon className="fas fa-lock"></Icon>
                                            <TextInput name="password_confirmation" type="password" placeholder="Confirm password" onChange={handleChange} value={values.password_confirmation || ""} />
                                        </InputContainer>
                                        <LoginButton type='submit'> {isSubmitting ? 'Loading' : 'Sign Up'}</LoginButton>
                                    </form>
                                )
                            }
                        />
                    </Panel>)}
            </CurrentUserConsumer>
        )
    }
}

export default RegisterForm