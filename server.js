import express from 'express'
import 'dotenv/config.js'
import cors from 'cors'
import { connectMongo } from './src/config/connectMongo.js'


const app = express()

app.use(cors())

connectMongo()

const PORT = process.env.PORT || 8000

import morgan from "morgan";

if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"));
  }

app.use(express.json())

app.listen(PORT, (error)=>{
    error ? console.log(error) : console.log("server is running in port", PORT)
})