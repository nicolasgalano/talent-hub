import { CardProps } from "../components/common/Card/Card";
import { SingleOrganizationAndProjectType } from "../components/common/Single/SingleOrganizationAndProject";

export const formatJobs = (res: any) => {
  let jobs: CardProps[] = [];
  res.map((job: any) => {
    const formattedData: CardProps = {
      title: job.PositionOffered,
      img: job.CompanyLogo && job.CompanyLogo.url,
      company: job.Organization,
      description: job.Responsibilities,
      date: job.published_at,
      to: `/job/${job.Slug}` // TODO: change
    }
    return jobs.push(formattedData);
  });
  return jobs;
}

export const formatProfessionals = (res: any) => {
  let professionals: CardProps[] = [];
  res.map((professional: any) => {
    const formattedData: CardProps = {
      title: professional.Fullname,
      img: professional.ProfilePicture && professional.ProfilePicture.formats.thumbnail.url,
      description: professional.Introduction,
      date: professional.published_at,
      location: null,
      to: professional.Slug
    }
    return professionals.push(formattedData);
  });
  return professionals;
}

export const formatOpeningDetails = (res: any) => {
  const doc = res[0];
  const formattedData: SingleOrganizationAndProjectType = {
    profession_job_name: doc.PositionOffered,
    about: doc.About,
    responsabilities: doc.Responsibilities,
    benefits: doc.Benefits,
    experience: doc.Experience,
    start_date: doc.StartDate,
    salary: `${doc.SalaryFrom}-${doc.SalaryTo}`,
    company_project_candidate: doc.Organization,
    image: doc.CompanyLogo ? 
            doc.CompanyLogo.formats ? 
              doc.CompanyLogo.formats.thumbnail.url : 
              doc.CompanyLogo.url : 
            null,
    workgin_shedule: doc.WorkingSchedule,
    type_of_contract: doc.TypeOfContract,
    fields: doc.Fields
  };
  return formattedData;
}