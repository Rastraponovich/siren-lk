import clsx from "clsx"
import React, { FC } from "react"

interface InputProps {
    color?: string
    size?: "small" | "medium" | "large"
    className?: string
}

const BookMarkIcon: FC<InputProps> = ({ color = "#FFF", size = "small" }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 14 19.54"
            height="24"
            width="24"
            className={clsx("hover:fill-[#eda84d] fill-[#fff]")}
        >
            <defs>
                <mask id="mask" x="0" y="0" width="14" height="19.54" maskUnits="userSpaceOnUse">
                    <g id="path-1-inside-1_1161:1927" data-name="path-1-inside-1 1161:1927">
                        <path
                            fillRule="evenodd"
                            fill="#FFF"
                            d="M2,1A1,1,0,0,0,1,2V17.54a1,1,0,0,0,1,1h.23L7,15l4.77,3.54H12a1,1,0,0,0,1-1V2a1,1,0,0,0-1-1Z"
                        />
                    </g>
                </mask>
            </defs>
            <g id="Слой_2" data-name="Слой 2">
                <g id="Слой_1-2" data-name="Слой 1">
                    <g mask="url(#mask)">
                        <path
                            // fill={color}
                            d="M2.23,18.54v1h.33l.27-.2ZM7,15l.6-.8L7,13.75l-.6.45Zm4.77,3.54-.6.8.27.2h.33ZM2,2H2V0A2,2,0,0,0,0,2ZM2,17.54V2H0V17.54Zm0,0H0a2,2,0,0,0,2,2Zm.23,0H2v2h.23Zm.6,1.8L7.6,15.8,6.4,14.2,1.64,17.74ZM6.4,15.8l4.77,3.54,1.19-1.6L7.6,14.2ZM12,17.54h-.23v2H12Zm0,0v2a2,2,0,0,0,2-2ZM12,2V17.54h2V2Zm0,0h2a2,2,0,0,0-2-2ZM2,2H12V0H2Z"
                        />
                    </g>
                </g>
            </g>
        </svg>
    )
}

export { BookMarkIcon }
