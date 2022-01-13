import React, {
    ChangeEvent,
    FC,
    memo,
    MouseEventHandler,
    ReactNode,
    useEffect,
    useMemo,
} from "react"

import { RightArrowIcon } from "../icons"
import CustomSelect from "../CustomSelect"
import { useRouter } from "next/router"
import UIPagesNumbers from "./UIPagesNumbers"
import UIChangePageButton from "./UIChangePageButton"

type TParams = {
    limit?: string | number
    skip?: string | number
}
interface UIPaginationProps {
    contentPerPage: number
    showMaxPages?: number
    count: number
    page: number
    totalPages: number
    loader?(params: TParams): void
    nextPage?(): void
    prevPage?(): void
    setPage(num: number): void
    setContentPerPage(num: number): void
    itemClass?: string
    buttonClass?: string
    className?: string
}

// interface ItemProps {
//     number: number
//     onClick: MouseEventHandler<HTMLButtonElement>
//     className?: string
//     children?: ReactNode
// }

// const UIPaginationItemButton: FC<ItemProps> = ({ number, onClick, className, children }) => {
//     return (
//         <button onClick={onClick} className={className}>
//             {children || number + 1}
//         </button>
//     )

//     //render first variant
//     {
//         /* <UIPaginationItemButton
//                                     onClick={() => setPage(el + 1)}
//                                     key={el}
//                                     className={clsx(
//                                         "h-[35px] w-[35px] mx-4",
//                                         "text-[color:#4f4f4f] hover:border-[color:#4F4F4F] transition-all duration-150",

//                                         "rounded-[5px] border border-solid border-transparent",
//                                         "bg-white flex items-center text-center justify-center ",
//                                         page === el + 1 && "bg-[#4f4f4f] text-[color:#FFF]"
//                                     )}
//                                     number={el}
//                                 >
//                                     {el + 1}
//                                 </UIPaginationItemButton> */
//     }
// }

const UIPagination: FC<UIPaginationProps> = ({
    contentPerPage,
    count,
    setContentPerPage,
    nextPage,
    page,
    prevPage,
    setPage,
    totalPages,
    showMaxPages = 3,
}) => {
    const handleSetContentPerPage = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        const result = Number(value)
        if (result) {
            setContentPerPage(result)
        }
    }
    const router = useRouter()

    useEffect(() => {
        setPage(Number(router.query.page))
    }, [router])

    const options = useMemo(
        () => [
            { id: 1, value: 5 },
            { id: 2, value: 10 },
            { id: 3, value: 20 },
        ],
        []
    )

    return (
        <div className="flex justify-between items-center font-Rubik flex-wrap">
            <div className="lg:w-2/12"></div>

            <div className="flex justify-center w-6/12 sm:w-full">
                <UIChangePageButton pageNumber={page} type="prev">
                    <RightArrowIcon className="rotate-180" /> назад
                </UIChangePageButton>
                <UIPagesNumbers totalPages={totalPages} currentPage={page} />

                {/* {totalPages > showMaxPages && (
                    <UIPaginationItemButton
                        onClick={() => setPage(totalPages)}
                        className={clsx(
                            "h-[35px] w-[35px] mx-4",
                            "text-[color:#4f4f4f] hover:border-[color:#4F4F4F] transition-all duration-150",

                            "rounded-[5px] border border-solid border-transparent",
                            "bg-white flex items-center text-center justify-center "
                        )}
                        number={count}
                    >
                        {totalPages}
                    </UIPaginationItemButton>
                )} */}
                <UIChangePageButton pageNumber={page} type="next" totalPages={totalPages}>
                    вперед <RightArrowIcon />
                </UIChangePageButton>

                <CustomSelect
                    options={options}
                    value={contentPerPage}
                    onChange={setContentPerPage}
                    controlClassName="border-[color:#4f4f4f] focus:ring-[#4f4f4f] focus:border-[color:#4d4d4d] py-1.5 "
                    optionClassName="text-[color:#121621] leading-5 text-base"
                    cursorClassName="fill-gray"
                    activeCursorClassName="fill-black"
                    rootClassName="mr-[45px] last:mr-0 mt-0"
                />
            </div>
            <span className="xl:w-2/12 sm:w-full text-center sm:mt-4">
                Вы посмотрели {contentPerPage * page} из {count} товаров
            </span>
        </div>
    )
}

export default memo(UIPagination)
