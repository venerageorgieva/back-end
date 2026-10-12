import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()

const createToken = (user) =>
  jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Всички полета са задължителни' })
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Паролата трябва да е поне 6 символа' })
    }

    const exists = await User.findOne({ $or: [{ email }, { username }] })
    if (exists) {
      return res.status(409).json({ message: 'Вече има потребител с това име или имейл' })
    }

    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ username, email, password: hashed })

    res.status(201).json({
      token: createToken(user),
      user: { id: user._id, username: user.username, email: user.email },
    })
  } catch (err) {
    res.status(500).json({ message: 'Грешка в сървъра' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    const ok = user && (await bcrypt.compare(password, user.password))
    if (!ok) {
      return res.status(401).json({ message: 'Грешен имейл или парола' })
    }

    res.json({
      token: createToken(user),
      user: { id: user._id, username: user.username, email: user.email },
    })
  } catch (err) {
    res.status(500).json({ message: 'Грешка в сървъра' })
  }
})

export default router