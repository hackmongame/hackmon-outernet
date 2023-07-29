import { getServerSession } from 'next-auth'
import { getToken } from 'next-auth/jwt'
import authOptions from '../auth/[...nextauth]'
import dbConnect from '@/database/connect'
import Roadmap from '@/database/services/roadmap.service'
import { roadmaps } from '@/roadmap/roadmaps'

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  const token = await getToken({ req })
  if (!session || !session.user || !token)
    return res.status(401).json({
      success: false,
      reason: 'Not logged in'
    })

  const { method } = req
  if (method !== 'POST')
    return res.status(400).json({
      success: false,
      reason: 'Not logged in'
    })

  // Start roadmap!
  const { name } = req.body
  if (!name || !Object.keys(roadmaps).includes(name))
    return res.status(401).json({
      success: false,
      reason: 'Name of roadmap not provided'
    })

  try {
    await dbConnect()
    const parsed = require(roadmaps[name].js)
    return res.status(200).json({
      success: true,
      roadmap: Roadmap.create({
        user: session.user._id,
        name,
        pos: { x: parsed.pos[0], y: parsed.pos[1] },
        roadmap: parsed.levels
      })
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      reason: err.message
    })
  }
}
