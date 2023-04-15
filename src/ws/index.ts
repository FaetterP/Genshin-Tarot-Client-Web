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
    // goToPage("/");
  };

  ws.onerror = function (error) {
    console.log("Ошибка " + error);
    // goToPage("/");
  };

  ws.onmessage = async function (event) {
    try {
      const payload = JSON.parse(event.data.toString());
      console.log(payload);

      if (payload.status) return;

      const { action } = payload;
      const handler = handlers[action];
      if (!handler) throw new Error(`Unsupported action ${action}`);

      const res = await handler(payload);
    } catch (e) {
      console.error(e);
    }
  };
}

export function send(data: any) {
  if (!ws) return;

  ws.send(JSON.stringify(data));
}
