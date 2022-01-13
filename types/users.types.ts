export interface IAuth {
    email: string
    password: string
}

export interface IRegistration extends IAuth {
    repassword: string
    nameCompany?: string
    fullName?: string
    phone?: string
    role: TRole
}

export type TRole = "Client" | "Executor" | "Admin"

interface IUser {
    _id: string
    email: string
    role: TRole
}

export interface IBusinessUser extends IUser {
    nameCompany: string
    phone: string
}

export interface IClientUser extends IUser {}
