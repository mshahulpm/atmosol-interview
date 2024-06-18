import { Injectable } from '@nestjs/common';
import { ChessInterFace } from './interface/chess';
import { NextMoveDto } from './dto';

@Injectable()
export class AppService {

  startGame() {
    const newGame = new ChessInterFace({
      player_1: Math.random().toString().slice(2),
      player_2: Math.random().toString().slice(2),
    }
    )
    const chessInfo = newGame.startGame()

    return chessInfo
  }


  nextMove(data: NextMoveDto) {
    const game = new ChessInterFace({
      player_1: data.player_1,
      player_2: data.player_2,
      currentChessBoard: data.currentChessBoard
    })

    const res = game.movePiece({
      end_position: data.end_position,
      start_position: data.start_position,
      piece: data.piece
    })
    return res
  }

}
