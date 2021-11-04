import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { arrowRight } from '../../../assets/icons';
import { namespaces } from '../../../i18n/i18n.constants';
import Typography from '../Typography/Typography';

import './Card3D.scss';

interface Card3DProps {
  imgSrc: string;
  title: string;
  description: string;
  to: string;
  color: string;
}

const Card3D:FC<Card3DProps> = ({imgSrc, title, description, to, color}) => {
  const { t } = useTranslation(namespaces.common);

  return (
    <div className={`card3d ${color}`}>
      <div className="illustration">
        <img src={imgSrc} alt={title} />
      </div>
      <div className="info">
        <Typography variant="h6" element="h2" className="description">{title}</Typography>
        {/* <h3 className="title">{title}</h3> */}
        <div className="description">{description}</div>
        <Link to={to} className="link">
          {t("buttons.view-all")}
          <img src={arrowRight} className="arrow-right" alt="view all" />
        </Link>
      </div>
    </div>
  );
}
 
export default Card3D;