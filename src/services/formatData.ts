import { CardProps } from "../components/common/Card/Card";

export const formatJobs = (res: any) => {
  let resJobs: CardProps[] = [];
  res.map((job: any) => {
    const resJob: CardProps = {
      id: job.id,
      title: job.PositionOffered,
      img: job.CompanyLogo && job.CompanyLogo.url,
      company: job.Organization,
      description: job.Responsibilities,
      date: job.published_at,
      to: job.Slug
    }
    return resJobs.push(resJob);
  });
  return resJobs;
}

export const formatProfessionals = (res: any) => {
  let resProfessionals: CardProps[] = [];
  res.map((job: any) => {
    const resJob: CardProps = {
      id: job.id,
      title: job.Fullname,
      img: job.ProfilePicture && job.ProfilePicture.formats.thumbnail.url,
      description: job.Introduction,
      date: job.published_at,
      location: null,
      to: job.Slug
    }
    return resProfessionals.push(resJob);
  });
  return resProfessionals;
}