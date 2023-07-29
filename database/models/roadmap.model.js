import mongoose from 'mongoose'
import { roadmaps } from '@/roadmap/roadmaps'

const roadmapSchema = new mongooose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  name: {
    type: String,
    trim: true
  },
  done: {
    type: Boolean,
    default: false,
    required: true
  },
  current: {
    type: Number,
    default: 0,
    required: true
  },
  pos: [
    {
      x: {
        type: Number,
        default: 0,
        required: true
      },
      y: {
        type: Number,
        default: 0,
        required: true
      }
    }
  ],
  roadmap: {
    type: Object
  }
})

roadmapSchema.pre('save', function (next) {
  if (this.isNew) {
    // Update user's current roadmap
    this.user.currentRoadmap = this._id
  }
  next()
})

roadmapSchema.methods.init = async function (name) {
  try {
    const roadmap = require(path.join(
      process.cwd(),
      'roadmap',
      roadmaps[name].js
    ))
    this.name = roadmap.name
    this.roadmap = roadmap.roadmap
    // Set position to starting position in roadmap
    this.pos.x = roadmap.pos[0]
    this.pos.y = roadmap.pos[1]
  } catch (err) {
    throw new Error('Invalid roadmap')
  } finally {
    return await this.save()
  }
}

roadmapSchema.methods.updateLevel = async function ({
  index,
  code,
  done = false
}) {
  // ? Any issues with storing code as a string? It's all running client side anyways
  try {
    this.roadmap[index].code = code
    if (done) {
      this.current++
      if (this.current === this.roadmap.length - 1) {
        // Win!
        this.done = true
      }
    }
  } catch (err) {
    throw new Error(err)
  } finally {
    return await this.save()
  }
}

roadmapSchema.methods.updatePos = async function ([x, y]) {
  this.pos.x = x
  this.pos.y = y
  return await this.save()
}

export default mongoose.models.roadmap ||
  mongoose.model('roadmap', roadmapSchema)
