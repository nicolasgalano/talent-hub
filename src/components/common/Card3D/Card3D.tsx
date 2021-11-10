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
      <div className="card3d-content">
        <div className="illustration">
          <img src={imgSrc} alt={title} />
        </div>
        <div className="info">
          <Typography variant="h6" element="h4" className="title">{title}</Typography>
          <Typography variant="body2" element="p" className="description">{description}</Typography>
          <Link to={to} className="link">
            <Typography variant="label" element="span" className="label">{t("buttons.view-all")}</Typography>
            <img src={arrowRight} className="arrow-right" alt="view all" />
          </Link>
        </div>
      </div>
    </div>
  );
}
 
export default Card3D;