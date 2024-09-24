export type SiteConfig = typeof siteConfig;

export const siteConfig = {
   name: 'Blockytics',
   description:
      'Blockytics is the blockchain explorer available today. 100+ chains and counting rely on Blockscout data availability, APIs, and ecosystem tools to support their networks.',
   navItems: [
      {
         label: 'Home',
         href: '/',
      },
      {
         label: 'Tokens',
         href: '/tokens',
      },
   ],
   navMenuItems: [
      {
         label: 'Profile',
         href: '/profile',
      },
      {
         label: 'Dashboard',
         href: '/dashboard',
      },
      {
         label: 'Projects',
         href: '/projects',
      },
      {
         label: 'Team',
         href: '/team',
      },
      {
         label: 'Calendar',
         href: '/calendar',
      },
      {
         label: 'Settings',
         href: '/settings',
      },
      {
         label: 'Help & Feedback',
         href: '/help-feedback',
      },
      {
         label: 'Logout',
         href: '/logout',
      },
   ],
   links: {
      github: 'https://github.com/nextui-org/nextui',
      twitter: 'https://twitter.com/getnextui',
      docs: 'https://nextui.org',
      discord: 'https://discord.gg/9b6yyZKmH4',
      sponsor: 'https://patreon.com/jrgarciadev',
   },
};
