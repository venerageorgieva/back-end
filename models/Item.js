import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  year: { type: Number },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
})

const Item = mongoose.model('Item', itemSchema)

export default Item