import jwt from 'jsonwebtoken'

export default function authMiddleware(req, res, next) {
  const header = req.headers.authorization

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Необходим е вход в профила' })
  }

  try {
    const payload = jwt.verify(header.split(' ')[1], process.env.JWT_SECRET)
    req.userId = payload.id
    next()
  } catch (err) {
    res.status(401).json({ message: 'Невалиден или изтекъл токен' })
  }
}