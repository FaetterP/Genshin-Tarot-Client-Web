import { send } from "..";

async function startGame(payload: any) {
  const { taskId } = payload as { taskId: string };
  const data = {
    action: "task.completeTask",
    taskId,
  };
  send(data);
}

export default { handlers: { startGame } };
