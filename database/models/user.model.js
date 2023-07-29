import mongoose from 'mongoose'
import list from 'badwords-list'

const regex = list.regex

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (value) {
        return !regex.test(value)
      },
      message: props => `${props.value} contains profanity`
    }
  },
  pronouns: {
    type: String,
    validate: {
      validator: function (value) {
        return !regex.test(value)
      },
      message: props => `${props.value} contains profanity`
    }
  },
  character: {
    type: String,
    default: 'luna',
    required: true,
    trim: true
  },
  achievements: [
    {
      name: String,
      description: String,
      badge: String,
      rarity: String
    }
  ]
})

userSchema.methods.updateProfile = async function ({
  name,
  pronouns,
  character
}) {
  if (name) this.name = name
  if (pronouns) this.pronouns = pronouns
  if (character) this.character = character
  return await this.save()
}

export default mongoose.models.user || mongoose.model('user', userSchema)
