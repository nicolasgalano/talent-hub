import { FC } from "react";
import { Link } from 'react-router-dom';

// Files
import './Success.scss';
import { subscriptionPost } from "../../../assets/illustrations";

// UI Custom Component
import Typography from "../Typography/Typography";
import { Button } from 'decentraland-ui/dist/components/Button/Button';

interface SuccessProps {
  title: string;
  description: string;
  to: string;
  btnText: string;
}

const Success:FC<SuccessProps> = ({ title, description, to, btnText}) =>{

  return(
    <div id="succes" >
      <div className="illustration">
        <img src={subscriptionPost} alt={title} />
      </div>
      <div className="info ui container ">
        <Typography variant="heading-s" element="h4" className="title">{title}</Typography>
        <Typography variant="body-l" element="p" className="description">{description}</Typography>
        <Link to={to}>
          <Button secondary size="large">
            {btnText}
          </Button>
        </Link>
      </div>
    </div>
  );
}
export default Success;