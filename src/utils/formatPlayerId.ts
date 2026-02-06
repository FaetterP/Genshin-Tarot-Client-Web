export function shortPlayerId(playerId: string): string {
  if (!playerId) return playerId;
  const parts = playerId.split("-");
  if (parts.length <= 2) return playerId;
  return parts.slice(0, 2).join("-");
}
