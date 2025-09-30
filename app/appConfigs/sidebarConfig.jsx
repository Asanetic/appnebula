// sidebarConfigPortfolio.js

export const sidebarConfig = [
  // Dashboard
  { 
    type: "link", 
    label: "New project", 
    icon: "fa fa-plus-circle", 
    href: (routes) => `${routes.cms}/apps/profile`, 
    roles: [] 
  },

  // Projects
  {
    type: "submenu",
    label: "Projects",
    icon: "fa fa-folder-open",
    roles: [],
    items: [
      { label: "All Projects", href: (routes) => `${routes.cms}/apps/list`, roles: [] },
      { label: "Add Project", href: (routes) => `${routes.cms}/apps/profile`, roles: [] },
    ],
  },

  // Web
  { 
    type: "link", 
    label: "New project", 
    icon: "fa fa-plus-circle", 
    href: (routes) => `${routes.cms}/apps/profile`, 
    roles: [] 
  },

  // Account
  { 
    type: "link", 
    label: "My Account", 
    icon: "fa fa-user-circle", 
    href: (routes) => `${routes.cms}/account`, 
    roles: [] 
  },
];
