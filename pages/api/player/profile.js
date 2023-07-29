import { getServerSession } from 'next-auth'
import { getToken } from 'next-auth/jwt'
import authOptions from '../auth/[...nextauth]'
import dbConnect from '@/database/connect'
import User from '@/database/services/user.service'

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  const token = await getToken({ req })
  if (!session || !session.user || !token)
    return res.status(401).json({
      success: false,
      reason: 'Not logged in'
    })

  const { method } = req

  if (method === 'GET') {
    try {
      await dbConnect()
      const user = await User.findOne({ _id: session.user._id })
    } catch (err) {
      return res.status(500).json({
        success: false,
        reason: err.message
      })
    }
  } else if (method === 'POST') {
    // Update profile or achievements
  }
}
