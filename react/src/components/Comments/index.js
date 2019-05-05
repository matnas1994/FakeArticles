import React, { Component } from 'react';
import styled from 'styled-components'
import { Comment } from '../Comment'
import { NewCommentForm } from '../NewCommentForm'
import Echo from 'laravel-echo'
import Pusher from "pusher-js"

const PanelNewArticle = styled.div` 
    background-color: rgba(0,0,0,0.5);
    padding: 30px;
    width: 80%;
    margin: 20px auto; 
    overflow: hidden;
    text-overflow: ellipsis;
`
const OAUTH_CLIENT_ID = 2 // your backend client id
const OAUTH_CLIENT_SECRECT = '' // your backend client secret
const API_URL = 'http://localhost/' // your backend url
const LOGIN_URL = `${API_URL}oauth/token` // login url
const SOCKET_SERVER = 'http://127.0.0.1:6379' // your echo server address make your local IP address with port as we defined during installation

class Comments extends Component {

    state = {
        comments: [],
    }

    constructor() {
        super()

        window.io = require('socket.io-client');
        const client = require('pusher-js');

        window.Echo = new Echo({
            broadcaster: 'pusher',
            host: window.location.hostname + ':6001',
            key: '8ea7029ab8c20337babd0c4ec35d0bf2',
            cluster: 'eu',
            encrypted: true,
            client: client,
            auth: {
                headers: {
                  Authorization: `Bearer `+    localStorage.getItem('api_token'),
                  Accept: 'application/json',
            }}
        })

        window.Echo.private(`App.User.77`);
    }



    render() {
        const renderComments = this.props.comments.map(comment => {
            return <Comment key={comment.id} content={comment.content} author={comment.user.name} created_at={comment.created_at} />
        });

        return (
            <PanelNewArticle>
                <NewCommentForm />
                {renderComments}
            </PanelNewArticle>
        )
    }
}

export default Comments