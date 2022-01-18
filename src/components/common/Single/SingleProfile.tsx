import React, { FC } from 'react'

// Files
import './Single.scss';
import { flordaniele, gallery } from '../../../assets/images';
import { useTranslation } from 'react-i18next';
import { namespaces } from '../../../i18n/i18n.constants';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { formatContract, formatField, formatSchedule, galleryPictures, getMultipleField } from '../../../utils/formatData';

// Custom component
import Typography from '../Typography/Typography';
import Label from '../Label/Label';
import Tag from '../Tag/Tag';
import { Link } from 'react-router-dom';
import { useWindowSize } from '../../hooks/useWindowsSize';
import { generateURL, visibleURL } from '../../../utils/formatData';
import { count } from 'console';

export type SingleProfileType = {
  introduction: string;
  email: string;
  portfolio: string;
  linkedin: string;
  gallery?: Array<string>;
  experience?: number;
  // Common
  company_project_candidate: string;
  image?: string;
  profession_job_name: string;
  workgin_shedule?: Array<any>;
  type_of_contract?: Array<any>;
  fields?: Array<any>;
}

interface SingleProfileProps {
  data: SingleProfileType;
}

const SingleProfile:FC <SingleProfileProps> = ({data}) => {
  const { t } = useTranslation(namespaces.common);

  const {width} = useWindowSize();

  // Schedule
  let schedule = data.workgin_shedule ? getMultipleField(data.workgin_shedule) : null;

  if(schedule){
    schedule = schedule.map((val) => formatSchedule(val, t));
  }

  // Contract
  let contract = data.type_of_contract ? getMultipleField(data.type_of_contract) : null;

  if(contract){
    contract = contract.map((val) => formatContract(val, t));
  }

  // Field
  let fields = data.fields ? getMultipleField(data.fields) : null;

  if(fields){
    fields = fields.map((val) => formatField(val, t));
  }

  // Best works
  let gallery = data.gallery ? galleryPictures(data.gallery) : null;

  const settings = {
    slidesToShow: 1,
    infinite: true,
    touchThreshold: 20,
    dots: true,
    autoplay: true,
  };

  const renderMoreInfo = () => (
    <>
      {
        contract &&
          <div>
            {/* Type of contract */}
            <Label type="review">{t("general.type-of-contract")}</Label>
            <Typography variant="body-l" element="p">
              { contract.join(' / ') }
            </Typography>
          </div>
      }
      {
        schedule &&
          <div>
            {/* Working schedule */}
            <Label type="review">{t("general.working-schedule")}</Label>
            <Typography variant="body-l" element="p">
              { schedule.join(' / ') }
            </Typography>
          </div>
      }
      {
        fields &&
          <div>
            {/* Field */}
            <Label type="review">Field</Label>
            <div className="fields">
            {
              fields.map((field, key) => (
                <Tag key={`tag-${key}`}>{field}</Tag>
              ))
            }
            </div>
          </div>
      }
      {
        (data.experience !== null && data.experience !== undefined && data.experience !== 0) &&
          <div>
            {/* Experience */}
            <Label type="review">Experience</Label>
            <Typography variant="body-l" element="p">
              { data.experience + ' ' + t("general.year", {count: data.experience}) }
            </Typography>
          </div>
      }
    </>
  );

  return (
    <div className="single single-profile">
      {/* Extract / Sidebar */}
      <div className="extract">
        {
          data.image &&
            <div className="company-or-project desktop">
              <img src={data.image} alt="logo" />
              <Typography variant="heading-xxs" element="h2">
                {data.profession_job_name}
              </Typography>
            </div>
        }
        <div className="feature">
          {
            data.email &&
              <div>
                <Label type="review">{t("general.email")}</Label>
                <Typography variant="body-l" element="p">
                  {data.email}
                </Typography>
              </div>
          }
          {
            data.portfolio &&
              <div>
                <Label type="review">{t("general.online-portfolio")}</Label>
                <a href={generateURL(data.portfolio)} target="_blank" rel="noopener noreferrer">
                  <Typography variant="body-l" element="p">
                    { visibleURL(data.portfolio)}
                  </Typography>
                </a>
              </div>
          }
          {
            data.linkedin &&
              <div>
                <Label type="review">{t("general.linkedin")}</Label>
                <a href={generateURL(data.linkedin)} target="_blank" rel="noopener noreferrer">
                  <Typography variant="body-l" element="p">
                    {visibleURL(data.linkedin)}
                  </Typography>
                </a>
              </div>
          }
          {
            (gallery && width >= 1024) && renderMoreInfo()
          }
          { 
            width < 1024  && renderMoreInfo()
          }
        </div>
      </div>
      {/* Bio */}
      <div className="bio">
        <Typography variant="heading-m" element="h1">
          { data.company_project_candidate }
        </Typography>
        {
          data.image &&
            <div className="company-or-project mobile">
              <img src={flordaniele} alt="logo" />
              <Typography variant="heading-xxs" element="h2">
                {data.profession_job_name}
              </Typography>
            </div>
        }
        {
          !data.image &&
            <Typography variant="heading-xxs" element="h2" className="profession">
              { data.profession_job_name}
            </Typography>
        }
        {
          // Introduction
          data.introduction &&
            <>
              <Label type="review">{t("general.introduction")}</Label>
              <Typography variant="body-l" element="p">
                {data.introduction}
              </Typography>
            </>
        }
        {
          gallery &&
            <Slider className="slide-gallery" {...settings}>
              {
                gallery.map((img, key) => (
                  <img src={img} alt={`gallery-${key}`} key={`gallery-${key}`} />    
                ))
              }
            </Slider>
        }
        {/* Template Grid */}
        { 
          (!gallery && width >= 1024 ) &&
            <div className="more-info">
              { renderMoreInfo() }
            </div>
        }
      </div>
    </div>
  )
}
export default SingleProfile;