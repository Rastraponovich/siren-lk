import React, { FC } from "react"

interface RightArrowIcontProps {
    color?: string
    className?: string
}

const RightArrowIcon: FC<RightArrowIcontProps> = ({ color = "#1C1C1F", className }) => {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.67446 12.3796C5.4648 12.1999 5.44052 11.8843 5.62023 11.6746L8.34132 8.49999L5.62023 5.32539C5.44052 5.11572 5.4648 4.80007 5.67446 4.62036C5.88412 4.44065 6.19977 4.46493 6.37948 4.6746L9.37948 8.1746C9.53998 8.36184 9.53998 8.63814 9.37948 8.82539L6.37948 12.3254C6.19977 12.535 5.88412 12.5593 5.67446 12.3796Z"
                fill={color}
            />
        </svg>
    )
}

export { RightArrowIcon }
