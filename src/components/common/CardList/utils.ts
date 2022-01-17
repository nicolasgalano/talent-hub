import { useLocation, useHistory } from 'react-router-dom';

export interface FetchQuery {
  Fullname_contains?: string;
  WorkingSchedule: string;
  TypeOfContract: string;
  Fields: string;
  ExperienceFrom_gte?: number;
  ExperienceTo_lte?: number;
  _start: number;
  _limit: number;
  _sort: string;
}

export interface ProfessionalsQuery {
  Fullname_contains: string;
}

const handleSearch = () => {

};

