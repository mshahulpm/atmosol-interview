import { IChessBoard, IColor, IPeaceType } from "src/interface/chess"


export class NextMoveDto {

    player_1: string
    player_2: string
    start_position: [number, number]
    end_position: [number, number]
    piece: IPeaceType
    currentChessBoard: IChessBoard
}