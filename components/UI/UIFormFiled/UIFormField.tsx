import { IRegistration } from "@/types/users.types"
import { Event, Store } from "effector"
import { useEvent, useStore } from "effector-react/scope"
import { ChangeEvent, FC } from "react"

interface InputProps {
    name: string
    value: Store<any>
    onChange: Event<ChangeEvent<HTMLInputElement>>
    placeholder: string
    type?: string
}
// ${meta.touched && meta.error ? classes.error : ""}

const UIFormField: FC<InputProps> = ({ value, onChange, name, ...props }) => {
    const current = useStore(value)
    const handleChange = useEvent(onChange)

    // const [field, meta] = useField(name)
    return (
        <label className="font-Rubik flex flex-col w-full mb-5 last:mb-[60px]">
            <input
                className="w-full, h-9 pl-4 font-medium rounded mb-1 text-base"
                name={name}
                value={current}
                onChange={handleChange}
                {...props}

                // {...field}
            />
            {/* <Error className={classes.errorMessage} fieldName={name} /> */}
        </label>
    )
}
// interface IErrorProps {
//     className: string
//     fieldName: string
// }
// const Error: FC<IErrorProps> = ({ className, fieldName }) => {
//     const { errors, touched } = useFormikContext<IRegistration>()
//     if (!errors[fieldName] || !touched[fieldName]) return null
//     return <span className={className}>{errors[fieldName]}</span>
// }

export { UIFormField }
