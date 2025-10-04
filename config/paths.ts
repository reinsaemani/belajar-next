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
      getHref: () => "/applicants",
      getHrefDetailsById: (id: string | number) => `/applicants/${id}/details`,
      getHrefRecordById: (id: string | number) => `/applicants/${id}/records`,
    },
    search: {
      getHref: () => "/search",
    },
    settings: {
      getHref: () => "/settings",
    },
  },
} as const;
