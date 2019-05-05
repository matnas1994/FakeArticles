import styled from 'styled-components'

export const Panel = styled.div` 
    background-color: rgba(0,0,0,0.5);
    padding: 30px;
    text-align: center;
    width: 500px;
    margin: 50px auto;
`

export const PanelArticle = styled.div` 
    background-color: rgba(0,0,0,0.5);
    padding: 30px;
    width: 50%;
    margin: 20px auto; 
    overflow: hidden;
    text-overflow: ellipsis;
`


export const InputContainer = styled.div` 
    display: -ms-flexbox; 
    display: flex;
    width: 100%;
    margin-bottom: 15px;
`

export const Icon = styled.i` 
    padding: 20px;
    background: white;
    height: 50px;
    color: black;
    min-width: 40px;
    text-align: center;
`


export const Header = styled.h2`
  color: #fff;
  text-align: center;
  font-family: 'Lobster', cursive;
  font-size: 50px;
`  
export const Text = styled.p`
  font-family: 'Lobster', cursive;
  font-size: 20px;
`


export const ErrorMsg = styled.div`
  color: red;
`

export const SuccessMsg = styled.div`
  color: green;
`

export const SubmitButton = styled.button`
  display: block;
  border-radius: 10px;
  padding: 5px;
  color: #fff;
  margin-bottom: 10px;
  background: #232632;
`
export const LoginButton = styled.button`
  margin-top: 10px;
  font-family: 'Lobster', cursive;
  font-size: 20px;
  height:50px;
  width: 100%;
  background: white;
`

export const TextInput = styled.input`
  padding: 5px;
  background: rgba(0,0,0,0.5);
  color: #d3d4d6;
  width: 100%;
  height: 50px;
  border: 0px;
  -webkit-appearance: none;
`

export const TextArea = styled.textarea`
  padding: 5px;
  background: white;
  width: 100%;
  margin-right: 7px;
  border: 0px;
  -webkit-appearance: none;
`

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  color: #777;
  font-size: 0.8em;
  margin: 0.5em 0;
  position: relative;
  
`

export const Select = styled.select`
  color: #d3d4d6;
  padding: 5px;
  background: #232632;
  border: 0px;
  height: 25px;
`
