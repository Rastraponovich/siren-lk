import NextAuth from "next-auth"
import { IBusinessUser, IClientUser } from "./users.types"

declare module "next-auth" {
    interface Session {
        user: IBusinessUser | IClientUser
        isActivated?: boolean
    }
}
