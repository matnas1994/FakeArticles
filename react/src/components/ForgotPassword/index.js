import React, { Component } from 'react'
import { Formik } from 'formik'
import { ErrorMsg, LoginButton, TextInput, Header , Panel, InputContainer, Icon, Text}  from '../../helpers/theme'
import {forgotPassword} from '../../helpers/AuthApi'

class ForgotPassword extends Component {
    state = {
        success: null
    }
    render() {
        return (
            <Panel>
                <Header>Reset your password</Header>
                <Formik
                    onSubmit={(values, { setSubmitting, setErrors }) => {
                        forgotPassword(values).then(response => {
                            if(response.success){
                                this.setState({success: response.success})
                            }else{
                                setErrors(response)
                            }
                        })
                        .catch(error => console.log(error) )
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
                                 {this.state.success?<Text>Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.</Text>:
                                    <div>
                                         <Text>Enter your email address and we will send you a link to reset your password.</Text>
                                         <InputContainer>
                                            <Icon className="fas fa-envelope"></Icon>
                                            <TextInput name='email' type="email" placeholder="Email" onChange={handleChange} value={values.email || ''} />
                                        </InputContainer>
                                        <ErrorMsg>{errors.email}</ErrorMsg>
                                        <LoginButton type='submit'>Send password reset email</LoginButton>
                                    </div>
                                 }
                            </form>
                        )}
                />
            </Panel>
        )
    }
}

export default ForgotPassword