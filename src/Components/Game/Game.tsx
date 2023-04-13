import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../../store/store";
import { ChooseCharacters } from "./ChooseCharacters";

export default function Game() {
  const ws = new WebSocket("ws://" + url);
  const goToPage = useNavigate();

  useEffect(() => {
    ws.onopen = function () {
      console.log(`Соединение установлено ${url}.`);
    };

    ws.onclose = function (event) {
      console.log(
        `Соединение закрыто. Код: ${event.code} причина: ${event.reason}.`
      );
      goToPage("/");
    };

    ws.onerror = function (error) {
      console.log("Ошибка " + error);
      goToPage("/");
    };

    ws.onmessage = function (event) {
      const obj = JSON.parse(event.data);
      console.log(obj);
    };
  }, []);

  return (
    <div>
      <ChooseCharacters ws={ws} />
    </div>
  );
}
