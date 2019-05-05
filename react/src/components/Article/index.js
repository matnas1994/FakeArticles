import React, { Component } from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Header, PanelArticle } from '../../helpers/theme'
import logo from '../../images/pobrane.jpg'
import Truncate from 'react-truncate-html';


const StyledLogo = styled.img`
    border-radius: 8px;
    margin-right: 30px;
    width: 310px;
    float: left;
`

const HeaderArticle = styled(Header)`
  font-size: 20px;
`


class Article extends Component {

    destroy = () => {
        this.props.destroy(this.props.id)
    }

    convertToHtml = (text) => {
        return { __html: text };
    }

    componentDidMount() {
        console.log(this.convertToHtml(this.props.body).__html)
    }

    render() {
        return (
            <PanelArticle>
                <Link to={`/articles/${this.props.id}`}>
                    <StyledLogo src={this.props.image} alt="Logo" />
                </Link>
                <HeaderArticle>{this.props.title}</HeaderArticle>
                <Truncate
                    lines={5}
                    dangerouslySetInnerHTML={{
                        __html: this.props.body
                    }}
                />
            </PanelArticle>
        )
    }

}

export default Article
