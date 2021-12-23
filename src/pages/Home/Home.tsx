import { FC, Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// Files
import { openings3D, professionals3D } from '../../assets/illustrations';
import { namespaces } from '../../i18n/i18n.constants';
import SubscriptionBox from '../../components/common/SubscriptionBox/SubscriptionBox';
import './Home.scss';

// Interface
import { CardProps } from '../../components/common/Card/Card';

// UI Custom Component
import Card3D from '../../components/common/Card3D/Card3D';
import Typography from '../../components/common/Typography/Typography';
import FeaturedCards from '../../components/common/FeaturedCards/FeaturedCards';

// redux
import { useAppDispatch, useAppSelector } from '../../components/hooks/hooks';
import { getAllJobs } from '../../redux/slices/jobsSlices';
import { getAllProfessionals } from '../../redux/slices/professionalsSlices';

const Home:FC = () => {
  const { t } = useTranslation(namespaces.pages.home);
  
  // redux
  const dispatch = useAppDispatch();
  const {data: jobs, loading: jobsLoading} = useAppSelector((state) => state.jobs);
  const {data: professionals, loading: professionalsLoading} = useAppSelector((state) => state.professionals);

  useEffect(() => {
    jobs.length === 0 && dispatch(getAllJobs({start: 0, limit: 6}));
    professionals.length === 0 && dispatch(getAllProfessionals({start: 0, limit: 6}));
  }, [])


  return (
    <Fragment>
      <div className="ui container">
        <div className="home-hero">
          <div className="hero-top">
            <Typography variant="heading-xl" element="h2" weight="700" className="title">{t("hero.title")}</Typography>
            <Typography variant="heading-xxs" element="h3" weight="400" className="description">{t("hero.description") }</Typography>
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
              to="/professionals"
              color="pink"
            />
          </div>
        </div>
      </div>

      <div className="ui container" id={`featured-${ t("featured.jobs") }`}>
        <FeaturedCards 
          loading={jobsLoading}
          data={jobs}
          title={`Featured ${ t("featured.jobs") }`}
          action={`view all ${ t("featured.jobs") }`}
          to="/openings" />
      </div>

      <div className="ui container" id={`featured-${ t("featured.professionals") }`}>
        <FeaturedCards 
          loading={professionalsLoading}
          data={professionals}
          title={`Featured ${ t("featured.professionals") }`}
          action={`view all ${ t("featured.professionals") }`}
          to="/professionals" />
      </div>

      <div className="ui container" id="subscription-box">
        <SubscriptionBox
          title={t("suscription.title")}
          description={t("suscription.description")}
          thankyou_title={t("suscription.thankyou-title")}
          thankyou_description={t("suscription.thankyou-description")}
          placeholder={t("suscription.placeholder")}
          buttonText={t("suscription.buttonText")}
        />
      </div>

    </Fragment>
  );
}
 
export default Home;