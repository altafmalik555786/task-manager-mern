
const CMSRoutes = [
  {
    path: "/cms",
    name: "Website CMS",
    icon: "",
    component: null,
    layout: "/admin",
    subPath: true,
    type: "cms",
    subMenu: [
      // {
      //   path: "/news",
      //   name: "News",
      //   icon: "",
      //   component: NewsCMS,
      //   layout: "/admin",
      //   subPath: true,
      //   sideMenuTitle: "News",
      // },
    ],
  },
];

export default CMSRoutes;
