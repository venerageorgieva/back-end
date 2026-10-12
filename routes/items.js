import express from 'express'
import Item from '../models/Item.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.use(authMiddleware)

router.get('/', async (req, res) => {
  const items = await Item.find({ user: req.userId })
  res.json(items)
})

router.post('/', async (req, res) => {
  const { title, description, year } = req.body
  const item = await Item.create({ title, description, year, user: req.userId })
  res.status(201).json(item)
})

export default router