import React, { FC, memo, useEffect, useState } from "react"
import { useSession } from "next-auth/client"

import { ICatalogItem, ICatalogOrderItem, IOrderItem, IOrderItemFullUser } from "@/types/item.types"

import { UIButton } from "@/components/UI"

import clsx from "clsx"
import { $selectedType } from "@/models/order/type"
import { useEvent, useStore } from "effector-react"
import { $stellaSize } from "@/models/order/stella"
import { $standSize } from "@/models/order/stand"
import { $selectedMaterial } from "@/models/order/material"
import { $selectedPolishing } from "@/models/order/polishing"
import { $deliveryType, $installationType } from "@/models/order/delivery"
import { $flowerGarden, $flowerGardenFilling } from "@/models/order/flowerGarden"
import { $persons } from "@/models/order/persons"
import { switchLoginModal } from "@/models/loginPanel"

interface OrderInfoProps {
    sumbit?: boolean
    order?: any
    selectedItem?: ICatalogItem
}

const OrderInfo: FC<OrderInfoProps> = ({ sumbit = false, order, selectedItem }) => {
    const [session] = useSession()
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [isRedirect, setIsRedirect] = useState(false)

    const type = useStore($selectedType)
    const stellaSize = useStore($stellaSize)
    const standSize = useStore($standSize)
    const material = useStore($selectedMaterial)
    const polishingType = useStore($selectedPolishing)
    const installation = useStore($installationType)
    const delivery = useStore($deliveryType)
    const flowerGarden = useStore($flowerGarden)
    const flowerGardenFilling = useStore($flowerGardenFilling)
    const persons = useStore($persons)
    const handleSwitchLoginModal = useEvent(switchLoginModal)
    const addOrder = async () => {
        if (session) {
            const order: IOrderItem = {
                order: {} as ICatalogOrderItem,
                status: "statusOrder.new",
                userId: session.user._id,
                executorId: null,
            }
            const newOrder = new FormData()
            // const fileName = session.user.email + values._id + "." + photo.name.split(".").pop()
            // newOrder.append("sampleFile", photo, fileName)
            // await api.post("/addFile", newOrder)
            // order.order.photo = fileName
            // await api.post("/orders", order)
            // router.push("/lk/client")
        } else {
            if (isRedirect) {
                // setIsRedirect(false)
            } else {
                setModalIsOpen(true)
                handleSwitchLoginModal()

                // setIsRedirect(true)
            }
        }
    }
    function closeModal() {
        setModalIsOpen(false)
    }

    useEffect(() => {
        if (isRedirect && !modalIsOpen) addOrder()
    }, [isRedirect, modalIsOpen])

    const prepareDate = (date: string) => {
        const splitDate = date.split("-")

        return `${splitDate[2]}.${splitDate[1]}.${splitDate[0]}`
    }

    return (
        <div
            className={clsx(
                "flex flex-col pb-10 pt-[78px] px-[50px]",
                "font-IBMPlexSans bg-[#d9d9d9] rounded-lg text-sm leading-[18px] font-medium"
            )}
        >
            <div className="flex mb-[30px]">
                <fieldset className="border-t-[0.5px] border-solid border-[color:#404040] flex flex-col w-full">
                    <legend className="leading-[22px] text-lg font-bold pr-12 mb-7">
                        Заказ № 00001
                    </legend>
                    <table className="order-table w-full table-fixed">
                        <thead>
                            <tr>
                                <th className="w-1/2"></th>
                                <th className="w-1/2"></th>
                            </tr>
                        </thead>
                        <tbody className="text-[color:#404040]">
                            <tr>
                                <td>Наименование</td>
                                <td>{selectedItem?.monumentName}</td>
                            </tr>
                            <tr>
                                <td>Тип памятника</td>
                                <td>{null}</td>
                            </tr>
                            <tr>
                                <td>Тип захоронения</td>
                                <td>{type}</td>
                            </tr>
                            <tr>
                                <td>Материал</td>
                                <td>{material}</td>
                            </tr>
                            <tr>
                                <td>Полировка</td>
                                <td>{polishingType}</td>
                            </tr>
                            <tr>
                                <td>Размер стеллы</td>
                                <td>{`В ${stellaSize.height} х Ш ${stellaSize.width} х Т ${stellaSize.depth}`}</td>
                            </tr>
                            <tr>
                                <td>Размер подставки</td>
                                <td>{`В ${standSize.height} х Ш ${standSize.width} х Т ${standSize.depth}`}</td>
                            </tr>
                            <tr>
                                <td>Цветник</td>
                                <td>{flowerGarden}</td>
                            </tr>
                            <tr>
                                <td>Наполнение цветника</td>
                                <td>{flowerGardenFilling}</td>
                            </tr>
                            <tr>
                                <td>Гравировка ФИО</td>
                                <td>{persons[0].name}</td>
                            </tr>
                            <tr>
                                <td>Годы жизни</td>
                                <td>
                                    {`с ${
                                        prepareDate(persons[0].date.start)
                                        // ? format(parseJSON(persons[0].date.start), "dd-MM-yyyy")
                                        // : ""
                                    } по ${
                                        prepareDate(persons[0].date.end)
                                        // ? format(parseJSON(persons[0].date.end), "dd-MM-yyyy")
                                        // : ""
                                    }`}
                                </td>
                            </tr>
                            <tr>
                                <td>Гравировка фото</td>
                                <td>{persons[0].photo ? persons[0].photo : "Нет"}</td>
                            </tr>
                            <tr>
                                <td>Адрес кладбища</td>
                                {/* <td>{`${values.region} ${values.place}`}</td> */}
                                <td>--------</td>
                            </tr>
                            <tr>
                                <td>Установка</td>
                                <td>{installation}</td>
                            </tr>
                            <tr>
                                <td>Доставка</td>
                                <td>{delivery}</td>
                            </tr>
                        </tbody>
                    </table>
                </fieldset>
            </div>
            <UIButton
                className="button--primary button capitalize bg-myOrange-primary py-4 px-10 self-start"
                type="submit"
                onClick={addOrder}
            >
                Исполнено
            </UIButton>
        </div>
    )
}
export default memo(OrderInfo)
