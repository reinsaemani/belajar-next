export const paths = {
  home: {
    getHref: () => "/admin/dashboard", // Untuk Admin
  },

  auth: {
    login: {
      getHref: () => `/login`,
    },
  },

  app: {
    admin: {
      dashboard: {
        getHref: () => "/admin/dashboard", // Admin dashboard
      },
      vacancies: {
        getHref: () => "/admin/vacancies", // Admin vacancies
      },
      applicants: {
        getHref: () => "/admin/applicants",
        getHrefDetailsById: (id: string | number) =>
          `/admin/applicants/${id}/details`,
        getHrefRecordById: (id: string | number) =>
          `/admin/applicants/${id}/records`,
      },
      search: {
        getHref: () => "/admin/search",
      },
      settings: {
        getHref: () => "/admin/settings",
      },
      resetPassword: {
        getHref: () => `/admin/reset-password`,
      },
      manageContents: {
        getHref: () => "/admin/contents",
        banners: {
          getHref: () => "/admin/contents/banner",
        },
        testimonials: {
          getHref: () => "/admin/contents/testimonials",
        },
      },
    },

    client: {
      vacancies: {
        getHref: () => "/vacancies",
      },
    },
  },
} as const;
