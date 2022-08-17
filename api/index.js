import dotenv from 'dotenv'
import express, { json } from "express"
import auth from './src/controllers/auth.js'

dotenv.config()
const app = express()
app.use(json({ 
    limit: '1MB'
}));


app.use('/auth', auth)


app.listen(8000)
