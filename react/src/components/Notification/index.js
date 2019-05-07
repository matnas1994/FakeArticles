import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const LinkToNotification = styled(Link)`
    &:hover{
        background-color:red;
    }
    p{
        color:white;
    }
`


export const Notification = ({notification}) =>
    <LinkToNotification to={`/articles/${notification.article.id}`}>
        <p>New comment! {notification.comment.created_at} </p>
        <p>Article: {notification.article.title}</p>
        <p>Content: {notification.comment.content}</p>
        <p>From: {notification.author.name}</p>
    </LinkToNotification>