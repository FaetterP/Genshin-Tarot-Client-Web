import { send } from "..";

async function startGame(payload: { taskId: string }) {
  const { taskId } = payload;
  const data = {
    action: "task.completeTask",
    taskId,
  };
  send(data);
}

export default { handlers: { startGame } };
