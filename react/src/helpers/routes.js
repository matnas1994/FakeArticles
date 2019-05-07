const serverUrl = 'http://localhost:8000'

export const articleApiUrl = id => id ? `${serverUrl}/articles/${id}` : `${serverUrl}/articles`
export const commentUrl = id => `${serverUrl}/comment/${id}`
export const loginUrl = `${serverUrl}/login`
export const fbLoginUrl = `${serverUrl}/fbLogin`
export const logoutUrl = `${serverUrl}/logout`
export const loggedUrl = `${serverUrl}/logged`
export const registerUrl = `${serverUrl}/register`
export const verifyUrl = token => `${serverUrl}/register/verify/${token}`
export const forgotPasswordUrl =  `${serverUrl}/password/email`
export const resetPasswordUrl =  `${serverUrl}/password/reset`