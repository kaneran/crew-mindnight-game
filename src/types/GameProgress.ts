import Player from "./Player";

interface GameProgress{
    audit: NodeOutcome[],
    node: number,
    participants: Player[]
}

export default GameProgress;