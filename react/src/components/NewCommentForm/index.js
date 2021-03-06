import React from 'react';
import logo from '../../images/photo.jpg'
import styled from 'styled-components'
import { Formik } from 'formik'
import { create } from '../../helpers/CommentApi'

const UserImg = styled.img`
    border-radius: 50%;
    float: left;
    width: 50px;
`
const InputComment = styled.input`
    font-family: 'Lobster', cursive;
    font-size: 20px;
    background-color: transparent;
    width: 100%;
    border:none;
    border-bottom: 5px solid white;
    color: white;
`
const ButtonComment = styled.button`
    background-color: transparent;
    border: none;
    float: right;
    color:#008a00;
    &:hover{
        cursor: pointer;
        color: #006400;
    }
    i{
        font-size: 50px;
    }
`

export const NewCommentForm = (article_id) => <Formik
    onSubmit={(values, {resetForm}) => {
            create(article_id.article_id,{"content" : values.content}).then(response =>{
                alert("You add comment");
                 resetForm({})
            }
        )
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
                <div className="row">
                    <div className="col-sm-1" >
                        <UserImg src={logo} alt="Logo" />
                    </div>
                    <div className="col-sm-10" >
                        <InputComment name="content" onChange={handleChange} value={values.content || ''} placeholder="Add comment" />
                    </div>
                    <div className="col-sm-1"><ButtonComment type='submit'><i className="fas fa-plus-circle"></i></ButtonComment></div>
                </div> </form>
        )} />