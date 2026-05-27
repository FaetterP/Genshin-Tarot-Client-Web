import stylesGame from "./../Game.module.scss";
import Pyramid from "./Pyramid";

export default function Enemies() {
  return (
    <div className={stylesGame.enemies}>
      <Pyramid />
    </div>
  );
}
