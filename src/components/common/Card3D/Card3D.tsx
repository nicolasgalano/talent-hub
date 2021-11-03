import { FC } from 'react';
import { Link } from 'react-router-dom';

import { arrowRight } from '../../../assets/icons';

import './Card3D.scss';

interface Card3DProps {
  imgSrc: string;
  title: string;
  description: string;
  to: string;
  color: string;
}

const Card3D:FC<Card3DProps> = ({imgSrc, title, description, to, color}) => {
  return (
    <div className={`card3d ${color}`}>
      <div className="illustration">
        <img src={imgSrc} alt={title} />
      </div>
      <div className="info">
        <h3 className="title">{title}</h3>
        <div className="description">{description}</div>
        <Link to={to} className="link">
          View All
          <img src={arrowRight} className="arrow-right" alt="view all" />
        </Link>
      </div>
    </div>
  );
}
 
export default Card3D;