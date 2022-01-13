import React, { memo, FC, useState, ChangeEvent } from "react"
import { UIInput } from "../UI"

const UserInfoPanel: FC = () => {
    const [data, setData] = useState<{ name: string; email: string; phone: string }>({
        name: "",
        email: "",
        phone: "",
    })

    const [disabledFiled, setDisabledField] = useState<{ [key: string]: boolean }>({
        name: true,
        email: true,
        phone: true,
    })
    const handleChangeDisabled = (value: string) => {
        setDisabledField({ ...disabledFiled, [value]: !disabledFiled[value] })
    }

    const handleChangeData = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        setData({ ...data, [id]: value })
    }
    return (
        <div className="flex flex-col">
            <div className="flex p-4 mb-4">{/* <ImgBlock></ImgBlock> */}</div>
            <div className="flex flex-col rounded-lg text-[color:#D9D9D9] pt-[70px] pr-[35px] pb-[60px] pl-[60px]">
                <div className="mb-10 flex flex-col">
                    <fieldset className="border-t-[0.5px] border-[color:#404040]">
                        <legend className="mb-8 pr-4">Профиль исполнителя</legend>

                        <label className="flex justify-between items-center font-IBMPlexSans text-sm leading-[18px] font-medium">
                            <span className="w-[40%]">Наименование</span>

                            <UIInput
                                type="text"
                                value={data.name}
                                disabled={disabledFiled.name}
                                onChange={handleChangeData}
                                className="flex-grow mr-2 mb-4 last:mb-0 text-[color:#605f5f]"
                                id="name"
                            />
                            <button onClick={() => handleChangeDisabled("fio")}>edit</button>
                        </label>
                        <label className="flex justify-between items-center font-IBMPlexSans text-sm leading-[18px] font-medium">
                            <span className="w-[40%]">Телефон</span>
                            <UIInput
                                id="phone"
                                value={data.phone}
                                disabled={disabledFiled.phone}
                                onChange={handleChangeData}
                            />

                            <button onClick={() => handleChangeDisabled("phone")}>edit</button>
                        </label>
                        <label className="flex justify-between items-center font-IBMPlexSans text-sm leading-[18px] font-medium">
                            <span className="w-[40%]">E-Mail</span>

                            <UIInput
                                type="text"
                                value={data.email}
                                disabled={disabledFiled.email}
                                onChange={handleChangeData}
                                id="email"
                            />
                            <button onClick={() => handleChangeDisabled("email")}>edit</button>
                        </label>
                        <label className="flex justify-between items-center font-IBMPlexSans text-sm leading-[18px] font-medium">
                            <span className="w-[40%]">История участия</span>

                            <UIInput
                                type="text"
                                value={data.name}
                                disabled={disabledFiled.name}
                                onChange={handleChangeData}
                                id="name"
                            />
                            <button onClick={() => handleChangeDisabled("fio")}>edit</button>
                        </label>
                        <label className="flex justify-between items-center font-IBMPlexSans text-sm leading-[18px] font-medium">
                            <span className="w-[40%]">Портфолио</span>

                            <UIInput
                                type="text"
                                value={data.name}
                                disabled={disabledFiled.name}
                                onChange={handleChangeData}
                                id="name"
                            />
                            <button onClick={() => handleChangeDisabled("fio")}>edit</button>
                        </label>
                    </fieldset>
                </div>
            </div>
        </div>
    )
}

export default memo(UserInfoPanel)
