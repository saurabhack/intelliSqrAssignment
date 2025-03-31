import express from "express"
import "dotenv/config"
import cookieParser from "cookie-parser"
import userRouter from "./router/userAuthentication.router"
const app=express()
app.use(express.json())

const PORT=process.env.PORT || 4000
app.use(cookieParser())
app.use('/auth',userRouter)

app.listen(PORT,()=>{
    console.log(`server is listening on the port of http://localhost:${PORT}`)
})