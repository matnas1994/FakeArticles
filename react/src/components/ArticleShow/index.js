import React, { Component } from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { CurrentUserConsumer } from '../../context/CurrentUser.context'
import { Header } from '../../helpers/theme'
import logo from '../../images/pobrane.jpg'
import { get } from '../../helpers/articlesApi'
import { withRouter } from 'react-router-dom'
import Comments from '../Comments'
import Loading from '../Loading'
import $ from 'jquery'

const StyledLink = styled(Link)`
    color: #faf65a;
    text-decoration: none;
    margin-left: 5px;
    size: 20px;
    &:hover{
        color: #fff;
    }
`

const DestroyButton = styled.button`
    margin-top: 10px;
    font-family: 'Lobster', cursive;
    font-size: 20px;
    height:50px;
    background: #990000;
    border: none;
    &:hover{
        background: #4c0000;
        cursor: -webkit-grab; 
        cursor: grab;
    }
`

const StyledLogo = styled.img`
    border-radius: 8px;
    margin-right: 30px;
    width: 100% 
`

const PanelNewArticle = styled.div` 
    background-color: rgba(0,0,0,0.5);
    padding: 30px;
    width: 80%;
    margin: 20px auto; 
    overflow: hidden;
    text-overflow: ellipsis;
`

const TextArticle = styled.p`
    font-size: 25px;
`

class ArticleShow extends Component {

    state = {
        article: null
    }

    componentWillUnmount = () => {
        $("#articles").removeClass("active")
    }

    convertToHtml = (text) => {
        return { __html: text };
    }

    itemId = () => this.props.match.params.itemId

    destroy = () => {
        this.props.destroy(this.props.id)
    }

    componentDidMount = () => {
        $("#articles").addClass("active")
        get(this.itemId()).then(article => {
            this.setState({ article })
        }
        )
    }

    render() {
        const { article } = this.state
        return (
            <div>
                <div>
                    {article ?
                        <div>
                            <PanelNewArticle>
                                {article.image ? <StyledLogo src={article.image.url} alt="Logo" /> : <StyledLogo src={logo} alt="Logo" />}
                                <Header>{article.title}</Header>
                                <TextArticle dangerouslySetInnerHTML={this.convertToHtml(article.body)}></TextArticle>
                                <TextArticle>Author: {article.user.name}</TextArticle>
                                <CurrentUserConsumer>
                                    {({ user, isAdmin }) => (
                                        <div>
                                            {user ?
                                                <div>
                                                    {(user.id === article.user.id) || isAdmin ?
                                                        <div>
                                                            <DestroyButton onClick={this.destroy}><i className="fas fa-trash"></i></DestroyButton>
                                                            {(user.id === article.user.id) && <StyledLink to={`/articles/edit/${this.itemId()}`}> <i className="fas fa-edit"></i> edit</StyledLink>}
                                                        </div>
                                                        :
                                                        ""
                                                    }
                                                </div>
                                                : ''}
                                        </div>
                                    )}
                                </CurrentUserConsumer>
                            </PanelNewArticle>
                            <Comments comments={article.comments}/>
                        </div>
                        : <Loading />}
                </div>
            </div>
        )
    }

}

export default withRouter(ArticleShow)
