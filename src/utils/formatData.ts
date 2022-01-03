import { CardProps } from "../components/common/Card/Card";
import { SingleOrganizationAndProjectType } from "../components/common/Single/SingleOrganizationAndProject";
import { SingleProfileType } from "../components/common/Single/SingleProfile";

export const formatJobs = (res: any) => {
  let jobs: CardProps[] = [];
  res.map((job: any) => {
    const formattedData: CardProps = {
      title: job.PositionOffered,
      img: profilePicture(job.CompanyLogo),
      company: job.Organization,
      description: job.Responsibilities,
      date: job.published_at,
      to: `/job/${job.Slug}`
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
      profession: professional.Profession,
      img: profilePicture(professional.ProfilePicture),
      description: professional.Introduction,
      date: professional.published_at,
      to: `/professional/${professional.Slug}`
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
    salary_from: doc.SalaryFrom,
    salary_to: doc.SalaryTo,
    salary_currency: doc.Currency,
    salary_type: doc.SalaryType,
    company_project_candidate: doc.Organization,
    image: profilePicture(doc.CompanyLogo),
    workgin_shedule: doc.WorkingSchedule,
    type_of_contract: capitalizeFirstLetter(doc.TypeOfContract),
    fields: doc.Fields
  };
  return formattedData;
}

export const formatProfessionalDetails = (res: any) => {
  const doc = res[0];
  const formattedData: SingleProfileType = {
    company_project_candidate: doc.Fullname,
    profession_job_name: doc.Profession,
    introduction: doc.Introduction,
    email: doc.Email,
    portfolio: doc.OnlinePortfolio,
    linkedin: doc.Linkedin,
    gallery: doc.Email,
    workgin_shedule: doc.WorkingSchedule,
    type_of_contract: capitalizeFirstLetter(doc.TypeOfContract),
    fields: doc.Fields,
    image: profilePicture(doc.ProfilePicture)
  };
  return formattedData;
}


const capitalizeFirstLetter = (str: string) => {
  if(str.length !== 0 && str.length !== null){
    str = str.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
  }else{
    return null;
  }
}

const profilePicture = (img) => {
  if(img){
    if(img.formats){
      return img.formats.thumbnail.url;
    }else{
      return img.url;
    }
  }else{
    return null;
  }
}

const galleryPictures = (imgs) => {
  
}