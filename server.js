import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import itemsRouter from './routes/items.js'
import authRouter from './routes/auth.js'

dotenv.config()

const app = express()
const PORT = 5001

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err))

app.get('/', (req, res) => {
  res.send('Backend is working!')
})

app.use('/api/items', itemsRouter)
app.use('/api/auth', authRouter)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})