import {loginUrl, fbLoginUrl, logoutUrl,loggedUrl, registerUrl,verifyUrl,forgotPasswordUrl,resetPasswordUrl} from './routes';
import * as api from './api';

export const login = params =>
    api.post(loginUrl, {   ...params })

export const fbLogin = params =>
    api.post(fbLoginUrl, {   ...params })

export const logout = params =>
    api.post(logoutUrl, {   ...params })

export const logged = () => 
    api.get(loggedUrl)

export const register = params =>
    api.post(registerUrl, { ...params})

export const verify = token =>
    api.get(verifyUrl(token))

export const forgotPassword = params =>
    api.post(forgotPasswordUrl, {...params})

export const resetPassword = params =>
    api.post(resetPasswordUrl, {...params})