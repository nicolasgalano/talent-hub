import React, { FC } from 'react'

// Files
import './Single.scss';
import { company } from '../../../assets/images';
import { useTranslation } from 'react-i18next';
import { namespaces } from '../../../i18n/i18n.constants';
import moment from 'moment';

// Custom component
import Typography from '../Typography/Typography';
import Label from '../Label/Label';
import Tag from '../Tag/Tag';

export type SingleOrganizationAndProjectType = {
  about?: string;
  responsabilities: string;
  benefits: string;
  experience: string;
  start_date: string;
  salary_from: string;
  salary_to: string;
  salary_currency: string;
  salary_type: string;
  // Common
  company_project_candidate: string;
  image?: string;
  profession_job_name: string;
  workgin_shedule: string;
  type_of_contract: string;
  fields: Array<string>;
}

interface SingleOrganizationAndProjectProps {
  data: SingleOrganizationAndProjectType;
}

const SingleOrganizationAndProject:FC <SingleOrganizationAndProjectProps> = ({data}) => {
  const { t } = useTranslation(namespaces.common);

  // we get the name of the URL to use in the title of About
  let path: string | string[] = window.location.pathname;
  path = path.split('/');
  path = path[path.length - 1];

  const formatExperienceRequired = (years: number) => (
    years + ' ' + t("general.year", { count: years })
  )

  const formatStartDate = (date: string) => (
    moment(date, "YYYY-MM-DD").format('MMMM YYYY')
  );

  const formatSalary = (from: string, to: string, currency: string, type: string) => {
    switch (type) {
      case 'YEAR':
        type = t("general.per-year");
        break;
      case 'MONTH':
        type = t("general.per-month");
        break;
      case 'DAY':
        type = t("general.per-day");
        break;
    }
    return `$${from} - $${to} ${currency} ${type}`;
  }

  const formatContract = (str: string) => {
    switch (str) {
      case 'permanent':
        str = t("general.permanent");
        break;
      case 'temporary':
        str = t("general.temporary");
        break;
      case 'freelance':
        str = t("general.freelance");
        break;
      case 'intership':
        str = t("general.intership");
        break;
    }
    return str;
  }

  const formatSchedule = (str: string) => {
    switch (str) {
      case 'FULL_TIME':
        str = t("general.full-time");
        break;
      case 'PART_TIME':
        str = t("general.part-time");
        break;
      case 'PER_HOUR':
        str = t("general.per-hour");
        break;
    }
    return str;
  }

  return (
    <div className="single">
      {/* Extract / Sidebar */}
      <div className="extract">
        <div className="company-or-project">
          { data.image && <img src={company} alt="logo" /> }
          <Typography variant="heading-xxs" element="h2">
            { data.company_project_candidate}
          </Typography>
        </div>
        <div className="feature">
          {
            data.about &&
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
        </div>
      </div>
      {/* Bio */}
      <div className="bio">
        <Typography variant="heading-m" element="h1">
          { data.profession_job_name }
        </Typography>
        {
          // Responsabilities
          data.responsabilities &&
            <>
              <Label type="review">{t("general.responsabilities")}</Label>
              <Typography variant="body-l" element="p">
                {data.responsabilities}
              </Typography>
            </>
        }
        {
          // Benefits
          data.benefits &&
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
              data.experience &&
              <div>
                {/* Experience required */}
                <Label type="review">{t("general.experience-required")}</Label>
                <Typography variant="body-l" element="p">
                  {/* {data.experience} */}
                  {formatExperienceRequired(parseInt(data.experience))}
                </Typography>
              </div>
            }
            {
              data.workgin_shedule &&
                <div>
                  {/* Working schedule */}
                  <Label type="review">{t("general.working-schedule")}</Label>
                  <Typography variant="body-l" element="p">
                    { formatSchedule(data.workgin_shedule) }
                  </Typography>
                </div>
            }
            {
              data.start_date &&
                <div>
                  {/* Start date */}
                  <Label type="review">{t("general.start-date")}</Label>
                  <Typography variant="body-l" element="p">
                    {/* {data.start_date} */}
                    { formatStartDate(data.start_date) }
                  </Typography>
                </div>
            }
            {
              data.type_of_contract &&
                <div>
                  {/* Type of contract */}
                  <Label type="review">{t("general.type-of-contract")}</Label>
                  <Typography variant="body-l" element="p">
                    { formatContract(data.type_of_contract) }
                  </Typography>
                </div>
            }
            {
              data.fields &&
                <div>
                  {/* Field */}
                  <Label type="review">Field</Label>
                  <div className="fields">
                    {/* TODO: Error on backend */}
                  {/* {
                    data.fields.map((field, key) => (
                      <Tag key={key}>{field}</Tag>
                    ))
                  } */}
                  </div>
                </div>
            }
            {
              data.salary_from &&
                <div>
                  {/* Salary */}
                  <Label type="review">{t("general.salary")}</Label>
                  <Typography variant="body-l" element="p">
                    { formatSalary( data.salary_from, data.salary_to, data.salary_currency, data.salary_type ) }
                  </Typography>
                </div>
            }
          </div>
      </div>
      <hr className="divider" />
    </div>
  )
}
export default SingleOrganizationAndProject;