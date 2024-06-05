import userSchema from "./userSchema.js";

export const insertUser = (userObj)=>{
    return userSchema(userObj).save()
}
export const findEmail = (email)=>{
    return userSchema.findOne(email)
}