import express from 'express'
import auth from './routes/auth'
import posts from './routes/posts'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

const app = express()
dotenv.config();

app.use(express.json())
app.use('/api/user', auth)
app.use('/api/posts', posts)

mongoose.connect(
    `${process.env.DB_CONNECTION}`,
    { useNewUrlParser: true },
    () => console.log('👍 Connected to the Database Successfully...')
)

app.listen(3000, (req, res) => {
    console.log('Server up and running')
})