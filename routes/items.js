import express from 'express'
import Item from '../models/Item.js'

const router = express.Router()

// GET all items
router.get('/', async (req, res) => {
  const items = await Item.find()
  res.json(items)
})

// POST new item
router.post('/', async (req, res) => {
  const newItem = new Item(req.body)
  const savedItem = await newItem.save()
  res.json(savedItem)
})

export default router