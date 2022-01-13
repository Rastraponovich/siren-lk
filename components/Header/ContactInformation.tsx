import React, { memo, FC } from "react"
import Image from "next/image"

interface InputProps {
    className?: string
}

const ContactInformation: FC<InputProps> = ({ className }) => {
    return (
        <div className={className}>
            <a href="tel:+79696567859" className="font-bold text-base">
                +7 969 656 78 59
            </a>
            <span className="text-sm font-normal">ПН-ВС: 8:00 - 22:00</span>
        </div>
    )
}

export default memo(ContactInformation)
