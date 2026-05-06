export const siteConfig = {
  name: 'IT-департамент МКДК',
  shortName: 'IT-департамент',
  college: {
    fullName: 'Московский колледж деловой карьеры',
    shortName: 'МКДК',
  },
  heroTitle: 'IT-ДЕПАРТАМЕНТ МКДК',
  heroLead: 'Создаем цифровую среду колледжа: Colai, внутренний мессенджер, Python Lab и IT-инфраструктуру.',
  links: {
    projects: '#products',
    apply: '#apply',
    telegram: 'https://t.me/I777MMM',
    gmail: 'mailto:gregrkrasavcik@gmail.com',
    support: '#apply',
    ideaForm: '#apply',
    joinDev: '#apply',
    subscribe: 'https://t.me/I777MMM',
  },
  social: {
    telegram: 'https://t.me/I777MMM',
    vk: '',
    email: 'gregrkrasavcik@gmail.com',
  },
  contacts: {
    telegram: 'https://t.me/I777MMM',
    email: 'gregrkrasavcik@gmail.com',
    mailto: 'mailto:gregrkrasavcik@gmail.com',
  },
  assets: {
    logo: '/assets/logo-official.png',
    ogImage: '/og-image.svg',
  },
  disclaimer: 'Сайт является студенческим проектом IT-департамента МКДК и не является официальным сайтом колледжа.',
  featureFlags: {
    enablePinnedScenes: false,
    enableLottie: true,
    enablePythonLab: true,
  },
} as const;

export type SiteConfig = typeof siteConfig;
