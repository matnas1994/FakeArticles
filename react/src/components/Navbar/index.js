import React, { Component } from 'react'
import { CurrentUserConsumer } from '../../context/CurrentUser.context'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {Notification} from '../Notification'

export const Nav = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 30px 30px;
    .active {
        text-decoration: underline overline;
      }
`

export const NavLiLeft = styled.li`
    float: left;
`

export const NavLiRight = styled.li`
    float: right;
`

export const NavLink = styled(Link)` 
    font-family: 'Lobster', cursive;
    font-size: 40px;
    color: white;
    text-algin: center;
    padding: 40px 40px;
    text-decoration: none;
    &:hover{
        color:black;
    }
`
export const NavLinkButton = styled(Link)` 
    font-family: 'Lobster', cursive;
    font-size: 25px;
    margin-left: 20px;
    &:hover{
        span{
            position: relative;
            top: -5px;
            -webkit-animation: bounce 0.3s ease infinite alternate;
        }
    }
`


export const NavALoggend = styled.a` 
    font-family: 'Lobster', cursive;
    font-size: 40px;
    color: white;
    text-algin: center;
    text-decoration: none;
`




class Navbar extends Component {
    state = {
        isOpen: false
    };


    render() {
        return (
            <CurrentUserConsumer>
                {({ user, logout, notifications, notifications_count}) => (
                    <div>
                        {user ?
                            <Nav>
                                <NavLiLeft><NavLink id="home" to={`/`}>HOME</NavLink></NavLiLeft>
                                <NavLiLeft><NavLink id="articles" to={`/articles`}>ARTICLE</NavLink></NavLiLeft>
                                <NavLiRight>
                                    <NavLinkButton className="btn btn-success" to={`/articles/new`}>
                                        <span><i className="fas fa-plus"></i> NEW ARTICLE</span>
                                    </NavLinkButton>
                                </NavLiRight>
                                <NavLiRight className="dropdown">
                                    <NavALoggend className="dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {user.name}
                                    </NavALoggend>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <Link to='#' className="dropdown-item" onClick={logout}>Logout</Link>
                                    </div>
                                </NavLiRight>
                                <NavLiRight>
                                <div className="dropdown">
                                    <span className="fa-stack fa-3x">
                                        <i className="fa fa-comment fa-stack-2x"></i>
                                        <strong className="fa-stack-1x fa-stack-text fa-inverse">{notifications_count}</strong>
                                    </span>
                                    <div className="dropdown-content">
                                       {notifications? 
                                         notifications.map(notification => {
                                            return <Notification key={notification.id}  notification={notification}/>
                                        }) 
                                         :
                                            ""
                                        } 
                                    </div>
                                </div>   
                                </NavLiRight>
                            </Nav>
                            :
                            <Nav>
                                <NavLiLeft><NavLink id="home" to={`/`}>HOME</NavLink></NavLiLeft>
                                <NavLiLeft><NavLink id="articles" to={`/articles`}>ARTICLE</NavLink></NavLiLeft>
                                <NavLiRight><NavLink id="register" to={`/register`}>SIGN UP</NavLink></NavLiRight>
                                <NavLiRight><NavLink id="login" to={`/login`}>SIGN IN</NavLink></NavLiRight>
                            </Nav>

                        }
                    </div>
                )}

            </CurrentUserConsumer>
        )
    }
}

export default Navbar