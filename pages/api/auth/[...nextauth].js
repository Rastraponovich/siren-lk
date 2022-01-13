import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import jwt from "jsonwebtoken"
import axios from "axios"

const option = {
    providers: [
        Providers.Credentials({
            id: "credentials",
            name: "login",
            async authorize(credentials) {
                const user = await axios.post(`/auth`, credentials, {
                    baseURL: process.env.NEXT_PUBLIC_HOST,
                })
                return user.data
            },

            credentials: {
                username: {
                    label: "Username",
                    type: "text ",
                    placeholder: "jsmith",
                },
                password: { label: "Password", type: "password" },
            },
            // pages: {
            //     signIn: "/auth/signin",
            //     signOut: "/auth/signout",
            //     error: "/auth/error",
            //     verifyRequest: "/auth/verify-request",
            //     newUser: "/auth/new-user",
            // },
        }),
    ],
    // database: process.env.DB,
    session: { jwt: true },
    jwt: {
        // secret: process.env.SECRET,
        async encode({ secret, token }) {
            return jwt.sign(token, secret)
        },
        async decode({ token }) {
            return jwt.decode(token)
        },
    },
    callbacks: {
        async jwt(token, user) {
            // Add access_token to the token right after signin
            if (user) {
                token.role = user.role
                token._id = user._id
                token.nameCompany = user.nameCompany
                token.phone = user.phone
            }
            return token
        },
        async session(session, token) {
            // Add property to session, like an access_token from a provider.
            if (!session.isActivated) {
                const user = await axios.get(`/profile/${token._id}`, {
                    baseURL: process.env.NEXT_PUBLIC_HOST,
                })
                session.isActivated = user.data.isActivated
            }
            session.user._id = token._id
            session.user.role = token.role
            session.user.nameCompany = token.nameCompany
            session.user.phone = token.phone
            return session
        },
    },
}

export default (req, res) => NextAuth(req, res, option)
