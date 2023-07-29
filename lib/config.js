const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
if (!GOOGLE_CLIENT_ID)
  throw new Error(
    'Please define the GOOGLE_CLIENT_ID environment variable inside .env'
  )

const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
if (!GOOGLE_CLIENT_SECRET)
  throw new Error(
    'Please define the GOOGLE_CLIENT_SECRET environment variable inside .env'
  )

const MONGODB_URI = process.env.MONGODB_URI
if (!MONGODB_URI)
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env'
  )

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET
if (!NEXTAUTH_SECRET)
  throw new Error(
    'Please define the NEXTAUTH_SECRET environment variable inside .env'
  )

export default {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  MONGODB_URI,
  NEXTAUTH_SECRET
}
