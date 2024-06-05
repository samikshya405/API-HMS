import mongoose from 'mongoose'

export const connectMongo=()=>{
    const url = "mongodb://localhost:27017"

    mongoose
    .connect(url)
    .then(()=>console.log("DB connected"))
    .catch((error)=>console.log(error))
}