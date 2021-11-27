import { FC, Fragment } from "react";
import { Link } from 'react-router-dom';

// Files
import './PostajobSuccess.scss';
import { useTranslation } from 'react-i18next';
import { namespaces } from '../../i18n/i18n.constants';
import { subscriptionPost } from '../../assets/illustrations';

// UI Custom Component
import TextField from "../../components/common/TextField/TextField";
import Typography from "../../components/common/Typography/Typography";
import { Button } from 'decentraland-ui/dist/components/Button/Button';
import Label from "../../components/common/Label/Label";
import Range from "../../components/common/Range/Range";

interface PostajobSuccessProps {
  title: string;
  description: string;
  to: string;
  color: string;
}

const PostajobSuccess:FC<PostajobSuccessProps> = ({ title, description, to, color}) =>{
  const { t } = useTranslation(namespaces.pages.postajob);

  return(
    <div id="succes" >
      <div className="illustration">
        <img src={subscriptionPost} alt={title} />
      </div>
      <div className="info ui container ">
        <Typography variant="heading-s" element="h4" className="title">Job post submitted</Typography>
        <Typography variant="body-l" element="p" className="description">Your post will be live as soon as the Decentraland Foundation team has assessed and approved the details.</Typography>
        <Link to={to}>
          <Button $color-grey-300 size="large">
            TAKE ME TO MY LISTING
          </Button>
        </Link>
      </div>
    </div>
  );
}
export default PostajobSuccess;