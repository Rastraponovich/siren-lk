import React, { memo, FC } from "react"

import Image from "next/image"

interface UserInfoPanelAvatarProps {}

const UserInfoPanelAvatar: FC<UserInfoPanelAvatarProps> = () => {
    return (
        <div className="relative h-[395px] w-full bg-white rounded-md p-8 items-center justify-center flex mb-8">
            <Image
                src="/assets/image/avatarDefault.svg"
                blurDataURL="/assets/image/avatarDefault.svg"
                layout="intrinsic"
                placeholder="blur"
                height={150}
                width={300}
                loading="lazy"
                // layout="fill"
                // objectPosition="center center"
                objectFit="contain"
                onLoadingComplete={(imageDimension) => console.log(imageDimension)}
            />
        </div>
    )
}

export default memo(UserInfoPanelAvatar)
