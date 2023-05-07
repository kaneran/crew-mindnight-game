import Outcome from "./Outcome";
import Player from "./Player";

interface GameProgress{
    audit: Outcome[],
    node: number,
    participants: Player[]
}

export default GameProgress;