import React from 'react';
import logo from '../../images/photo.jpg'
import styled from 'styled-components'

const UserImg = styled.img`
    border-radius: 50%;
    float: left;
    margin: 10px 10px;
    width: 48px;
`

const CommentDiv = styled.div`

`

const CommentText = styled.p`
    font-family: 'Lobster', cursive;
    font-size: 15px;
    text-align: left;
`

const AutorText = styled.p`
    font-family: 'Lobster', cursive;
    font-size: 20px;
    margin-bottom:0px;
    text-align: left;
`
const DateText = styled.p`
    font-family: 'Lobster', cursive;
    font-size: 10px;
    margin-bottom:2px;
    margin-top:0px;
    text-align: left;
`
export const Comment = ({content, author, created_at}) =>
    <CommentDiv>
        <UserImg src={logo} alt="Logo" />
        <AutorText>{author}</AutorText> <DateText>{created_at}</DateText>
        <CommentText>{content}</CommentText>
    </CommentDiv>