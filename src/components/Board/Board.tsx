import { Cell } from '../../App';
import Piece from '../Piece/Piece'
import styles from './Board.module.scss'


const Board = ({pieces, handleClick, handleDoubleClick}:{pieces: Cell[][], handleClick: (value: number | string | undefined) => void,  handleDoubleClick: (value: number | string | undefined) => void}) => {

  return (
    <div className={styles.container}>
      {pieces.map((row, i) =>
        <div key={`row-${i}`} className={styles.row}>
          {row.map((cell, k) =>
            <Piece
              key={`cell-${i}-${k}`}
              value={cell.value}
              selected={cell.selected}
              onClick={(value) => handleClick(value)}
              onDoubleClick={(value)=> handleDoubleClick(value)}
            />
          )}
        </div>
      )}
    </div>
  )
};

export default Board
