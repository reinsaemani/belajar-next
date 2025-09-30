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
        getHrefById: (id: string | number) =>
          `/applicants/all-applicants/${id}`,
      },
      recruitmentStages: {
        getHref: () => "/applicants/recruitment-stages",
        getHrefById: (id: string | number) =>
          `/applicants/recruitment-stages/${id}`,
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
