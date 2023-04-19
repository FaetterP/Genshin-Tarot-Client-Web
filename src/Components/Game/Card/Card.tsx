import { CardPrimitive } from "../../../../types/general";

export default function Card(props:CardPrimitive){
    return(
        <div>
            {props.name}
        </div>
    )
}