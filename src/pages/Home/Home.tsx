import { FC, Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// Services
import { formatJobs, formatProfessionals } from '../../services/formatData';

// Files
import { openings3D, professionals3D } from '../../assets/illustrations';
import { namespaces } from '../../i18n/i18n.constants';
import SubscriptionBox from '../../components/common/SubscriptionBox/SubscriptionBox';
import './Home.scss';

// Hooks
import useApi from '../../components/hooks/useApi';

// Interface
import { CardProps } from '../../components/common/Card/Card';

// UI Custom Component
import Card3D from '../../components/common/Card3D/Card3D';
import Typography from '../../components/common/Typography/Typography';
import FeaturedCards from '../../components/common/FeaturedCards/FeaturedCards';

// redux
import { useAppDispatch, useAppSelector } from '../../components/hooks/hooks';
import { getAllJobs } from '../../redux/slices/jobsSlices';
// import { setJobs } from '../../redux/slices/jobsSlices';

const Home:FC = () => {
  const { t } = useTranslation(namespaces.pages.home);
  const [professionals, setProfessionals] = useState<CardProps[] | null>(null);
  
  // redux
  const {data: jobs, loading: jobsLoading} = useAppSelector((state) => state.jobs);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllJobs());
  }, [])


  // // Get jobs
  // const { response: jobsResponse, error: jobsError, loading: jobsLoading } = useApi({
  //   method: 'GET',
  //   url: '/jobs'
  // });

  // useEffect(() => {
  //   jobsError && console.log('Error on request: ', jobsError.response); // TODO: Only for testing porpuse

  //   if(jobsResponse && !jobsError) {
  //     let data = jobsResponse.data;
  //     data.length && dispatch(setJobs(formatJobs(data)));
  //     // console.log('resJobs: ', formatJobs(data));
  //   }
  // }, [jobsResponse, jobsError])


  // Get professionals
  const { response: professionalsResponse, error: professionalsError, loading: professionalsLoading } = useApi({
    method: 'GET',
    url: '/professionals'
  });

  useEffect(() => {
    professionalsError && console.log('Error on request: ', professionalsError.response); // TODO: Only for testing porpuse

    if(professionalsResponse && !professionalsError) {
      let data = professionalsResponse.data;
      data.length && setProfessionals(formatProfessionals(data));
      // console.log('resProfessionals: ', formatProfessionals(data));
    }
  }, [professionalsResponse, professionalsError])

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