import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../../store/store";

export default function Game() {
  const socket = new WebSocket("ws://" + url);
  const goToPage = useNavigate();

  useEffect(() => {
    socket.onopen = function () {
      console.log(`Соединение установлено ${url}.`);
    };

    socket.onclose = function (event) {
      console.log(
        `Соединение закрыто. Код: ${event.code} причина: ${event.reason}.`
      );
      goToPage("/");
    };

    socket.onerror = function (error) {
      console.log("Ошибка " + error);
      goToPage("/");
    };

    socket.onmessage = function (event) {
      const obj = JSON.parse(event.data);
      console.log(obj);
    };
  }, []);

  return <div>game</div>;
}
