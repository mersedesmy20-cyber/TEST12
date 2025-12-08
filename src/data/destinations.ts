import { Destination } from '@/types/destination'

export const destinations: Destination[] = [
  {
    id: 'turkey',
    name: 'Туреччина',
    season: 'Травень - Жовтень',
    seasonIcon: '☀️',
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=2000&auto=format&fit=crop', // Cappadocia/Turkey vibe
    flag: '🇹🇷',
    icon: '🏝️',
    desc: 'Країна, де схід зустрічається із заходом. Неймовірні пляжі Анталії та магія Каппадокії.',
    price: 'від 350$',
    highlights: ['Все включено', 'Історичні пам\'ятки', 'Політ на кулях', 'Сімейний відпочинок'],
    tags: ['Море', 'Європа'],
    gridClass: 'large'
  },
  {
    id: 'egypt',
    name: 'Єгипет',
    season: 'Жовтень - Травень',
    seasonIcon: '☀️',
    image: 'https://images.unsplash.com/photo-1539650116455-251d4d065549?q=80&w=2000&auto=format&fit=crop', // Pyramids
    flag: '🇪🇬',
    icon: '🐫',
    desc: 'Колиска цивілізації. Відкрийте для себе велич пірамід та красу Червоного моря.',
    price: 'від 400$',
    highlights: ['Дайвінг та снорклінг', 'Піраміди', 'Пустельні сафарі', 'Круїз Нілом'],
    tags: ['Море', 'Екзотика'],
    gridClass: ''
  },
  {
    id: 'spain',
    name: 'Іспанія',
    season: 'Червень - Вересень',
    seasonIcon: '☀️',
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=2000&auto=format&fit=crop', // Madrid/Barcelona architecture
    flag: '🇪🇸',
    icon: '💃',
    desc: 'Фієста, фламенко та неймовірна архітектура. Від Барселони до Тенеріфе.',
    price: 'від 450$',
    highlights: ['Архітектура Гауді', 'Тапас та вино', 'Нічне життя', 'Пляжі'],
    tags: ['Європа', 'Море'],
    gridClass: ''
  },
  {
    id: 'greece',
    name: 'Греція',
    season: 'Червень - Вересень',
    seasonIcon: '☀️',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2000&auto=format&fit=crop', // Santorini
    flag: '🇬🇷',
    icon: '🏺',
    desc: 'Білосніжні будинки Санторіні та антична історія Афін.',
    price: 'від 400$',
    highlights: ['Санторіні', 'Античні руїни', 'Острови', 'Середземноморська кухня'],
    tags: ['Море', 'Європа'],
    gridClass: ''
  },
  {
    id: 'montenegro',
    name: 'Чорногорія',
    season: 'Червень - Вересень',
    seasonIcon: '☀️',
    image: 'https://images.unsplash.com/photo-1565620808383-7c83c27195c6?q=80&w=2000&auto=format&fit=crop', // Kotor Bay
    flag: '🇲🇪',
    icon: '⛰️',
    desc: 'Перлина Адріатики. Де гори зустрічаються з морем у неймовірних бухтах.',
    price: 'від 380$',
    highlights: ['Которська затока', 'Будва', 'Національні парки', 'Рафтинг'],
    tags: ['Море', 'Гори', 'Європа'],
    gridClass: 'large'
  },
  {
    id: 'dominican',
    name: 'Домінікана',
    season: 'Цілий рік',
    seasonIcon: '🌴',
    image: 'https://images.unsplash.com/photo-1597424214216-2c5e88455dec?q=80&w=2000&auto=format&fit=crop', // Caribbean beach
    flag: '🇩🇴',
    icon: '🥥',
    desc: 'Справжній карибський рай. Білий пісок, пальми та безтурботність.',
    price: 'від 900$',
    highlights: ['Пунта-Кана', 'Саона', 'Карибське море', 'Все включено'],
    tags: ['Море', 'Екзотика'],
    gridClass: ''
  },
  {
    id: 'uae',
    name: 'ОАЕ',
    season: 'Жовтень - Квітень',
    seasonIcon: '🏙️',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea904acfb5a?q=80&w=2000&auto=format&fit=crop', // Dubai Burj Khalifa
    flag: '🇦🇪',
    icon: '🌃',
    desc: 'Дубай - місто майбутнього. Розкіш, хмарочоси та пустеля.',
    price: 'від 550$',
    highlights: ['Бурдж Халіфа', 'Шопінг', 'Джип-сафарі', 'Пляжі'],
    tags: ['Екзотика', 'Шопінг'],
    gridClass: ''
  },
  {
    id: 'thailand',
    name: 'Таїланд',
    season: 'Листопад - Березень',
    seasonIcon: '🍜',
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=2000&auto=format&fit=crop', // Thai temple/beach
    flag: '🇹🇭',
    icon: '🐘',
    desc: 'Країна посмішок. Екзотичні храми, неймовірна природа та смачна їжа.',
    price: 'від 750$',
    highlights: ['Пхукет', 'Бангкок', 'Тайський масаж', 'Острови'],
    tags: ['Екзотика', 'Море'],
    gridClass: ''
  }
]

