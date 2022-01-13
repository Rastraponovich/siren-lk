import clsx from "clsx"
import React, { memo, FC, useState, useEffect } from "react"

type TChatClasses = {
    messageClass?: string
    footerClass?: string
    rootClass?: string
    messageListClass?: string
    inputClass?: string
    buttonClass?: string
}

interface InputProps {
    classes?: TChatClasses
}

type TMessage = {
    text: string
    author?: string
}

const Chat: FC<InputProps> = ({ classes }) => {
    const [inputText, setInputText] = useState("")
    const [messages, setMessages] = useState<TMessage[]>([])

    const handleChange = (e: any) => {
        setInputText(e.target.value)
    }

    const handleKeyUp = (e: any) => {
        if (e.keyCode === 13) {
            handleSubmit()
        }
        if (e.keyCode === 27) {
            setInputText("")
        }
    }

    const handleSubmit = () => {
        setMessages([...messages, { text: inputText, author: "me" }])

        setInputText("")
    }

    return (
        <div className="bg-white border border-[#e0e0e0]">
            <div className="flex flex-col min-h-[100px]">
                {messages.map((message, id) => (
                    <div
                        key={id}
                        className={clsx(
                            "flex p-6 flex-col ",
                            message.author === "me"
                                ? "self-end items-end"
                                : "self-start items-start bg-[#E0E0E0] w-full"
                        )}
                    >
                        <span className="mb-2 text-black/[0.65]">25.04.2020 20:15 Иван</span>

                        <span>{message.text}</span>
                    </div>
                ))}
            </div>
            <div className="p-4 flex-col flex bg-[#e0e0e0]">
                <textarea
                    placeholder="Тескт:"
                    rows={2}
                    value={inputText}
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                    className="mb-[11px] resize-none p-1"
                />
                <button
                    className="bg-[#595959] py-4 px-10 font-IBMPlexSans text-xs capitalize text-white self-center"
                    onClick={handleSubmit}
                >
                    Отправить
                </button>
            </div>
        </div>
    )
}

export default memo(Chat)
