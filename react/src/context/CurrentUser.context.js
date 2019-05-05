import React, {Component} from 'react'
import { login, fbLogin, logout,  logged} from '../helpers/AuthApi'
import * as _ from 'ramda'

const CurrentUserContext = React.createContext()

export class CurrentUserProvider extends Component {
    state = {
        user: null,
        error: null,
        roles: null,
        isAdmin: false
    }

    componentDidMount ()  {
        if(localStorage.getItem('api_token')){
             logged().then( response => {
                    this.setState({user: response.user, roles:response.role})
                    this.setState({isAdmin: this.hasRoles(['admin'])})
            }).catch(error => console.log(error))
        }
    }

   
    hasRoles = (rolesName) => {
        let found = false;
       if(this.state.roles){
            rolesName.forEach(roleName => {
             if (_.contains(roleName, _.pluck('name', this.state.roles))) {
                    return found = true
                }    
            });
       } 
       return found
    }
    
  


    getFbUser = () => {
        window.FB.api('/me', { locale: 'en_US', fields: 'name, email' }, async user=> {
            const result = await fbLogin({...user})
            localStorage.setItem('api_token', result.user.api_token)
            this.setState({user})
        })
    }

    fbLogin = () => {
        this.setState({processing: true})
        window.FB.getLoginStatus(response => {
            if(response.status === 'connected'){
                this.getFbUser()
            } else {
                window.FB.login( user => {
                    this.getFbUser()
                }, { scope: 'email' })
            }
        })
    }

    login = async (values) => {
        this.setState({processing: true})
        const result = await login({...values})
        if(!result.error){
            localStorage.setItem('api_token', result.user.api_token)
            this.setState({error: null, user: result.user, roles:result.role})
            this.setState({isAdmin: this.hasRoles(['admin'])})
        }else{
            this.setState({error: result.error})
            return false
        }
    }


    logout = () => {
        logout()
        this.setState({user: null})
        localStorage.removeItem('api_token')
    }

    render(){
        const {children} = this.props
        return (
            <CurrentUserContext.Provider
                value={{
                    fbLogin: this.fbLogin,
                    login: this.login,
                    logout: this.logout,
                    user: this.state.user,
                    setUser : this.setUser,
                    error: this.state.error,
                    isAdmin: this.state.isAdmin,
                    roles : this.state.roles,
                }}
            >
                {children}
             </CurrentUserContext.Provider>   
        )
    }
}

export const CurrentUserConsumer = CurrentUserContext.Consumer