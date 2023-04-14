let ws: WebSocket | undefined = undefined;

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

  ws.onmessage = function (event) {
    const obj = JSON.parse(event.data);
    console.log(obj);
  };
}

export function send(data: any) {
  if (!ws) return;

  ws.send(JSON.stringify(data));
}
