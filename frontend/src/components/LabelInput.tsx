import { ChangeEvent } from "react"

interface InputItems{
    label: string,
    type: string,
    placeholder: string,
    change: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function LabelInput({label, type, placeholder, change} : InputItems){

    return(
        <div className="flex flex-col gap-2 mt-2">
            <label className="font-semibold">{label}</label>
            <input onChange={change} className="border-2 border-gray-100 rounded-lg focus:outline-blue-600 p-2" type={type} placeholder={placeholder} />
        </div>
    )
}