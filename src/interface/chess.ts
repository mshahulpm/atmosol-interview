
type IChessInfo = {
    player_1: string,
    player_2: string,
    currentChessBoard?: IChessBoard
}

export type IPeaceType =
    'b_rook' | 'b_knight' | 'b_bishop' | 'b_king' | 'b_queen' | 'b_bishop' | 'b_knight' | 'b_rook' |
    'w_rook' | 'w_knight' | 'w_bishop' | 'w_king' | 'w_queen' | 'w_bishop' | 'w_knight' | 'w_rook' |
    'b_pawn' | 'w_pawn'

export type IChessBoard = Array<IPeaceType | 0>[]

export type Location = [number, number]


type IStartArgs = {
    start_position: Location,
    end_position: Location,
    piece: IPeaceType
}

export type IColor = 'white' | 'black'

export class ChessInterFace {

    private readonly player_1: string
    private readonly player_2: string
    private nextPlayer: IColor = 'white'

    private readonly player_color: {
        player_1: IColor,
        player_2: IColor
    }

    private chessBoard: IChessBoard = [
        ['b_rook', 'b_knight', 'b_bishop', 'b_king', 'b_queen', 'b_bishop', 'b_knight', 'b_rook'],
        ['b_pawn', 'b_pawn', 'b_pawn', 'b_pawn', 'b_pawn', 'b_pawn', 'b_pawn', 'b_pawn'],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        ['w_pawn', 'w_pawn', 'w_pawn', 'w_pawn', 'w_pawn', 'w_pawn', 'w_pawn', 'w_pawn'],
        ['w_rook', 'w_knight', 'w_bishop', 'w_king', 'w_queen', 'w_bishop', 'w_knight', 'w_rook']
    ]

    constructor({ player_1, player_2, currentChessBoard }: IChessInfo) {
        this.player_1 = player_1
        this.player_2 = player_2
        this.player_color = {
            player_1: 'white',
            player_2: 'black'
        }

        if (currentChessBoard) {
            this.chessBoard = currentChessBoard
        }
    }

    startGame() {

        return {
            chessBoard: this.chessBoard,
            nextPlayerColor: 'white',
            player_1: this.player_1,
            player_2: this.player_2,
        }
    }

    movePiece({ end_position, start_position, piece }: IStartArgs) {



        if (piece === 'b_bishop' || piece === 'w_bishop') {

            const possiblePositions = this.generatePaths(start_position, end_position)

            try {
                this.validateMove(possiblePositions, end_position)
                this.validatePath(possiblePositions)
            } catch (error) {
                return {
                    message: error.message
                }
            }

        }

        this.chessBoard[end_position[0]][end_position[1]] = piece
        this.chessBoard[start_position[0]][start_position[1]] = 0
        this.nextPlayer = this.nextPlayer === 'white' ? 'black' : 'white'

        return {
            chessBoard: this.chessBoard,
            nextPlayer: this.nextPlayer
        }

    }

    // validating the move is possible
    private validateMove(possiblePositions: Location[], end_position: Location) {

        const isExist = possiblePositions.find(p => p[0] === end_position[0] && p[1] === end_position[1])

        if (!isExist) throw new Error('invalid_move')

    }

    // validating additional params 
    private validatePath(possiblePositions: Location[]) {

        // path should be empty for bishop 
        for (const c of possiblePositions) {
            if (this.chessBoard[c[0]][c[1]]) throw new Error('invalid_path')
        }

    }


    private generatePaths(start_position: Location, end_position: Location) {

        const possiblePaths: Location[] = []

        // bishop moving top to left bottom
        if (start_position[0] < end_position[0] && start_position[1] > end_position[1]) {

            let i = start_position[0], j = end_position[0], other_co_ordinate = start_position[1]

            while (i < j) {
                {
                    i++
                    other_co_ordinate--
                    possiblePaths.push([i, other_co_ordinate])
                }

            }
        }

        // bishop moving top to right bottom

        if (start_position[0] < end_position[0] && start_position[1] < end_position[1]) {

            let i = start_position[0], j = end_position[0], other_co_ordinate = start_position[1]

            while (i < j) {
                {
                    i++
                    other_co_ordinate++

                    possiblePaths.push([i, other_co_ordinate])

                }

            }
        }

        // bishop moving bottom to right top

        if (start_position[0] > end_position[0] && start_position[1] < end_position[1]) {

            let i = start_position[0], j = end_position[0], other_co_ordinate = start_position[1]

            while (i < j) {
                {
                    i--
                    other_co_ordinate++

                    possiblePaths.push([i, other_co_ordinate])

                }

            }
        }

        // bishop moving bottom to left top

        if (start_position[0] > end_position[0] && start_position[1] > end_position[1]) {

            let i = start_position[0], j = end_position[0], other_co_ordinate = start_position[1]

            while (i < j) {
                {
                    i--
                    other_co_ordinate--

                    possiblePaths.push([i, other_co_ordinate])

                }

            }
        }

        return possiblePaths

    }



}