import Home from "../pages/Home/Home";
// Openings
import Openings from "../pages/Openings/Openings";
import OpeningDetails from "../pages/OpeningDetails/OpeningDetails";
import OpeningContact from "../pages/OpeningContact/OpeningContact";
import OpeningContactSuccess from "../pages/OpeningContactSuccess/OpeningContactSuccess";
import OpeningCreate from "../pages/OpeningCreate/OpeningCreate";
import OpeningCreateSuccess from "../pages/OpeningCreateSuccess/OpeningCreateSuccess";
// Professionals
import Professionals from "../pages/Professionals/Professionals";
import ProfessionalDetail from "../pages/ProfessionalDetail/ProfessionalDetail";
import ProfessionalContactSuccess from "../pages/ProfessionalContactSuccess/ProfessionalContactSuccess";
import ProfessionalCreate from "../pages/ProfessionalCreate/ProfessionalCreate";
import ProfessionalCreateSuccess from "../pages/ProfessionalCreateSuccess/ProfessionalCreateSuccess";

export interface RouteInterface {
  path: string;
  name?: string;
  component?: React.ComponentType;
  children?: Array<RouteInterface>;
  exact?: boolean;
}

// root routes
const rootRoute: RouteInterface = {
  path: '/',
  component: Home,
  exact: true,
};

const openingsRoutes: RouteInterface = {
  path: '/openings',
  name: 'Openings',
  component: Openings,
  exact: true,
  children: [
    {
      path: '/openings/post-a-job',
      name: 'Post a job',
      component: OpeningCreate,
      exact: true
    },
    {
      path: '/openings/post-a-job/success',
      name: 'Success',
      component: OpeningCreateSuccess,
    },
  ]
}

const jobsRoutes: RouteInterface = {
  path: '/job',
  name: 'Job details',
  exact: true,
  children: [
    {
      path: '/job/:slug',
      name: 'Detail',
      component: OpeningDetails
    },
    {
      path: '/job/organization',
      name: 'Organization',
      component: OpeningDetails
    },
    {
      path: '/job/project',
      name: 'Project',
      component: OpeningDetails,
    },
    {
      path: '/job/contact',
      name: 'Contact',
      component: OpeningContact,
      exact: true,
    },
    {
      path: '/job/contact/success',
      name: 'Success',
      component: OpeningContactSuccess,
    },
  ]
}

const professionalsRoutes: RouteInterface = {
  path: '/professionals',
  name: 'Professionals',
  component: Professionals,
  exact: true,
  children: [
    {
      path: '/professionals/create',
      name: 'Create a profile',
      component: ProfessionalCreate,
    },
    {
      path: '/professional/withphoto',
      name: 'Profile details with pic ',
      component: ProfessionalDetail,
    },
    {
      path: '/professional/withoutphoto',
      name: 'Profile details without pic ',
      component: ProfessionalDetail,
    },
    {
      path: '/professional/withgallery',
      name: 'Profile details with gallery ',
      component: ProfessionalDetail,
    },
    {
      path: '/professional/create/success',
      name: 'Success',
      component: ProfessionalCreateSuccess,
    },
    {
      path: '/professional/success',
      name: 'Success',
      component: ProfessionalContactSuccess,
    },
  ]
}

// Flatten the list of all nested routes
const flattenRoutes = (routes: Array<RouteInterface>) => {
  let flatRoutes: Array<RouteInterface> = [];

  routes = routes || [];
  routes.forEach(item => {
      flatRoutes.push(item);

      if (typeof item.children !== 'undefined') {
          flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
      }
  });
  return flatRoutes;
};

// All routes
const allRoutes: Array<RouteInterface> = [
  rootRoute,
  openingsRoutes,
  jobsRoutes,
  professionalsRoutes,
];

const allFlattenRoutes = flattenRoutes(allRoutes);
export { allRoutes, allFlattenRoutes };