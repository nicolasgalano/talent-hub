import moment from "moment";
import { useTranslation } from "react-i18next";
import { CardProps } from "../components/common/Card/Card";
import { SingleOrganizationAndProjectType } from "../components/common/Single/SingleOrganizationAndProject";
import { SingleProfileType } from "../components/common/Single/SingleProfile";
import { namespaces } from "../i18n/i18n.constants";

export const formatJobs = (res: any) => {
  let jobs: CardProps[] = [];
  res.map((job: any) => {
    const formattedData: CardProps = {
      id: job.id,
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
      id: professional.id,
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
    experience_from: doc.ExperienceFrom,
    experience_to: doc.ExperienceTo,
    start_date: doc.StartDate,
    salary_from: doc.SalaryFrom,
    salary_to: doc.SalaryTo,
    salary_currency: doc.Currency,
    salary_type: doc.SalaryType,
    company_project_candidate: doc.Organization,
    image: profilePicture(doc.CompanyLogo),
    workgin_shedule: doc.WorkingSchedule,
    type_of_contract: doc.TypeOfContract,
    fields: doc.Fields,
    organizationProject: doc.OrganizationProject,
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
    gallery: doc.BestWork,
    workgin_shedule: doc.WorkingSchedule,
    type_of_contract: doc.TypeOfContract,
    fields: doc.Fields,
    image: profilePicture(doc.ProfilePicture),
    experience: doc.Experience
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

export const galleryPictures = (imgs: Array<any>) => {
  if(imgs.length !== 0 && imgs !== null){
    return imgs.map((img) => {
      if(img.formats){
        // Get large size if exist
        if(img.formats.large !== undefined){
          return img.formats.large.url;
        }else if(img.formats.medium !== undefined){
          return img.formats.medium.url;
        }else if(img.formats.small !== undefined){
          return img.formats.small.url;
        }else if(img.formats.large !== undefined){
          return img.formats.large.url;
        }
      }else{
        return img.url;
      }
    })
  }else{
    return null;
  }
}

export const generateURL = (url: string) => {

  // add HTTPS and WWW
  url = visibleURL(url);
  url = 'https://www.' + url;

  return url;
}

export const visibleURL = (url: string) => {

  // remove
  url = url.replace('http://', '');
  url = url.replace('https://', '');
  url = url.replace('www.', '');

  if(url.slice(-1) === '/'){
    // remove last slash if exist
    url = url.slice(0, -1);
  }

  return url;
};

export const formatExperienceRequired = (lang, from: number, to?: number) => {
  let txt = '';
  txt += from + ' ';
  
  if(to){
    txt += '- ' + to + ' ';
  }

  txt += lang("general.year", { count: to ? to : from }); 
  
  return txt;
}
  
export const formatStartDate = (date: string) => (
  moment(date, "YYYY-MM-DD").format('MMMM YYYY')
);

export const formatSalary = (from: string, to: string, currency: string, type: string, lang) => {
  switch (type) {
    case 'YEAR':
      type = lang("general.per-year");
      break;
    case 'MONTH':
      type = lang("general.per-month");
      break;
    case 'DAY':
      type = lang("general.per-day");
      break;
  }
  return `$${from} - $${to} ${currency} ${type}`;
}

export const formatContract = (str: string, lang) => {
  switch (str) {
    case 'PERMANENT':
      str = lang("general.permanent");
      break;
    case 'TEMPORARY':
      str = lang("general.temporary");
      break;
    case 'FREELANCE':
      str = lang("general.freelance");
      break;
    case 'INTERSHIP':
      str = lang("general.intership");
      break;
  }
  return str;
}

export const formatSchedule = (str: string, lang) => {
  switch (str) {
    case 'FULL_TIME':
      str = lang("general.full-time");
      break;
    case 'PART_TIME':
      str = lang("general.part-time");
      break;
    case 'PER_HOUR':
      str = lang("general.per-hour");
      break;
  }
  return str;
}

export const formatField = (str: string, lang) => {
  switch (str) {
    case 'DESIGN':
      str = lang("general.design");
      break;
    case 'DEVELOPMENT':
      str = lang("general.development");
      break;
    case 'ENGINEERING':
      str = lang("general.engineering");
      break;
    case 'MODELLING':
      str = lang("general.modelling");
      break;
  }
  return str;
}

export const getMultipleField = (list: Array<any>) => {

  if(list.length === 0 || list === null) return;

  let newList = [];

  // Save value in a newList if it is not ID key
  list.map((val) => {
    Object.keys(val).map((key, index) => {
      if( key !== 'id'){
        newList.push(val[key]);
      }
    })
  })
  return newList;
}

// Array formatting, for Strapi compatibility
export const setMultipleField = (list: Array<any>, key: string) => {
  if(list.length === 0 || list === null) return;

  let newList = [];
  
  list.map((val, k) => {
    let obj = {};
    obj[key] = val;
    obj["id"] = k;
    newList.push(obj);
  })
  return newList;
}