import express from'express'
import userrouter from './routes/userrouter.js'

const app = express()

app.use(userrouter)


export default app