import React, { Component } from 'react'
import styled from 'styled-components'
import $ from 'jquery'

export const Text = styled.p`
    font-family: 'Lobster', cursive;
    font-size: 80px;
    color: white;
    -webkit-text-stroke: 2px black;
`

export const CustomDiv = styled.div`
    text-align: center !important;
    vertical-align: middle;
    width: 70%;
    height: 50%;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
`

class Home extends Component {

  componentDidMount = () => {
    $( "#home" ).addClass( "active")
  }

  componentWillUnmount = () =>{
    $( "#home" ).removeClass( "active")
  }

  render(){
    return(
    <CustomDiv>
      <Text>An article is a written work published in a print or electronic medium. 
          It may be for the purpose of propagating news, research results,
          academic analysis, or debate.</Text>
    </CustomDiv>)
  }
}

export default Home