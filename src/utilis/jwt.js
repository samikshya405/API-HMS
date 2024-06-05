import JWT from 'jsonwebtoken'
import { insertToken } from '../model/session/SessionModel.js'


export const signAccessToken=(payload)=>{
    const token = JWT.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'15m'});
    insertToken({token})
    return token
}
export const verifyAccessJWT=(token)=>{
    try {
        return JWT.verify(token, process.env.ACCESS_TOKEN_SECRET)
        
    } catch (error) {
        console.log(error);
        return "Invalid_Token"
        
    }
}
export const signRefreshJWT =(email)=>{
    const refreshJWT = JWT.sign({email}, process.env.REFRESH_TOKEN_SECRET, {expiresIn:"30d"})
    return refreshJWT
}