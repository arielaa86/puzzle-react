import styles from './Piece.module.scss'

interface Props {
  value: number | string | undefined;
  selected: boolean;
  onClick: (value: number | string | undefined ) => void;
  onDoubleClick: (value: number | string | undefined ) => void;
}


const Piece = ({value, selected, onClick, onDoubleClick}:Props) => {

  const applyClass = () =>{
    if(selected && value){
      return styles.selected;
    } 

    if(!selected && value){
      return styles.unselected;
    }

    return styles.empty;
  }
  return (
    <div className={applyClass()} onClick={()=> onClick(value)} onDoubleClick={()=>onDoubleClick(value)}>{value}</div>
  )
}

export default Piece
