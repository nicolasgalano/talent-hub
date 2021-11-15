import { FC, Fragment } from 'react';

import { useTranslation } from 'react-i18next';

import { Page } from 'decentraland-ui/dist/components/Page/Page'

import { openings3D, professionals3D } from '../../assets/illustrations';
import Card3D from '../../components/common/Card3D/Card3D';
import { namespaces } from '../../i18n/i18n.constants';
import Typography from '../../components/common/Typography/Typography';
import FeaturedCards from '../../components/common/FeaturedCards/FeaturedCards';
import jobs from '../../data/jobs.json';
import professionals from '../../data/professionals.json';
import './Home.scss';

const Home:FC = () => {
  const { t } = useTranslation(namespaces.pages.home);

  return (
    <Fragment>
      <Page>
        <div className="home-hero">
          <div className="hero-top">
            <Typography variant="h1" element="h2" weight="700" className="title">{t("hero.title")}</Typography>
            <Typography variant="h6" element="h3" weight="400" className="description">{t("hero.description") }</Typography>
          </div>
          <div className="cards3d">
            <Card3D
              imgSrc={openings3D}
              title={ t("openings.title") }
              description={ t("openings.description") }
              to="/openings"
              color="orange"
            />
            <Card3D
              imgSrc={professionals3D}
              title={ t("professionals.title") }
              description={ t("professionals.description") }
              to="#"
              color="pink"
            />
          </div>
        </div>
      </Page>

      <div className="ui container" id={`featured-${ t("featured.jobs") }`}>
        <FeaturedCards 
          data={jobs}
          title={`Featured ${ t("featured.jobs") }`}
          action={`view all ${ t("featured.jobs") }`}
          to="/openings" />
      </div>

      <div className="ui container" id={`featured-${ t("featured.professionals") }`}>
        <FeaturedCards 
          data={professionals}
          title={`Featured ${ t("featured.professionals") }`}
          action={`view all ${ t("featured.professionals") }`}
          to="/professional" />
      </div>

    </Fragment>
  );
}
 
export default Home;