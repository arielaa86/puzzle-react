import { useEffect, useState } from 'react';
import Board from './components/Board/Board';
import styles from './App.module.scss';
import { ReactComponent as ReloadIcon } from './images/reload.svg';


export interface Cell {
  value: number | string | undefined,
  selected: boolean
}

function App() {

  const values = [1, 2, 3, 4, 5, 6, 7, 8, undefined];
  const [selectedPlace, setSelectedPlace] = useState<number[]>([])
  const [emptyPlace, setEmptyPlace] = useState<number[]>([])
  const [shuffledValues, setShuffledValues] = useState<(number | undefined)[]>([...values].sort(() => 0.5 - Math.random()))
  const [pieces, setPieces] = useState<Cell[][]>([])


  useEffect(() => {
    handleReload()
  }, [])

  const handleReload = () => {
    setShuffledValues([...values].sort(() => 0.5 - Math.random()))
    setPieces([
      [{ value: shuffledValues[0], selected: false }, { value: shuffledValues[1], selected: false }, { value: shuffledValues[2], selected: false }],
      [{ value: shuffledValues[3], selected: false }, { value: shuffledValues[4], selected: false }, { value: shuffledValues[5], selected: false }],
      [{ value: shuffledValues[6], selected: false }, { value: shuffledValues[7], selected: false }, { value: shuffledValues[8], selected: false }],
    ])
  }

  const repaint = (pieces: Cell[][], empty: number[], selected: number[]) => {
    setEmptyPlace(() => empty)
    setSelectedPlace(() => selected)
    setPieces(pieces)
  }

  const handleClick = (value: number | string | undefined) => {
    if (!isGameOver()) {
      let selected: number[] = []
      let empty: number[] = []

      const updated: Cell[][] = pieces.map((row, i) => {
        return row.map((cell, k) => {
          const isSelected = cell.value === value
          if (isSelected) {
            selected = [i, k]
          }
          if (!cell.value) {
            empty = [i, k]
          }
          return ({ value: cell.value, selected: isSelected })
        })
      })
      repaint(updated, empty, selected)
    }
  }

  const changePiecePosition = (value: number | string | undefined, origin: number[], destination: number[]) => {
    const updated: Cell[][] = pieces.map((row) => {
      return row.map((cell) => {
        return ({ value: cell.value, selected: cell.selected })
      })
    })

    updated[destination[0]][destination[1]] = { value: value, selected: true }
    updated[origin[0]][origin[1]] = { value: undefined, selected: false }
    repaint(updated, origin, destination)
  }

  const handleDoubleClick = (value: number | string | undefined) => {
    if (!isGameOver()) {
      if (selectedPlace[0] + 1 === emptyPlace[0] && selectedPlace[1] === emptyPlace[1]) {
        changePiecePosition(value, selectedPlace, emptyPlace)
      }

      if (selectedPlace[0] - 1 === emptyPlace[0] && selectedPlace[1] === emptyPlace[1]) {
        changePiecePosition(value, selectedPlace, emptyPlace)
      }

      if (selectedPlace[0] === emptyPlace[0] && selectedPlace[1] + 1 === emptyPlace[1]) {
        changePiecePosition(value, selectedPlace, emptyPlace)
      }

      if (selectedPlace[0] === emptyPlace[0] && selectedPlace[1] - 1 === emptyPlace[1]) {
        changePiecePosition(value, selectedPlace, emptyPlace)
      }
    }
  }

  const isGameOver = () => {
    return pieces.flat().map(cell => cell.value).join() === values.join()
  }

  return (
    <div className={styles.boardContainer}>
      {<div className={styles.message}>{isGameOver() && <div>Congratulations !</div>} <ReloadIcon className={styles.icon} onClick={() => handleReload()} /></div>}
      <Board pieces={pieces} handleClick={(value) => handleClick(value)} handleDoubleClick={(value) => handleDoubleClick(value)} />
    </div>
  );
}

export default App
