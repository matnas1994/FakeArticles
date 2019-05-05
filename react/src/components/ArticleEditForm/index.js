import React, { Component } from 'react'
import { get, update } from '../../helpers/articlesApi'
import { Formik } from 'formik'
import { ErrorMsg, SubmitButton, TextInput, TextArea, Label } from '../../helpers/theme'
import { withRouter } from 'react-router-dom'
import * as _ from 'ramda'
import Loading from '../Loading'
import { CurrentUserConsumer } from '../../context/CurrentUser.context'
import { Redirect } from 'react-router-dom'
import $ from 'jquery'


class ArticleEditForm extends Component {
    state = {
        article: null,
        fetched: false,
        disabled: false
    }

    static defaultProps = {
        fetched: false,
        disabled: false
    }

    componentWillUnmount = () => {
        $("#articles").removeClass("active")
    }

    itemId = () => this.props.match.params.itemId

    componentDidMount = async () => {
        $("#articles").addClass("active")
        const article = await get(this.itemId())
        this.setState({ article, fetched: true })
    }

    render() {
        return (
            <div>
                {this.state.fetched
                    ?
                    <CurrentUserConsumer>
                        {({ user }) => (
                            <div>
                                {(user.id !== this.state.article.user.id) && <Redirect to={'/'} />}
                                <p>Edit form for {this.itemId()}</p>
                                <Formik
                                    initialValues={{ ...this.state.article }}
                                    onSubmit={(values) => {
                                        update(this.itemId(), { ...values })
                                        this.props.history.push('/')
                                    }}
                                    validate={(values) => {
                                        let errors = {}

                                        if (!values.title) {
                                            errors.title = "Required"
                                        } else if (values.title.length < 3) {
                                            errors.title = "Too short. Minium 3 characters..."
                                        } else if (values.title.includes('ass')) {
                                            errors.title = "Mind your language"
                                        }

                                        if (_.isEmpty(errors)) {
                                            this.setState({ disabled: false })
                                        } else {
                                            this.setState({ disabled: true })
                                        }

                                        return errors;
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
                                                <Label>
                                                    Title*
                                        <ErrorMsg>{errors.title}</ErrorMsg>
                                                    <TextInput name='title' onChange={handleChange} value={values.title} />
                                                </Label>
                                                <Label>
                                                    Body*
                                        <TextArea name='body' onChange={handleChange} value={values.body} />
                                                </Label>
                                                <SubmitButton type='submit' disabled={this.state.disabled}>Update</SubmitButton>
                                            </form>
                                        )}

                                />
                            </div>)}
                    </CurrentUserConsumer>
                    : <Loading />
                }

            </div>
        )
    }
}

export default withRouter(ArticleEditForm)