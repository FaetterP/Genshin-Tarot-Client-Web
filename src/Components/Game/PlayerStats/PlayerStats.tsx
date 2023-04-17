import { PlayerPrimitive } from "../../../../types/general";

export default function PlayerStats(props:PlayerPrimitive){
    return(
        <div>
            <div>{props.hp}♥</div>
            <div>{props.shields}🛡</div>
            <div>{props.energy}🔵</div>
            <div>{props.actionPoints.normal}🔷</div>
            <div>{props.actionPoints.extra}🔶</div>
        </div>
    )
}