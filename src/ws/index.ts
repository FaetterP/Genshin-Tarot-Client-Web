import { store } from "../redux";
import { setPage, setWsError } from "../redux/service";
import { AnyRequest } from "../types/request";
import { AnyResponse, ErrorResponse, OkResponse } from "../types/response";
import { buildHandlers } from "./handlers";

let ws: WebSocket | undefined = undefined;
const handlers = buildHandlers();

export function connectToWS(url: string) {
  ws = new WebSocket("ws://" + url);

  ws.onopen = function () {
    console.log(`Соединение установлено ${url}.`);
  };

  ws.onclose = function (event) {
    console.log(
      `Соединение закрыто. Код: ${event.code} причина: ${event.reason}.`
    );
    store.dispatch(setPage({ page: "menu" }));
  };

  ws.onerror = function (error) {
    console.log("Ошибка ", error);
    store.dispatch(setPage({ page: "menu" }));
  };

  ws.onmessage = async function (event) {
    try {
      const payload: AnyResponse | ErrorResponse | OkResponse = JSON.parse(event.data.toString());

      if ((payload as ErrorResponse).status === "error") {
        store.dispatch(setWsError((payload as ErrorResponse).message || "UNKNOWN ERROR"));
        return;
      }
      if ((payload as OkResponse).status === "ok") return;

      const { action } = payload as AnyResponse;
      const handler = handlers[action];
      if (!handler) throw new Error(`Unsupported action ${action}`);

      handler(payload);
    } catch (e) {
      console.error(e);
    }
  };
}

export function send<T extends AnyRequest>(data: T) {
  if (!ws) return;

  ws.send(JSON.stringify(data));
}
