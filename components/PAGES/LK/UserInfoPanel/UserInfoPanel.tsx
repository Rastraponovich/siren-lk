import { switchDisabledFields, userForUserPanelAPI } from "@/models/user"
import { useEvent } from "effector-react/scope"
import React, { memo, FC } from "react"
import UserPanelInput from "./UserPanelInput"

const UserInfoPanel: FC = () => {
    const handleChangeField = useEvent(userForUserPanelAPI)
    const handleSwitchDisabledFields = useEvent(switchDisabledFields)

    return (
        <div className="flex flex-col font-IBMPlexSans">
            <div className="flex flex-col bg-[color:#D9D9D9] rounded-lg pt-[70px]  pb-[60px] px-[60px]">
                <div className="mb-10 flex flex-col text-sm leading-[18px]">
                    <h4 className="mb-8 text-lg font-medium">Мой профиль</h4>

                    <UserPanelInput
                        caption="ФИО"
                        id="name"
                        onChange={handleChangeField.set}
                        inputClassName="flex-grow text-[color:#605F5F] col-span-3 bg-transparent border border-solid rounded"
                        onButtonClick={handleSwitchDisabledFields}
                        iconSize="large"
                    />
                    <UserPanelInput
                        caption="Телефон"
                        id="phone"
                        onChange={handleChangeField.set}
                        inputClassName="flex-grow  text-[color:#605F5F] col-span-3 bg-transparent border border-solid rounded"
                        onButtonClick={handleSwitchDisabledFields}
                        iconSize="large"
                    />
                    <UserPanelInput
                        caption="E-Mail"
                        id="email"
                        onChange={handleChangeField.set}
                        inputClassName="flex-grow text-[color:#605F5F] col-span-3 bg-transparent border border-solid rounded"
                        onButtonClick={handleSwitchDisabledFields}
                        iconSize="large"
                    />
                </div>
                <span>Сохраненные эскизы памятников:</span>
                <span>Вернутся к доработке 1</span>
                <span>Веннутся к доработке 2</span>
            </div>
        </div>
    )
}

export default memo(UserInfoPanel)
