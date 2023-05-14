import GameProgress from "./types/GameProgress";

export const checkAgentsWin = (gameProgress: GameProgress) => nodesSecuredCount(gameProgress) === 3

export const checkHackersWin = (gameProgress: GameProgress) => gameProgress.audit.filter(a => a.result === "Hacked").length === 3

export const checkGameOver = (gameProgress: GameProgress) => checkAgentsWin(gameProgress) || checkHackersWin(gameProgress)

export const nodesSecuredCount = (gameProgress: GameProgress) => gameProgress?.audit.filter(node => node.result === "Secured").length
