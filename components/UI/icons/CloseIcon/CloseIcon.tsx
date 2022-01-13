import clsx from "clsx"
import React, { FC } from "react"

interface InputProps {
    color?: string
    size?: "small" | "medium" | "large"
    className?: string
    fill?: string
}

const CloseIcon: FC<InputProps> = ({ color = "#595959", size = "small", className, fill }) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={clsx(className, "")}
        >
            <path
                d="M3.42512 0.778833C2.84464 0.198355 1.9035 0.198355 1.32302 0.778833C0.742542 1.35931 0.742542 2.30045 1.32302 2.88093L10.1699 11.7278L1.32302 20.5746C0.742543 21.1551 0.742543 22.0963 1.32302 22.6767C1.9035 23.2572 2.84464 23.2572 3.42512 22.6767L12.272 13.8299L21.1188 22.6767C21.6993 23.2572 22.6404 23.2572 23.2209 22.6767C23.8014 22.0963 23.8014 21.1551 23.2209 20.5746L14.3741 11.7278L23.2209 2.88093C23.8014 2.30045 23.8014 1.35931 23.2209 0.778832C22.6404 0.198352 21.6993 0.198352 21.1188 0.778832L12.272 9.62569L3.42512 0.778833Z"
                fill={color}
                className={fill}
            />
        </svg>
    )
}

export { CloseIcon }
