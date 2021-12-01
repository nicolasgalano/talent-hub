import React, { FC } from 'react'

// Files
import './Single.scss';
import { flordaniele, gallery } from '../../../assets/images';
import { useTranslation } from 'react-i18next';
import { namespaces } from '../../../i18n/i18n.constants';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

// Custom component
import Typography from '../Typography/Typography';
import Label from '../Label/Label';
import Tag from '../Tag/Tag';
import { Link } from 'react-router-dom';

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
  workgin_shedule: string;
  type_of_contract: string;
  fields: Array<string>;
}

interface SingleProfileProps {
  data: SingleProfileType;
}

const SingleProfile:FC <SingleProfileProps> = ({data}) => {
  const { t } = useTranslation(namespaces.common);

  const settings = {
    slidesToShow: 1,
    infinite: true,
    touchThreshold: 20,
    dots: true,
    autoplay: true,
  };

  return (
    <div id="job-details">
      {/* Extract / Sidebar */}
      <div className="extract">
        {
          data.image &&
            <div className="company-or-project desktop">
              <img src={flordaniele} alt="logo" />
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
                <Link to={data.portfolio} target="_blank" rel="noopener noreferrer">
                  <Typography variant="body-l" element="p">
                    {data.portfolio}
                  </Typography>
                </Link>
              </div>
          }
          {
            data.linkedin &&
              <div>
                <Label type="review">{t("general.linkedin")}</Label>
                <Link to={data.linkedin} target="_blank" rel="noopener noreferrer">
                  <Typography variant="body-l" element="p">
                    {data.linkedin}
                  </Typography>
                </Link>
              </div>
          }
          {
            (data.gallery && data.type_of_contract) &&
              <div>
                {/* Type of contract */}
                <Label type="review">{t("general.type-of-contract")}</Label>
                <Typography variant="body-l" element="p">
                  {data.type_of_contract}
                </Typography>
              </div>
          }
          {
            (data.gallery && data.workgin_shedule) &&
              <div>
                {/* Working schedule */}
                <Label type="review">{t("general.working-schedule")}</Label>
                <Typography variant="body-l" element="p">
                  {data.workgin_shedule}
                </Typography>
              </div>
          }
          {
            (data.gallery && data.fields) &&
              <div>
                {/* Field */}
                <Label type="review">Field</Label>
                <div className="fields">
                {
                  data.fields.map((field) => (
                    <Tag>{field}</Tag>
                  ))
                }
                </div>
              </div>
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
          !data.gallery &&
            <div className="more-info">
              {
                data.type_of_contract &&
                  <div>
                    {/* Type of contract */}
                    <Label type="review">{t("general.type-of-contract")}</Label>
                    <Typography variant="body-l" element="p">
                      {data.type_of_contract}
                    </Typography>
                  </div>
              }
              {
                data.workgin_shedule &&
                  <div>
                    {/* Working schedule */}
                    <Label type="review">{t("general.working-schedule")}</Label>
                    <Typography variant="body-l" element="p">
                      {data.workgin_shedule}
                    </Typography>
                  </div>
              }
              {
                data.fields &&
                  <div>
                    {/* Field */}
                    <Label type="review">Field</Label>
                    <div className="fields">
                    {
                      data.fields.map((field) => (
                        <Tag>{field}</Tag>
                      ))
                    }
                    </div>
                  </div>
              }
            </div>
        }
      </div>
      { !data.gallery && <hr className="divider" /> }
    </div>
  )
}
export default SingleProfile;