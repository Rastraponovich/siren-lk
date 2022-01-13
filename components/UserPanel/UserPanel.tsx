import React, { memo, FC } from "react"
import LoginModule from "@/components/LoginModule/LoginModule"
import { useSession } from "next-auth/client"
import clsx from "clsx"
import AvatarButton from "./AvatarButton"

interface UserPanelProps {
    className?: string
}

const UserPanel: FC<UserPanelProps> = ({ className }) => {
    const [session] = useSession()

    const route = `/lk/${session?.user?.role?.toLowerCase()}` || "/"
    return (
        <div className={clsx(className, "flex justify-end items-center")}>
            <AvatarButton
                size="medium"
                className="mr-0 lg:mr-4"
                href={route}
                isAuth={session !== null}
            />
            <LoginModule />
        </div>
    )
}

export default memo(UserPanel)
