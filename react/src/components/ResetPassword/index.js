import React, { Component } from 'react'
import { Formik } from 'formik'
import { ErrorMsg, LoginButton, TextInput, Header , Panel, InputContainer, Icon, Text}  from '../../helpers/theme'
import {resetPassword} from '../../helpers/AuthApi'

class ResetPassword extends Component {
    state = {
        success: null
    }
    render() {
        return (
            <Panel>
                <Header>Change password</Header>
                <Formik
                    onSubmit={(values, { setSubmitting, setErrors }) => {
                        resetPassword(values).then(response => {
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
                        isSubmitting,
                        setFieldValue 
                    }) => (
                            <form onSubmit={handleSubmit}>
                                 {this.state.success?<Text>New password set successfully.</Text>:
                                    <div>
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
                                        <LoginButton type='submit' onClick={() => {setFieldValue("token", this.props.match.params.token); }} >Change password</LoginButton>
                                    </div>
                                 }
                            </form>
                        )}
                />
            </Panel>
        )
    }
}

export default ResetPassword