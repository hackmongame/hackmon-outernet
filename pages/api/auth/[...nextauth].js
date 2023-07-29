import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import config from '@/lib/config'
import dbConnect from '@/database/connect'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async signIn({ user }) {
      await dbConnect()
    }
  }
})
