import { $staticCards } from "@/models/executors"
import { useList } from "effector-react"
import React, { memo, FC } from "react"

interface FactsProps {}

const Facts: FC<FactsProps> = () => {
    return (
        <div className="bg-[#D9D9D9] pb-[100px] pt-[77px] -mx-20 px-20">
            <h2 className="uppercase text-4xl font-medium tracking-[1px] mb-[66px]">
                факты и цифры
            </h2>
            <div className="grid grid-cols-4 gap-9">
                {useList($staticCards, (card) => (
                    <div className="bg-white col-span-1 px-[40px] flex flex-col items-center justify-start pt-20 pb-10 leading-[18px]">
                        <h3 className="text-[50px] font-bold  mb-5">{card.fact}</h3>
                        <span className="font-medium text-2xl text-center">{card.text}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Facts
