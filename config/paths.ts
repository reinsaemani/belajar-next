export const paths = {
  home: {
    getHref: () => "/dashboard",
  },

  auth: {
    login: {
      getHref: () => `/login`,
    },
  },

  app: {
    dashboard: {
      getHref: () => "/dashboard",
    },
    vacancies: {
      getHref: () => "/vacancies",
    },
    applicants: {
      root: {
        getHref: () => "/applicants",
      },
      allApplicants: {
        getHref: () => "/applicants/all-applicants",
      },
      recruitmentStages: {
        getHref: () => "/recruitment-stages",
      },
    },
    search: {
      getHref: () => "/search",
    },
    settings: {
      getHref: () => "/settings",
    },
  },
} as const;
