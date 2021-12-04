import { FC } from 'react'

// Dependencies
import clsx from 'clsx';

// Files
import { deleteFile } from '../../../assets/icons';
import './File.scss';

interface FileProps {
  title:        string;
  className?:   string;
  handleClick?: Function;
}

const File:FC <FileProps> = ({title, handleClick, className}) => {

  const onClickDelete = () => handleClick;

  return (
    <button className={clsx('btn-delete', className)}>
      {title}
      <img src={deleteFile} alt="delete" onClick={onClickDelete} />
    </button>
  )
}
export default File;