import React, { Component } from 'react';
import styled from 'styled-components'
import { Comment } from '../Comment'
import { NewCommentForm } from '../NewCommentForm'
import * as _ from 'ramda'

const PanelNewArticle = styled.div` 
    background-color: rgba(0,0,0,0.5);
    padding: 30px;
    width: 80%;
    margin: 20px auto; 
    overflow: hidden;
    text-overflow: ellipsis;
`


class Comments extends Component {

    constructor(props) {
        super(props)
        this.state = {
            comments: this.props.comments,
            content: null
        }

        window.Echo.private('article.comment.' + this.props.article_id)
            .listen('CommentWasCreated', (e) => {
                this.setState({ comments: _.append(e.comment, this.state.comments) })
            });
    }

    componentWillUpdate() {
        window.Echo.leaveChannel('article.comment.' + this.props.article_id)
    }

    render() {
        const renderComments = this.state.comments.map(comment => {
            return <Comment key={comment.id} content={comment.content} author={comment.user.name} created_at={comment.created_at} />
        });

        return (
            <PanelNewArticle>
                <NewCommentForm article_id={this.props.article_id} />
                {renderComments}
            </PanelNewArticle>
        )
    }
}

export default Comments