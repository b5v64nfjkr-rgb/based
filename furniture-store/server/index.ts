import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const app = express()
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(bodyParser.json())
app.use(cookieParser())

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey'

// Auth
app.post('/api/register', async (req, res) => {
  const { email, password, name } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' })
  const hash = await bcrypt.hash(password, 10)
  try {
    const user = await prisma.user.create({ data: { email, password: hash, name } })
    res.json({ ok: true })
  } catch (e) {
    res.status(400).json({ error: 'User exists' })
  }
})

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return res.status(401).json({ error: 'Invalid credentials' })
  const valid = await bcrypt.compare(password, user.password)
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' })
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' })
  res.cookie('token', token, { httpOnly: true, sameSite: 'lax' })
  res.json({ ok: true, user: { id: user.id, email: user.email, name: user.name } })
})

function auth(req, res, next) {
  const token = req.cookies.token
  if (!token) return res.status(401).json({ error: 'Not logged in' })
  try {
    req.user = jwt.verify(token, JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
}

// Products
app.get('/api/products', async (req, res) => {
  const { season, category, q } = req.query
  let where = {}
  if (season) where = { ...where, season: Number(season) }
  if (category) where = { ...where, category: String(category) }
  if (q) where = { ...where, title: { contains: String(q), mode: 'insensitive' } }
  const products = await prisma.product.findMany({ where })
  res.json(products)
})

app.get('/api/products/:id', async (req, res) => {
  const product = await prisma.product.findUnique({ where: { id: req.params.id } })
  if (!product) return res.status(404).json({ error: 'not found' })
  res.json(product)
})

// Cart
app.get('/api/cart', auth, async (req, res) => {
  const cart = await prisma.cart.findUnique({ where: { userId: req.user.id }, include: { items: { include: { product: true } } } })
  res.json(cart)
})

app.post('/api/cart', auth, async (req, res) => {
  const { productId, quantity } = req.body
  let cart = await prisma.cart.findUnique({ where: { userId: req.user.id } })
  if (!cart) cart = await prisma.cart.create({ data: { userId: req.user.id } })
  let item = await prisma.cartItem.findFirst({ where: { cartId: cart.id, productId } })
  if (item) {
    await prisma.cartItem.update({ where: { id: item.id }, data: { quantity } })
  } else {
    await prisma.cartItem.create({ data: { cartId: cart.id, productId, quantity } })
  }
  res.json({ ok: true })
})

app.delete('/api/cart/:itemId', auth, async (req, res) => {
  await prisma.cartItem.delete({ where: { id: req.params.itemId } })
  res.json({ ok: true })
})

// Checkout
app.post('/api/checkout', auth, async (req, res) => {
  const cart = await prisma.cart.findUnique({ where: { userId: req.user.id }, include: { items: true } })
  if (!cart || !cart.items.length) return res.status(400).json({ error: 'Cart empty' })
  const total = cart.items.reduce((sum, item) => sum + item.quantity * 499, 0)
  const order = await prisma.order.create({
    data: {
      userId: req.user.id,
      total,
      items: {
        create: cart.items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: 499
        }))
      }
    }
  })
  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } })
  res.json({ ok: true, orderId: order.id })
})

app.listen(4000, () => console.log('API running on http://localhost:4000'))
