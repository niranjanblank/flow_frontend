import { Label } from "@/app/boards/interfaces";

export default function LabelTag({label}:{label: Label}){
    return (
        <span 
        className='px-2 rounded-sm py-1 text-white'
        style={{backgroundColor: label.color}}
        key={`card-label-${label.id}`}>{label.title}</span>
    )
}