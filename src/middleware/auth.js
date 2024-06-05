import { getToken } from "../model/session/SessionModel.js";
import { findEmail } from "../model/user/userModel.js";
import { verifyAccessJWT } from "../utilis/jwt.js";

export const auth = async(req,res,next)=>{
    try {
        const {authorization} = req.headers;
        const decoded = verifyAccessJWT(authorization)
        if(decoded?.email){
            const tokenObj = await getToken(authorization)
            const user = await findEmail({email:decoded.email})
            if(user?.id){
                user.password = undefined;
                req.userInfo = user
                return next()
            }
        }
        const error = {
            message:"Unauthorised",
            status:403
        }
        
    } catch (error) {
        next(error)
        
    }
}

// export const isAdmin = async(req,res)=>{
//     req.userInfo.role === 'admin' ? next() : res.status(403).json({message:"You are not authorised"})
// }