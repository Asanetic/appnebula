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

    // Dashboard
    { 
      type: "link", 
      label: "New post", 
      icon: "fa fa-edit", 
      href: (routes) => `${routes.cms}/blogposts/profile`, 
      roles: [] 
    },

      // Dashboard
  { 
    type: "link", 
    label: "New section", 
    icon: "fa fa-book", 
    href: (routes) => `${routes.cms}/content/profile`, 
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
    label: "Web content", 
    icon: "fa fa-book", 
    href: (routes) => `${routes.cms}/content/list`, 
    roles: [] 
  },

  // Web
  { 
    type: "link", 
    label: "Blog", 
    icon: "fa fa-list", 
    href: (routes) => `${routes.cms}/blogposts/list`, 
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
