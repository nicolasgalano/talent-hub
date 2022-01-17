import React, { FC } from 'react'

// Files
import './Single.scss';
import { company } from '../../../assets/images';
import { useTranslation } from 'react-i18next';
import { namespaces } from '../../../i18n/i18n.constants';

// Custom component
import Typography from '../Typography/Typography';
import Label from '../Label/Label';
import Tag from '../Tag/Tag';
import { formatContract, formatExperienceRequired, formatField, formatSalary, formatSchedule, formatStartDate, getMultipleField } from '../../../utils/formatData';

export type SingleOrganizationAndProjectType = {
  about?: string;
  responsabilities: string;
  benefits: string;
  experience_from: string;
  experience_to: string;
  start_date: string;
  salary_from: string;
  salary_to: string;
  salary_currency: string;
  salary_type: string;
  organizationProject?: string;
  // Common
  company_project_candidate: string;
  image?: string;
  profession_job_name: string;
  workgin_shedule: Array<any>;
  type_of_contract: Array<any>;
  fields: Array<any>;
  slug?: string;
}

interface SingleOrganizationAndProjectProps {
  data: SingleOrganizationAndProjectType;
}

const SingleOrganizationAndProject:FC <SingleOrganizationAndProjectProps> = ({data}) => {
  const { t } = useTranslation(namespaces.common);

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


  return (
    <div className="single">
      {/* Extract / Sidebar */}
      <div className="extract">
        <div className="company-or-project">
          { data.image ? <img src={data.image} alt="logo" /> : <img src={company} alt="logo" /> }
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
                    data.organizationProject === 'Organization' ?
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
              data.experience_from &&
              <div>
                {/* Experience required */}
                <Label type="review">{t("general.experience-required")}</Label>
                <Typography variant="body-l" element="p">
                  {/* {data.experience} */}
                  {formatExperienceRequired(t, parseInt(data.experience_from), parseInt(data.experience_to))}
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
              fields &&
                <div>
                  {/* Field */}
                  <Label type="review">Field</Label>
                  <div className="fields">
                  {
                    fields.map((field, key) => (
                      <Tag key={key}>{field}</Tag>
                    ))
                  }
                  </div>
                </div>
            }
            {
              data.salary_from &&
                <div>
                  {/* Salary */}
                  <Label type="review">{t("general.salary")}</Label>
                  <Typography variant="body-l" element="p">
                    { formatSalary( data.salary_from, data.salary_to, data.salary_currency, data.salary_type, t ) }
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