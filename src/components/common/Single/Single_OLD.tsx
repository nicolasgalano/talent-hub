import React, { FC } from 'react'

// Files
import './Single.scss';
import { company, flordaniele } from '../../../assets/images';
import { useTranslation } from 'react-i18next';
import { namespaces } from '../../../i18n/i18n.constants';

// Custom component
import Typography from '../Typography/Typography';
import Label from '../Label/Label';
import Tag from '../Tag/Tag';
import { Link } from 'react-router-dom';

// Interface
interface Commom {
  company_project_candidate: string;
  image?: string;
  profession_job_name: string;
  workgin_shedule: string;
  type_of_contract: string;
  fields: Array<string>;
}

export interface OrganizationAndProject extends Commom {
  about?: string;
  responsabilities: string;
  benefits: string;
  experience: string;
  start_date: string;
  salary: string;
}

export interface Profile extends Commom {
  introduction: string;
  email: string;
  portfolio: string;
  linkedin: string;
}

interface SingleProps {
  data?: OrganizationAndProject | Profile;
}

const Single:FC <SingleProps> = ({data}) => {
  const { t } = useTranslation(namespaces.common);

  // we need to validate if data is profile interface or is OrganizationAndProject interface
  function validateIsProfile (object: any): object is Profile {
    return 'email' in object;
  }

  const isProfile = validateIsProfile(data);

  // we get the name of the URL to use in the title of About
  let path: string | string[] = window.location.pathname;
  path = path.split('/');
  path = path[path.length - 1];

  return (
    <div id="job-details">
      {/* Extract / Sidebar */}
      <div className="extract">
        {
          !isProfile &&
            <div className="company-or-project">
              { data.image && <img src={company} alt="logo" /> }
              <Typography variant="heading-xxs" element="h2">
                { data.company_project_candidate}
              </Typography>
            </div>
        }
        {
          (isProfile && data.image) &&
            <div className="company-or-project">
              <img src={flordaniele} alt="logo" />
              <Typography variant="heading-xxs" element="h2">
                {data.profession_job_name}
              </Typography>
            </div>
        }
        <div className="feature">
          {
            (!isProfile && data.about) &&
              <div className="about">
                <Label type="review">
                  { 
                    path === 'organization' ?
                      t("general.about-the-organization") :
                      t("general.about-the-project")
                  }
                </Label>
                <Typography variant="body-l" element="p">
                  { data.about }
                </Typography>
              </div>
          }
          {
            (isProfile && data.email) &&
              <div>
                <Label type="review">{t("general.email")}</Label>
                <Typography variant="body-l" element="p">
                  {data.email}
                </Typography>
              </div>
          }
          {
            (isProfile && data.portfolio) &&
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
            (isProfile && data.linkedin) &&
              <div>
                <Label type="review">{t("general.linkedin")}</Label>
                <Link to={data.linkedin} target="_blank" rel="noopener noreferrer">
                  <Typography variant="body-l" element="p">
                    {data.linkedin}
                  </Typography>
                </Link>
              </div>
          }
        </div>
      </div>
      {/* Bio */}
      <div className="bio">
        <Typography variant="heading-m" element="h1">
          { isProfile ? data.company_project_candidate : data.profession_job_name }
        </Typography>
        {
          (isProfile && !data.image) &&
            <Typography variant="heading-xxs" element="h2" className="profession">
              { data.profession_job_name}
            </Typography>
        }
        {
          // Introduction
          (isProfile && data.introduction) &&
            <>
              <Label type="review">{t("general.introduction")}</Label>
              <Typography variant="body-l" element="p">
                {data.introduction}
              </Typography>
            </>
        }
        {
          // Responsabilities
          (!isProfile && data.responsabilities) &&
            <>
              <Label type="review">{t("general.responsabilities")}</Label>
              <Typography variant="body-l" element="p">
                {data.responsabilities}
              </Typography>
            </>
        }
        {
          // Benefits
          (!isProfile && data.benefits) &&
            <>
              <Label type="review">{t("general.benefits")}</Label>
              <Typography variant="body-l" element="p">
                {data.benefits}
              </Typography>
            </>
        }
        {/* Template Grid */}
          <div className="more-info">
            {
              (!isProfile && data.experience) &&
              <div>
                {/* Experience required */}
                <Label type="review">{t("general.experience-required")}</Label>
                <Typography variant="body-l" element="p">
                  {data.experience}
                </Typography>
              </div>
            }
            {
              (isProfile && data.type_of_contract) &&
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
              (!isProfile && data.start_date) &&
                <div>
                  {/* Start date */}
                  <Label type="review">{t("general.start-date")}</Label>
                  <Typography variant="body-l" element="p">
                    {data.start_date}
                  </Typography>
                </div>
            }
            {
              (!isProfile && data.type_of_contract) &&
                <div>
                  {/* Type of contract */}
                  <Label type="review">{t("general.type-of-contract")}</Label>
                  <Typography variant="body-l" element="p">
                    {data.type_of_contract}
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
            {
              (!isProfile && data.salary) &&
                <div>
                  {/* Salary */}
                  <Label type="review">{t("general.salary")}</Label>
                  <Typography variant="body-l" element="p">
                    {data.salary}
                  </Typography>
                </div>
            }
          </div>
      </div>
      <hr className="divider" />
    </div>
  )
}
export default Single;