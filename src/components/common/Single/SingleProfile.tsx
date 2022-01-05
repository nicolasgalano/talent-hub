import React, { FC } from 'react'

// Files
import './Single.scss';
import { flordaniele, gallery } from '../../../assets/images';
import { useTranslation } from 'react-i18next';
import { namespaces } from '../../../i18n/i18n.constants';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { formatContract, formatField, formatSchedule, getMultipleField } from '../../../utils/formatData';

// Custom component
import Typography from '../Typography/Typography';
import Label from '../Label/Label';
import Tag from '../Tag/Tag';
import { Link } from 'react-router-dom';
import { useWindowSize } from '../../hooks/useWindowsSize';

export type SingleProfileType = {
  introduction: string;
  email: string;
  portfolio: string;
  linkedin: string;
  gallery?: Array<string>;
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
  let schedule = getMultipleField(data.workgin_shedule);

  if(schedule){
    schedule = schedule.map((val) => formatSchedule(val, t));
  }

  // Contract
  let contract = getMultipleField(data.type_of_contract);

  if(contract){
    contract = contract.map((val) => formatContract(val, t));
  }

  // Field
  let fields = getMultipleField(data.fields);

  if(fields){
    fields = fields.map((val) => formatField(val, t));
  }

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
              fields.map((field) => (
                <Tag>{field}</Tag>
              ))
            }
            </div>
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
                <a href={data.portfolio} target="_blank" rel="noopener noreferrer">
                  <Typography variant="body-l" element="p">
                    {data.portfolio}
                  </Typography>
                </a>
              </div>
          }
          {
            data.linkedin &&
              <div>
                <Label type="review">{t("general.linkedin")}</Label>
                <a href={data.linkedin} target="_blank" rel="noopener noreferrer">
                  <Typography variant="body-l" element="p">
                    {data.linkedin}
                  </Typography>
                </a>
              </div>
          }
          {
            (data.gallery && width >= 1024) && renderMoreInfo()
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
          data.gallery &&
            <Slider className="slide-gallery" {...settings}>
              {/* TODO: Only for testing porpuse */}
              <img src={gallery} alt="gallery-1" />
              <img src={gallery} alt="gallery-2" />
              <img src={gallery} alt="gallery-3" />
              <img src={gallery} alt="gallery-4" />
              <img src={gallery} alt="gallery-5" />
            </Slider>
        }
        {/* Template Grid */}
        { 
          (!data.gallery && width >= 1024 ) &&
            <div className="more-info">
              { renderMoreInfo() }
            </div>
        }
      </div>
    </div>
  )
}
export default SingleProfile;