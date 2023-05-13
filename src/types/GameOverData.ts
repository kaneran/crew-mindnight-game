import Player from "./Player";

interface GameOverData{
    hackersWin: boolean, 
    message: string, 
    participants: Player[]
}


export default GameOverData;