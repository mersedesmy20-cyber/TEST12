import { Destination } from '@/types/destination'

export const destinations: Destination[] = [
  // EUROPE
  {
    id: 'turkey',
    name: 'Туреччина',
    season: 'Травень - Жовтень',
    seasonIcon: '☀️',
    image: '/images/destinations/turkey.webp',
    flag: '🇹🇷',
    icon: '🏝️',
    desc: 'Країна, де схід зустрічається із заходом. Неймовірні пляжі Анталії та магія Каппадокії.',
    price: 'від 350$',
    highlights: ['Все включено', 'Історичні пам\'ятки', 'Політ на кулях', 'Сімейний відпочинок'],
    tags: ['Море', 'Європа'],
    whatToSee: ['Собор Святої Софії (Стамбул)', 'Каппадокія (повітряні кулі)', 'Памуккале (травертини)', 'Античне місто Ефес'],
    attractions: [
      {
        name: "Собор Святої Софії (Стамбул)",
        description: "Величний символ 'Золотого віку' Візантії. Побудований у 537 році, цей храм вражає своїм куполом та мозаїками.",
        image: "https://image.pollinations.ai/prompt/%D0%A1%D0%BE%D0%B1%D0%BE%D1%80%20%D0%A1%D0%B2%D1%8F%D1%82%D0%BE%D1%97%20%D0%A1%D0%BE%D1%84%D1%96%D1%97%20%D0%A1%D1%82%D0%B0%D0%BC%D0%B1%D1%83%D0%BB%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🕌"
      },
      {
        name: "Каппадокія (повітряні кулі)",
        description: "Казковий ландшафт, де сотні повітряних куль злітають у небо на світанку. Це враження, яке неможливо забути.",
        image: "https://image.pollinations.ai/prompt/%D0%9A%D0%B0%D0%BF%D0%BF%D0%B0%D0%B4%D0%BE%D0%BA%D1%96%D1%8F%20%D0%BF%D0%BE%D0%B2%D1%96%D1%82%D1%80%D1%8F%D0%BD%D1%96%20%D0%BA%D1%83%D0%BB%D1%96%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🎈"
      },
      {
        name: "Памуккале (травертини)",
        description: "Природні басейни з термальною водою сніжно-білого кольору. Унікальне природне явище, відоме як 'Бавовняний замок'.",
        image: "https://image.pollinations.ai/prompt/%D0%9F%D0%B0%D0%BC%D1%83%D0%BA%D0%BA%D0%B0%D0%BB%D0%B5%20%D1%82%D1%80%D0%B0%D0%B2%D0%B5%D1%80%D1%82%D0%B8%D0%BD%D0%B8%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "💧"
      },
      {
        name: "Античне місто Ефес",
        description: "Одне з найкраще збережених античних міст світу. Прогуляйтеся стародавніми вулицями та побачте бібліотеку Цельса.",
        image: "https://image.pollinations.ai/prompt/%D0%90%D0%BD%D1%82%D0%B8%D1%87%D0%BD%D0%B5%20%D0%BC%D1%96%D1%81%D1%82%D0%BE%20%D0%95%D1%84%D0%B5%D1%81%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🏛️"
      }
    ],
    whatToBuy: ['Турецькі солодощі (рахат-лукум)', 'Килими та текстиль', 'Вироби зі шкіри', 'Кераміка та спеції'],
    gridClass: 'large',
    bestMonths: [5, 6, 7, 8, 9, 10],
    region: 'Europe',
    waterTemp: '22°C - 28°C (травень-жовтень)',
    fruitSeason: 'Квітень-травень: полуниця; Червень: черешня; Липень: кавуни; Вересень-жовтень: гранати.',
    averageTemp: '25°C - 35°C',
    tips: [
      'Торгуйтеся на базарах! Ціну можна знизити в 2-3 рази.',
      'Найкращий час для Каппадокії - світанок.',
      'Пийте чай з місцевими - це знак поваги.',
      'Міняйте валюту в місті, а не в аеропорту.'
    ]
  },
  {
    id: 'spain',
    name: 'Іспанія',
    season: 'Червень - Вересень',
    seasonIcon: '☀️',
    image: '/images/destinations/spain.webp',
    flag: '🇪🇸',
    icon: '💃',
    desc: 'Фієста, фламенко та неймовірна архітектура. Від Барселони до Тенеріфе.',
    price: 'від 450$',
    highlights: ['Архітектура Гауді', 'Тапас та вино', 'Нічне життя', 'Пляжі'],
    tags: ['Європа', 'Море'],
    whatToSee: ['Саграда Фамілія (Барселона)', 'Парк Гуель', 'Альгамбра (Гранада)', 'Королівський палац у Мадриді'],
    tips: [
      'Сієста - це святе. Магазини часто зачинені з 14:00 до 17:00.',
      'Вечеря починається пізно, близько 21:00-22:00.',
      'Чайові не обов\'язкові, але вітаються (5-10%).',
      'Квитки в Саграда Фамілія купуйте онлайн заздалегідь.'
    ],
    attractions: [
      {
        name: "Саграда Фамілія",
        description: "Величний храм Антоніо Гауді, який будується вже понад 100 років. Неймовірна гра світла та архітектурних форм.",
        image: "https://image.pollinations.ai/prompt/%D0%A1%D0%B0%D0%B3%D1%80%D0%B0%D0%B4%D0%B0%20%D0%A4%D0%B0%D0%BC%D1%96%D0%BB%D1%96%D1%8F%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "⛪"
      },
      {
        name: "Парк Гуель",
        description: "Казковий парк з пряниковими будиночками та мозаїчною ящіркою. Відкриває найкращу панораму на Барселону.",
        image: "https://image.pollinations.ai/prompt/%D0%9F%D0%B0%D1%80%D0%BA%20%D0%93%D1%83%D0%B5%D0%BB%D1%8C%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🦎"
      },
      {
        name: "Альгамбра (Гранада)",
        description: "Шедевр маврітанської архітектури. Палаци, дворики з фонтанами та сади Хенераліфе.",
        image: "https://image.pollinations.ai/prompt/%D0%90%D0%BB%D1%8C%D0%B3%D0%B0%D0%BC%D0%B1%D1%80%D0%B0%20%D0%93%D1%80%D0%B0%D0%BD%D0%B0%D0%B4%D0%B0%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🏰"
      },
      {
        name: "Королівський палац",
        description: "Офіційна резиденція іспанської королівської родини в Мадриді. Розкішні зали та збройова палата.",
        image: "https://image.pollinations.ai/prompt/%D0%9A%D0%BE%D1%80%D0%BE%D0%BB%D1%96%D0%B2%D1%81%D1%8C%D0%BA%D0%B8%D0%B9%20%D0%BF%D0%B0%D0%BB%D0%B0%D1%86%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "👑"
      }
    ],
    whatToBuy: ['Хамон', 'Оливкова олія', 'Вино (Ріоха)', 'Віяла та кастаньєти'],
    souvenirs: [
      {
        name: "Хамон",
        description: "Знаменитий іспанський сиров'ялений окіст. Найкращий сувенір для гурманів.",
        image: "https://image.pollinations.ai/prompt/%D0%A5%D0%B0%D0%BC%D0%BE%D0%BD%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🍖"
      },
      {
        name: "Оливкова олія",
        description: "Іспанія - лідер з виробництва оливкової олії. Шукайте пляшки з написом 'Extra Virgin'.",
        image: "https://image.pollinations.ai/prompt/%D0%9E%D0%BB%D0%B8%D0%B2%D0%BA%D0%BE%D0%B2%D0%B0%20%D0%BE%D0%BB%D1%96%D1%8F%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🫒"
      },
      {
        name: "Вино (Ріоха)",
        description: "Червоні вина з регіону Ріоха відомі на весь світ своїм насиченим смаком.",
        image: "https://image.pollinations.ai/prompt/%D0%92%D0%B8%D0%BD%D0%BE%20%D0%A0%D1%96%D0%BE%D1%85%D0%B0%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🍷"
      },
      {
        name: "Віяло (Абаніко)",
        description: "Традиційне іспанське віяло - це не просто аксесуар, а частина культури фламенко.",
        image: "https://image.pollinations.ai/prompt/%D0%92%D1%96%D1%8F%D0%BB%D0%BE%20%D0%90%D0%B1%D0%B0%D0%BD%D1%96%D0%BA%D0%BE%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "💃"
      }
    ],
    bestMonths: [6, 7, 8, 9],
    region: 'Europe'
  },
  {
    id: 'greece',
    name: 'Греція',
    season: 'Червень - Вересень',
    seasonIcon: '☀️',
    image: '/images/destinations/greece.webp',
    flag: '🇬🇷',
    icon: '🏺',
    desc: 'Білосніжні будинки Санторіні та антична історія Афін.',
    price: 'від 400$',
    highlights: ['Санторіні', 'Античні руїни', 'Острови', 'Середземноморська кухня'],
    tags: ['Море', 'Європа'],
    whatToSee: ['Акрополь (Афіни)', 'Острів Санторіні', 'Метеори', 'Кноський палац (Крит)'],
    tips: [
      'На маленьких островах краще мати готівку.',
      'Не викидайте папір в унітаз - труби старі.',
      'Пороми залежать від погоди, перевіряйте розклад.',
      'Спробуйте місцеве вино - воно недооцінене!'
    ],
    attractions: [
      {
        name: "Акрополь (Афіни)",
        description: "Серце давньої Греції. Парфенон гордо височіє над містом, нагадуючи про велич античної цивілізації.",
        image: "https://image.pollinations.ai/prompt/%D0%90%D0%BA%D1%80%D0%BE%D0%BF%D0%BE%D0%BB%D1%8C%20%D0%90%D1%84%D1%96%D0%BD%D0%B8%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🏛️"
      },
      {
        name: "Санторіні",
        description: "Найромантичніший острів світу з білими будиночками, синіми дахами та вулканічними пляжами.",
        image: "https://image.pollinations.ai/prompt/%D0%A1%D0%B0%D0%BD%D1%82%D0%BE%D1%80%D1%96%D0%BD%D1%96%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🌅"
      },
      {
        name: "Метеори",
        description: "Монастирі, що ширяють у повітрі. Побудовані на вершинах гігантських скель, вони виглядають нереально.",
        image: "https://image.pollinations.ai/prompt/%D0%9C%D0%B5%D1%82%D0%B5%D0%BE%D1%80%D0%B8%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "⛪"
      },
      {
        name: "Кноський палац",
        description: "Лабіринт мінотавра на острові Крит. Найдавніше місто Європи та центр мінойської цивілізації.",
        image: "https://image.pollinations.ai/prompt/%D0%9A%D0%BD%D0%BE%D1%81%D1%8C%D0%BA%D0%B8%D0%B9%20%D0%BF%D0%B0%D0%BB%D0%B0%D1%86%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🐂"
      }
    ],
    whatToBuy: ['Оливкова олія та косметика', 'Грецький мед', 'Сир Фета', 'Шкіряні сандалі'],
    souvenirs: [
      {
        name: "Оливкова косметика",
        description: "Натуральні креми та мило на основі оливкової олії - секрет краси гречанок.",
        image: "https://image.pollinations.ai/prompt/%D0%9E%D0%BB%D0%B8%D0%B2%D0%BA%D0%BE%D0%B2%D0%B0%20%D0%BA%D0%BE%D1%81%D0%BC%D0%B5%D1%82%D0%B8%D0%BA%D0%B0%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🧴"
      },
      {
        name: "Грецький мед",
        description: "Чебрецевий мед з Криту або сосновий з Тасосу. Має неповторний аромат.",
        image: "https://image.pollinations.ai/prompt/%D0%93%D1%80%D0%B5%D1%86%D1%8C%D0%BA%D0%B8%D0%B9%20%D0%BC%D0%B5%D0%B4%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🍯"
      },
      {
        name: "Сир Фета",
        description: "Справжня фета, витримана в розсолі. Смакує ідеально з салатом або просто з хлібом.",
        image: "https://image.pollinations.ai/prompt/%D0%A1%D0%B8%D1%80%20%D0%A4%D0%B5%D1%82%D0%B0%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🧀"
      },
      {
        name: "Шкіряні сандалі",
        description: "Ручна робота місцевих майстрів. Зручні, стильні та довговічні.",
        image: "https://image.pollinations.ai/prompt/%D0%A8%D0%BA%D1%96%D1%80%D1%8F%D0%BD%D1%96%20%D1%81%D0%B0%D0%BD%D0%B4%D0%B0%D0%BB%D1%96%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "👡"
      }
    ],
    bestMonths: [6, 7, 8, 9],
    region: 'Europe',
    waterTemp: '21°C - 26°C (червень-вересень)',
    fruitSeason: 'Травень: полуниця; Червень: абрикоси; Серпень: інжир; Жовтень: цитрусові.',
    averageTemp: '28°C - 32°C'
  },
  {
    id: 'montenegro',
    name: 'Чорногорія',
    season: 'Червень - Вересень',
    seasonIcon: '☀️',
    image: '/images/destinations/montenegro.webp',
    flag: '🇲🇪',
    icon: '⛰️',
    desc: 'Перлина Адріатики. Де гори зустрічаються з морем у неймовірних бухтах.',
    price: 'від 380$',
    highlights: ['Которська затока', 'Будва', 'Національні парки', 'Рафтинг'],
    tags: ['Море', 'Гори', 'Європа'],
    whatToSee: ['Которська затока', 'Старе місто Будва', 'Острів Светого Стефана', 'Національний парк Дурмітор'],
    attractions: [
      {
        name: "Которська затока",
        description: "Найпівденніший фіорд Європи. Мальовничі містечка, оточені горами, відображаються в дзеркальній воді.",
        image: "https://image.pollinations.ai/prompt/%D0%9A%D0%BE%D1%82%D0%BE%D1%80%D1%81%D1%8C%D0%BA%D0%B0%20%D0%B7%D0%B0%D1%82%D0%BE%D0%BA%D0%B0%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🌊"
      },
      {
        name: "Старе місто Будва",
        description: "2500 років історії. Вузькі вулички, фортеця Цитадела та найкращі пляжі Чорногорії поруч.",
        image: "https://image.pollinations.ai/prompt/%D0%A1%D1%82%D0%B0%D1%80%D0%B5%20%D0%BC%D1%96%D1%81%D1%82%D0%BE%20%D0%91%D1%83%D0%B4%D0%B2%D0%B0%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🏰"
      },
      {
        name: "Острів Свєтог Стефана",
        description: "Розкішний острів-готель, з'єднаний з материком вузьким перешийком. Символ Чорногорії.",
        image: "https://image.pollinations.ai/prompt/%D0%9E%D1%81%D1%82%D1%80%D1%96%D0%B2%20%D0%A1%D0%B2%D1%94%D1%82%D0%BE%D0%B3%20%D0%A1%D1%82%D0%B5%D1%84%D0%B0%D0%BD%D0%B0%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🏝️"
      },
      {
        name: "Національний парк Дурмітор",
        description: "Дикі гори, каньйони та Чорне озеро. Каньйон Тари — найглибший у Європі.",
        image: "https://image.pollinations.ai/prompt/%D0%9D%D0%B0%D1%86%D1%96%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D0%B8%D0%B9%20%D0%BF%D0%B0%D1%80%D0%BA%20%D0%94%D1%83%D1%80%D0%BC%D1%96%D1%82%D0%BE%D1%80%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "⛰️"
      }
    ],
    whatToBuy: ['Пршут (м\'ясний делікатес)', 'Місцеве вино (Вранац)', 'Сир (Негушський)', 'Оливкова олія'],
    gridClass: 'large',
    bestMonths: [6, 7, 8, 9],
    region: 'Europe'
  },
  {
    id: 'albania',
    name: 'Албанія',
    season: 'Червень - Вересень',
    seasonIcon: '☀️',
    image: '/images/destinations/albania.webp',
    flag: '🇦🇱',
    icon: '🏖️',
    desc: 'Прихована перлина Балкан. Чисті пляжі Албанської Рив\'єри та стародавні міста.',
    price: 'від 320$',
    highlights: ['Доступні ціни', 'Албанська Рів\'єра', 'Античні руїни', 'Гостинність'],
    tags: ['Море', 'Європа'],
    whatToSee: ['Саранда та пляжі', 'Берат (місто тисячі вікон)', 'Гіроокастра', 'Дуррес'],
    attractions: [
      {
        name: "Саранда та пляжі",
        description: "Кристально чиста вода Іонічного моря. Пляж Ксаміль з його бірюзовими лагунами нагадує Мальдіви.",
        image: "https://image.pollinations.ai/prompt/%D0%A1%D0%B0%D1%80%D0%B0%D0%BD%D0%B4%D0%B0%20%D1%82%D0%B0%20%D0%BF%D0%BB%D1%8F%D0%B6%D1%96%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🏖️"
      },
      {
        name: "Берат",
        description: "Місто тисячі вікон. Білі османські будинки, що каскадом спускаються з гори, внесені до ЮНЕСКО.",
        image: "https://image.pollinations.ai/prompt/%D0%91%D0%B5%D1%80%D0%B0%D1%82%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🏘️"
      },
      {
        name: "Гіроокастра",
        description: "Кам'яне місто з величезною фортецею. Батьківщина Ісмаїла Кадаре та справжній музей під відкритим небом.",
        image: "https://image.pollinations.ai/prompt/%D0%93%D1%96%D1%80%D0%BE%D0%BE%D0%BA%D0%B0%D1%81%D1%82%D1%80%D0%B0%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🏰"
      },
      {
        name: "Блакитне око (Syri i Kaltër)",
        description: "Природне джерело з неймовірно блакитною водою. Глибина невідома — дайвери так і не дісталися дна.",
        image: "https://image.pollinations.ai/prompt/%D0%91%D0%BB%D0%B0%D0%BA%D0%B8%D1%82%D0%BD%D0%B5%20%D0%BE%D0%BA%D0%BE%20Syri%20i%20Kalt%C3%ABr%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "💧"
      }
    ],
    whatToBuy: ['Ракія', 'Вишиті вироби', 'Оливкова олія', 'Традиційний одяг'],
    bestMonths: [6, 7, 8, 9],
    region: 'Europe'
  },
  {
    id: 'france',
    name: 'Франція',
    season: 'Цілий рік',
    seasonIcon: '🗼',
    image: '/images/destinations/france.webp',
    flag: '🇫🇷',
    icon: '🥐',
    desc: 'Романтика Парижа, лавандові поля Провансу та розкіш Лазурного берега.',
    price: 'від 500$',
    highlights: ['Ейфелева вежа', 'Лувр', 'Версаль', 'Діснейленд'],
    tags: ['Європа', 'Екскурсії', 'Романтика'],
    whatToSee: ['Ейфелева вежа', 'Лувр', 'Мон-Сен-Мішель', 'Лазурний берег'],
    tips: [
      'У ресторанах воду з крана (une carafe d\'eau) подають безкоштовно.',
      'Вітайтеся "Bonjour" при вході в магазин - це обов\'язково.',
      'Метро Парижа дуже заплутане, користуйтеся Citymapper.',
      'Квитки в Лувр треба бронювати за кілька тижнів.'
    ],
    attractions: [
      {
        name: "Ейфелева вежа",
        description: "Залізна леді Парижа. Символ романтики та інженерного генія Гюстава Ейфеля.",
        image: "https://image.pollinations.ai/prompt/%D0%95%D0%B9%D1%84%D0%B5%D0%BB%D0%B5%D0%B2%D0%B0%20%D0%B2%D0%B5%D0%B6%D0%B0%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🗼"
      },
      {
        name: "Лувр",
        description: "Найбільший художній музей світу. Мона Ліза, Венера Мілоська та тисячі інших шедеврів.",
        image: "https://image.pollinations.ai/prompt/%D0%9B%D1%83%D0%B2%D1%80%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🎨"
      },
      {
        name: "Мон-Сен-Мішель",
        description: "Абатство на скелястому острові, яке стає неприступним під час припливу. Магічне місце.",
        image: "https://image.pollinations.ai/prompt/%D0%9C%D0%BE%D0%BD-%D0%A1%D0%B5%D0%BD-%D0%9C%D1%96%D1%88%D0%B5%D0%BB%D1%8C%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🏰"
      },
      {
        name: "Лазурний берег",
        description: "Ніцца, Канни, Монако. Розкішні пляжі, яхти та атмосфера красивого життя.",
        image: "https://image.pollinations.ai/prompt/%D0%9B%D0%B0%D0%B7%D1%83%D1%80%D0%BD%D0%B8%D0%B9%20%D0%B1%D0%B5%D1%80%D0%B5%D0%B3%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🌊"
      }
    ],
    whatToBuy: ['Парфуми', 'Сири', 'Вино', 'Модний одяг'],
    souvenirs: [
      {
        name: "Французькі парфуми",
        description: "Класика від Chanel, Dior або нішеві аромати з Грасса - парфумерної столиці світу.",
        image: "https://image.pollinations.ai/prompt/%D0%A4%D1%80%D0%B0%D0%BD%D1%86%D1%83%D0%B7%D1%8C%D0%BA%D1%96%20%D0%BF%D0%B0%D1%80%D1%84%D1%83%D0%BC%D0%B8%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🧴"
      },
      {
        name: "Сири (Камамбер)",
        description: "Справжній французький сир з пліснявою. Найкраще смакує з багетом та вином.",
        image: "https://image.pollinations.ai/prompt/%D0%A1%D0%B8%D1%80%D0%B8%20%D0%9A%D0%B0%D0%BC%D0%B0%D0%BC%D0%B1%D0%B5%D1%80%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🧀"
      },
      {
        name: "Макаронс",
        description: "Знамените французьке тістечко. Ladurée або Pierre Hermé - еталон смаку.",
        image: "https://image.pollinations.ai/prompt/%D0%9C%D0%B0%D0%BA%D0%B0%D1%80%D0%BE%D0%BD%D1%81%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🍩"
      },
      {
        name: "Берет",
        description: "Стереотипний, але стильний аксесуар. Додає французького шарму будь-якому образу.",
        image: "https://image.pollinations.ai/prompt/%D0%91%D0%B5%D1%80%D0%B5%D1%82%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "👒"
      }
    ],
    bestMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    region: 'Europe'
  },
  {
    id: 'italy',
    name: 'Італія',
    season: 'Цілий рік',
    seasonIcon: '🍕',
    image: '/images/destinations/italy.webp',
    flag: '🇮🇹',
    icon: '🎭',
    desc: 'Музей просто неба. Колізей, канали Венеції та мода Мілану.',
    price: 'від 480$',
    highlights: ['Колізей', 'Венеція', 'Ватикан', 'Піца та паста'],
    tags: ['Європа', 'Екскурсії', 'Гастро'],
    whatToSee: ['Колізей (Рим)', 'Гранд-канал (Венеція)', 'Пізанська вежа', 'Флоренція'],
    tips: [
      'Coperto (плата за сервіс) автоматично включається в чек.',
      'Капучіно п\'ють тільки на сніданок (до 11 ранку).',
      'Компостуйте квитки на поїзд перед посадкою!',
      'Джелато (морозиво) шукайте там, де воно в закритих контейнерах.'
    ],
    attractions: [
      {
        name: "Колізей (Рим)",
        description: "Символ Риму та вічності. Найбільший амфітеатр античного світу, де колись билися гладіатори.",
        image: "https://image.pollinations.ai/prompt/%D0%9A%D0%BE%D0%BB%D1%96%D0%B7%D0%B5%D0%B9%20%D0%A0%D0%B8%D0%BC%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "⚔️"
      },
      {
        name: "Венеція",
        description: "Місто на воді. Прогулянка на гондолі Гранд-каналом - це найромантичніша пригода.",
        image: "https://image.pollinations.ai/prompt/%D0%92%D0%B5%D0%BD%D0%B5%D1%86%D1%96%D1%8F%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🛶"
      },
      {
        name: "Пізанська вежа",
        description: "Архітектурний курйоз, що став світовим символом. Обов'язкове фото, де ви її 'підтримуєте'.",
        image: "https://image.pollinations.ai/prompt/%D0%9F%D1%96%D0%B7%D0%B0%D0%BD%D1%81%D1%8C%D0%BA%D0%B0%20%D0%B2%D0%B5%D0%B6%D0%B0%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🗼"
      },
      {
        name: "Флоренція",
        description: "Колиска Відродження. Собор Санта-Марія-дель-Фйоре та галерея Уффіці вражають.",
        image: "https://image.pollinations.ai/prompt/%D0%A4%D0%BB%D0%BE%D1%80%D0%B5%D0%BD%D1%86%D1%96%D1%8F%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🎨"
      }
    ],
    whatToBuy: ['Шкіряні вироби', 'Венеціанські маски', 'Оливкова олія', 'Брендовий одяг'],
    souvenirs: [
      {
        name: "Венеціанська маска",
        description: "Вишуканий сувенір ручної роботи, що передає атмосферу знаменитого карнавалу.",
        image: "https://image.pollinations.ai/prompt/%D0%92%D0%B5%D0%BD%D0%B5%D1%86%D1%96%D0%B0%D0%BD%D1%81%D1%8C%D0%BA%D0%B0%20%D0%BC%D0%B0%D1%81%D0%BA%D0%B0%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🎭"
      },
      {
        name: "Шкіряна сумка",
        description: "Флоренція славиться своїми майстрами шкіряної справи. Якість, яка служить роками.",
        image: "https://image.pollinations.ai/prompt/%D0%A8%D0%BA%D1%96%D1%80%D1%8F%D0%BD%D0%B0%20%D1%81%D1%83%D0%BC%D0%BA%D0%B0%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "👜"
      },
      {
        name: "Лімончелло",
        description: "Солодкий лимонний лікер з півдня Італії. Смак літа в кожній краплі.",
        image: "https://image.pollinations.ai/prompt/%D0%9B%D1%96%D0%BC%D0%BE%D0%BD%D1%87%D0%B5%D0%BB%D0%BB%D0%BE%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🍋"
      },
      {
        name: "Паста та соуси",
        description: "Справжня італійська паста ручної роботи та песто - ідеальний подарунок для кухні.",
        image: "https://image.pollinations.ai/prompt/%D0%9F%D0%B0%D1%81%D1%82%D0%B0%20%D1%82%D0%B0%20%D1%81%D0%BE%D1%83%D1%81%D0%B8%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🍝"
      }
    ],
    bestMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    region: 'Europe'
  },
  {
    id: 'croatia',
    name: 'Хорватія',
    season: 'Червень - Вересень',
    seasonIcon: '☀️',
    image: '/images/destinations/croatia.webp',
    flag: '🇭🇷',
    icon: '🌊',
    desc: 'Країна тисячі островів. Кришталево чисте море та Дубровник.',
    price: 'від 420$',
    highlights: ['Плітвіцькі озера', 'Дубровник', 'Яхтинг', 'Острови'],
    tags: ['Європа', 'Море', 'Природа'],
    whatToSee: ['Дубровник (стіни)', 'Плітвіцькі озера', 'Палац Діоклетіана (Спліт)', 'Амфітеатр у Пулі'],
    tips: [
      'Купуйте коралові тапочки, оскільки багато пляжів галькові.',
      'Вода з-під крана придатна для пиття.',
      'Спробуйте "паштицаду" - традиційну тушковану яловичину.',
      'Якщо їдете власним авто, остерігайтеся платних доріг (вони дорогі).'
    ],
    attractions: [
      {
        name: "Дубровник",
        description: "Королівська Гавань з 'Гри Престолів'. Величні міські стіни та червоні дахи над Адріатикою.",
        image: "https://image.pollinations.ai/prompt/%D0%94%D1%83%D0%B1%D1%80%D0%BE%D0%B2%D0%BD%D0%B8%D0%BA%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🏰"
      },
      {
        name: "Плітвіцькі озера",
        description: "Нацпарк з каскадом озер та водоспадів. Вода неймовірного бірюзового кольору.",
        image: "https://image.pollinations.ai/prompt/%D0%9F%D0%BB%D1%96%D1%82%D0%B2%D1%96%D1%86%D1%8C%D0%BA%D1%96%20%D0%BE%D0%B7%D0%B5%D1%80%D0%B0%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🌊"
      },
      {
        name: "Палац Діоклетіана",
        description: "Стародавній палац у Спліті, який перетворився на живе місто з вузькими вуличками.",
        image: "https://image.pollinations.ai/prompt/%D0%9F%D0%B0%D0%BB%D0%B0%D1%86%20%D0%94%D1%96%D0%BE%D0%BA%D0%BB%D0%B5%D1%82%D1%96%D0%B0%D0%BD%D0%B0%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🏛️"
      },
      {
        name: "Амфітеатр Пули",
        description: "Один із шести найбільших збережених римських амфітеатрів світу.",
        image: "https://image.pollinations.ai/prompt/%D0%90%D0%BC%D1%84%D1%96%D1%82%D0%B5%D0%B0%D1%82%D1%80%20%D0%9F%D1%83%D0%BB%D0%B8%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🏟️"
      }
    ],
    whatToBuy: ['Краватки', 'Лаванда', 'Пажський сир', 'Трюфелі'],
    souvenirs: [
      {
        name: "Краватка",
        description: "Батьківщина краватки - Хорватія (від слова 'Croata'). Елегантний подарунок.",
        image: "https://image.pollinations.ai/prompt/%D0%9A%D1%80%D0%B0%D0%B2%D0%B0%D1%82%D0%BA%D0%B0%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "👔"
      },
      {
        name: "Лаванда",
        description: "Хорватська лаванда вважається однією з найякісніших. Саше або олія.",
        image: "https://image.pollinations.ai/prompt/%D0%9B%D0%B0%D0%B2%D0%B0%D0%BD%D0%B4%D0%B0%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🌾"
      },
      {
        name: "Пажський сир",
        description: "Твердий овечий сир з острова Паг. Має пікантний солоний смак.",
        image: "https://image.pollinations.ai/prompt/%D0%9F%D0%B0%D0%B6%D1%81%D1%8C%D0%BA%D0%B8%D0%B9%20%D1%81%D0%B8%D1%80%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🧀"
      },
      {
        name: "Трюфелі",
        description: "Істрія славиться своїми трюфелями. Паста з трюфелів (tartufata) - хіт продажів.",
        image: "https://image.pollinations.ai/prompt/%D0%A2%D1%80%D1%8E%D1%84%D0%B5%D0%BB%D1%96%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🍄"
      }
    ],
    bestMonths: [6, 7, 8, 9],
    region: 'Europe'
  },
  {
    id: 'bulgaria',
    name: 'Болгарія',
    season: 'Червень - Вересень',
    seasonIcon: '🌻',
    image: '/images/destinations/bulgaria.webp',
    flag: '🇧🇬',
    icon: '🏖️',
    desc: 'Золоті піски та гостинність. Ідеально для сімейного відпочинку.',
    price: 'від 250$',
    highlights: ['Золоті Піски', 'Сонячний Берег', 'Несебр', 'Троянди'],
    tags: ['Європа', 'Море', 'Бюджетно'],
    whatToSee: ['Старий Несебр', 'Рильський монастир', 'Шипка', 'Ботанічний сад у Балчику'],
    tips: [
      'У Болгарії кивок головою означає "ні", а похитування - "так". Не переплутайте!',
      'Валюта - лев (не євро).',
      'Порції в ресторанах зазвичай величезні.',
      'Спробуйте кисле молоко (кисело мляко) - воно дуже корисне.'
    ],
    attractions: [
      {
        name: "Старий Несебр",
        description: "Місто-музей на півострові. Старовинні церкви, дерев'яні будиночки та вузькі вулички.",
        image: "https://image.pollinations.ai/prompt/%D0%A1%D1%82%D0%B0%D1%80%D0%B8%D0%B9%20%D0%9D%D0%B5%D1%81%D0%B5%D0%B1%D1%80%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🏘️"
      },
      {
        name: "Рильський монастир",
        description: "Головна святиня Болгарії в горах. Вражає своїми розписами та архітектурою.",
        image: "https://image.pollinations.ai/prompt/%D0%A0%D0%B8%D0%BB%D1%8C%D1%81%D1%8C%D0%BA%D0%B8%D0%B9%20%D0%BC%D0%BE%D0%BD%D0%B0%D1%81%D1%82%D0%B8%D1%80%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "⛪"
      },
      {
        name: "Ботанічний сад Балчик",
        description: "Колишня резиденція румунської королеви. Величезна колекція кактусів та троянд.",
        image: "https://image.pollinations.ai/prompt/%D0%91%D0%BE%D1%82%D0%B0%D0%BD%D1%96%D1%87%D0%BD%D0%B8%D0%B9%20%D1%81%D0%B0%D0%B4%20%D0%91%D0%B0%D0%BB%D1%87%D0%B8%D0%BA%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🌺"
      },
      {
        name: "Сім Рильських озер",
        description: "Льодовикові озера в горах. Неймовірний хайкінг для любителів природи.",
        image: "https://image.pollinations.ai/prompt/%D0%A1%D1%96%D0%BC%20%D0%A0%D0%B8%D0%BB%D1%8C%D1%81%D1%8C%D0%BA%D0%B8%D1%85%20%D0%BE%D0%B7%D0%B5%D1%80%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "⛰️"
      }
    ],
    whatToBuy: ['Рожева олія', 'Кераміка', 'Спеції (Шарена соль)', 'Рахат-лукум'],
    souvenirs: [
      {
        name: "Рожева олія",
        description: "Болгарія - країна троянд. Косметика на основі трояндової олії тут найкраща.",
        image: "https://image.pollinations.ai/prompt/%D0%A0%D0%BE%D0%B6%D0%B5%D0%B2%D0%B0%20%D0%BE%D0%BB%D1%96%D1%8F%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🌹"
      },
      {
        name: "Шарена соль",
        description: "Традиційна суміш спецій. Дуже смачна з хлібом та олією.",
        image: "https://image.pollinations.ai/prompt/%D0%A8%D0%B0%D1%80%D0%B5%D0%BD%D0%B0%20%D1%81%D0%BE%D0%BB%D1%8C%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🧂"
      },
      {
        name: "Кераміка",
        description: "Троянська кераміка з характерними візерунками. Яскрава і практична.",
        image: "https://image.pollinations.ai/prompt/%D0%9A%D0%B5%D1%80%D0%B0%D0%BC%D1%96%D0%BA%D0%B0%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🏺"
      },
      {
        name: "Рахат-лукум",
        description: "Солодощі з додаванням трояндової води. Ніжний та ароматний.",
        image: "https://image.pollinations.ai/prompt/%D0%A0%D0%B0%D1%85%D0%B0%D1%82-%D0%BB%D1%83%D0%BA%D1%83%D0%BC%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🍬"
      }
    ],
    bestMonths: [6, 7, 8, 9],
    region: 'Europe'
  },
  {
    id: 'cyprus',
    name: 'Кіпр',
    season: 'Травень - Листопад',
    seasonIcon: '🍇',
    image: '/images/destinations/cyprus.webp',
    flag: '🇨🇾',
    icon: '🏝️',
    desc: 'Острів Афродіти. Сонце 300 днів на рік та смачна кухня.',
    price: 'від 400$',
    highlights: ['Айя-Напа', 'Пафос', 'Пляж Ніссі', 'Мезе'],
    tags: ['Європа', 'Море', 'Острови'],
    whatToSee: ['Скеля Афродіти', 'Царські гробниці', 'Монастир Кіккос', 'Мис Греко'],
    tips: [
      'Рух тут лівосторонній (спадок Британії), будьте уважні!',
      'Всі пляжі муніципальні та безкоштовні.',
      'Найсмачніша їжа - у тавернах, де сидять місцеві.',
      'Розетки британського типу (потрібен перехідник).'
    ],
    attractions: [
      {
        name: "Скеля Афродіти",
        description: "Місце народження богині краси. Легенда каже: викупаєшся тут - помолодшаєш.",
        image: "https://image.pollinations.ai/prompt/%D0%A1%D0%BA%D0%B5%D0%BB%D1%8F%20%D0%90%D1%84%D1%80%D0%BE%D0%B4%D1%96%D1%82%D0%B8%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🌊"
      },
      {
        name: "Царські гробниці",
        description: "Величний некрополь у Пафосі, висічений у скелях. Світова спадщина ЮНЕСКО.",
        image: "https://image.pollinations.ai/prompt/%D0%A6%D0%B0%D1%80%D1%81%D1%8C%D0%BA%D1%96%20%D0%B3%D1%80%D0%BE%D0%B1%D0%BD%D0%B8%D1%86%D1%96%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🏛️"
      },
      {
        name: "Мис Греко",
        description: "Національний парк з блакитними лагунами, печерами та містком закоханих.",
        image: "https://image.pollinations.ai/prompt/%D0%9C%D0%B8%D1%81%20%D0%93%D1%80%D0%B5%D0%BA%D0%BE%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🏞️"
      },
      {
        name: "Пляж Ніссі",
        description: "Найпопулярніший пляж Айя-Напи з білим піском і бірюзовою водою.",
        image: "https://image.pollinations.ai/prompt/%D0%9F%D0%BB%D1%8F%D0%B6%20%D0%9D%D1%96%D1%81%D1%81%D1%96%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🏖️"
      }
    ],
    whatToBuy: ['Сир Халумі', 'Вино Коммандарія', 'Срібло (Лефкара)', 'Оливкова олія'],
    souvenirs: [
      {
        name: "Сир Халумі",
        description: "Кіпрський сир для смаження. Краще купувати вакуумований, щоб довезти.",
        image: "https://image.pollinations.ai/prompt/%D0%A1%D0%B8%D1%80%20%D0%A5%D0%B0%D0%BB%D1%83%D0%BC%D1%96%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🧀"
      },
      {
        name: "Вино Коммандарія",
        description: "Найстаріше вино у світі, яке досі виробляють. Солодке та густе.",
        image: "https://image.pollinations.ai/prompt/%D0%92%D0%B8%D0%BD%D0%BE%20%D0%9A%D0%BE%D0%BC%D0%BC%D0%B0%D0%BD%D0%B4%D0%B0%D1%80%D1%96%D1%8F%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🍷"
      },
      {
        name: "Лефкарітика",
        description: "Знамените мереживо з села Лефкара. Внесено до спадщини ЮНЕСКО.",
        image: "https://image.pollinations.ai/prompt/%D0%9B%D0%B5%D1%84%D0%BA%D0%B0%D1%80%D1%96%D1%82%D0%B8%D0%BA%D0%B0%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🧶"
      },
      {
        name: "Сироп ріжкового дерева",
        description: "Корисний замінник цукру та шоколаду. 'Чорне золото' Кіпру.",
        image: "https://image.pollinations.ai/prompt/%D0%A1%D0%B8%D1%80%D0%BE%D0%BF%20%D1%80%D1%96%D0%B6%D0%BA%D0%BE%D0%B2%D0%BE%D0%B3%D0%BE%20%D0%B4%D0%B5%D1%80%D0%B5%D0%B2%D0%B0%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🍯"
      }
    ],
    bestMonths: [5, 6, 7, 8, 9, 10, 11],
    region: 'Europe'
  },
  {
    id: 'czechia',
    name: 'Чехія',
    season: 'Цілий рік',
    seasonIcon: '🏰',
    image: '/images/destinations/czechia.webp',
    flag: '🇨🇿',
    icon: '🍺',
    desc: 'Серце Європи. Містична Прага, замки та найкраще пиво.',
    price: 'від 300$',
    highlights: ['Прага', 'Карлові Вари', 'Замки', 'Пивоварні'],
    tags: ['Європа', 'Екскурсії', 'Гастро'],
    whatToSee: ['Карлів міст', 'Празький град', 'Староміська площа', 'Чеський Крумлов'],
    tips: [
      'Остерігайтеся обмінників з написом "0% commission" - там часто поганий курс.',
      'Громадський транспорт в Празі працює як годинник.',
      'Спробуйте "вепрево коліно" (рульку), але беріть одну на двох!',
      'Рано вранці (до 7:00) на Карловому мосту немає людей.'
    ],
    attractions: [
      {
        name: "Карлів міст",
        description: "Середньовічний міст через Влтаву. Магія, статуї та вуличні музиканти.",
        image: "https://image.pollinations.ai/prompt/%D0%9A%D0%B0%D1%80%D0%BB%D1%96%D0%B2%20%D0%BC%D1%96%D1%81%D1%82%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🌉"
      },
      {
        name: "Празький Град",
        description: "Найбільший замковий комплекс світу. Собор святого Віта видно звідусіль.",
        image: "https://image.pollinations.ai/prompt/%D0%9F%D1%80%D0%B0%D0%B7%D1%8C%D0%BA%D0%B8%D0%B9%20%D0%93%D1%80%D0%B0%D0%B4%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🏰"
      },
      {
        name: "Чеський Крумлов",
        description: "Казкове містечко з червоними дахами та замком, оточене річкою. Час тут зупинився.",
        image: "https://image.pollinations.ai/prompt/%D0%A7%D0%B5%D1%81%D1%8C%D0%BA%D0%B8%D0%B9%20%D0%9A%D1%80%D1%83%D0%BC%D0%BB%D0%BE%D0%B2%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🏘️"
      },
      {
        name: "Староміська площа",
        description: "Серце Праги з астрономічним годинником (Орлой), де фігурки рухаються щогодини.",
        image: "https://image.pollinations.ai/prompt/%D0%A1%D1%82%D0%B0%D1%80%D0%BE%D0%BC%D1%96%D1%81%D1%8C%D0%BA%D0%B0%20%D0%BF%D0%BB%D0%BE%D1%89%D0%B0%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🕰️"
      }
    ],
    whatToBuy: ['Богемське скло', 'Гранат', 'Вафлі (оплатки)', 'Бехеровка'],
    souvenirs: [
      {
        name: "Бехеровка",
        description: "Трав'яний лікер з Карлових Вар. Лікує тіло і веселить душу.",
        image: "https://image.pollinations.ai/prompt/%D0%91%D0%B5%D1%85%D0%B5%D1%80%D0%BE%D0%B2%D0%BA%D0%B0%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🍾"
      },
      {
        name: "Чеський гранат",
        description: "Камінь кольору голубиної крові. Купуйте тільки з сертифікатом.",
        image: "https://image.pollinations.ai/prompt/%D0%A7%D0%B5%D1%81%D1%8C%D0%BA%D0%B8%D0%B9%20%D0%B3%D1%80%D0%B0%D0%BD%D0%B0%D1%82%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "💍"
      },
      {
        name: "Оплатки",
        description: "Тонкі хрусткі вафлі з начинкою. Найсмачніші - теплі.",
        image: "https://image.pollinations.ai/prompt/%D0%9E%D0%BF%D0%BB%D0%B0%D1%82%D0%BA%D0%B8%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🧇"
      },
      {
        name: "Крітек (Кріт)",
        description: "Іграшка з відомого мультфільму, яку обожнюють діти і дорослі.",
        image: "https://image.pollinations.ai/prompt/%D0%9A%D1%80%D1%96%D1%82%D0%B5%D0%BA%20%D0%9A%D1%80%D1%96%D1%82%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🧸"
      }
    ],
    bestMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    region: 'Europe'
  },


  // ASIA
  {
    id: 'uae',
    name: 'ОАЕ',
    season: 'Жовтень - Квітень',
    seasonIcon: '🏙️',
    image: '/images/destinations/uae.webp',
    flag: '🇦🇪',
    icon: '🌃',
    desc: 'Дубай - місто майбутнього. Розкіш, хмарочоси та пустеля.',
    price: 'від 550$',
    highlights: ['Бурдж Халіфа', 'Шопінг', 'Джип-сафарі', 'Пляжі'],
    tags: ['Екзотика', 'Шопінг'],
    whatToSee: ['Бурдж Халіфа', 'Мечеть шейха Заїда', 'Дубай Молл', 'Пальма Джумейра'],
    tips: [
      'Уникайте проявів почуттів (поцілунків) у публічних місцях.',
      'Метро - найзручніший спосіб пересування Дубаєм.',
      'П\'ятниця - священний день, графік роботи може змінюватися.',
      'Одягайтеся стримано в торгових центрах і громадських місцях.'
    ],
    attractions: [
      {
        name: "Бурдж Халіфа",
        description: "Найвища будівля у світі. Підніміться на 148 поверх, щоб побачити Дубай з висоти пташиного польоту.",
        image: "https://image.pollinations.ai/prompt/%D0%91%D1%83%D1%80%D0%B4%D0%B6%20%D0%A5%D0%B0%D0%BB%D1%96%D1%84%D0%B0%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🏙️"
      },
      {
        name: "Мечеть Шейха Заїда",
        description: "Білосніжна мечеть в Абу-Дабі, що вражає своєю розкішшю, килимами та люстрами Swarovski.",
        image: "https://image.pollinations.ai/prompt/%D0%9C%D0%B5%D1%87%D0%B5%D1%82%D1%8C%20%D0%A8%D0%B5%D0%B9%D1%85%D0%B0%20%D0%97%D0%B0%D1%97%D0%B4%D0%B0%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🕌"
      },
      {
        name: "Пустельне Сафарі",
        description: "Екстремальна поїздка на джипах по барханах, вечеря під зорями та танці живота.",
        image: "https://image.pollinations.ai/prompt/%D0%9F%D1%83%D1%81%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%B5%20%D0%A1%D0%B0%D1%84%D0%B0%D1%80%D1%96%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🚙"
      },
      {
        name: "Музей Майбутнього",
        description: "Одна з найкрасивіших будівель світу. Подорож у світ технологій та інновацій завтрашнього дня.",
        image: "https://image.pollinations.ai/prompt/%D0%9C%D1%83%D0%B7%D0%B5%D0%B9%20%D0%9C%D0%B0%D0%B9%D0%B1%D1%83%D1%82%D0%BD%D1%8C%D0%BE%D0%B3%D0%BE%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🚀"
      }
    ],
    whatToBuy: ['Золото та прикраси', 'Парфуми', 'Фініки', 'Електроніка'],
    souvenirs: [
      {
        name: "Фініки (Bateel)",
        description: "Королівський делікатес. Фініки в шоколаді або з горіхами - це смак сходу.",
        image: "https://image.pollinations.ai/prompt/%D0%A4%D1%96%D0%BD%D1%96%D0%BA%D0%B8%20Bateel%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🍮"
      },
      {
        name: "Арабські парфуми",
        description: "Насичені аромати на основі олії уд (agarwood). Стійкі та шлейфові.",
        image: "https://image.pollinations.ai/prompt/%D0%90%D1%80%D0%B0%D0%B1%D1%81%D1%8C%D0%BA%D1%96%20%D0%BF%D0%B0%D1%80%D1%84%D1%83%D0%BC%D0%B8%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🧴"
      },
      {
        name: "Золото",
        description: "Золотий ринок Дубая пропонує прикраси за одними з найвигідніших цін у світі.",
        image: "https://image.pollinations.ai/prompt/%D0%97%D0%BE%D0%BB%D0%BE%D1%82%D0%BE%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "💍"
      },
      {
        name: "Кавник Далла",
        description: "Традиційний арабський кавник - символ гостинності. Чудовий елемент декору.",
        image: "https://image.pollinations.ai/prompt/%D0%9A%D0%B0%D0%B2%D0%BD%D0%B8%D0%BA%20%D0%94%D0%B0%D0%BB%D0%BB%D0%B0%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "☕"
      }
    ],
    gridClass: 'large',
    bestMonths: [10, 11, 12, 1, 2, 3, 4],
    region: 'Asia'
  },
  {
    id: 'thailand',
    name: 'Таїланд',
    season: 'Листопад - Березень',
    seasonIcon: '🍜',
    image: '/images/destinations/thailand.webp',
    flag: '🇹🇭',
    icon: '🐘',
    desc: 'Країна посмішок. Екзотичні храми, неймовірна природа та смачна їжа.',
    price: 'від 750$',
    highlights: ['Пхукет', 'Бангкок', 'Тайський масаж', 'Острови'],
    tags: ['Екзотика', 'Море'],
    whatToSee: ['Королівський палац (Бангкок)', 'Острови Пхі-Пхі', 'Храм Істини', 'Пляж Рейлі'],
    tips: [
      'Не торкайтеся голови тайців - це вважається неповагою.',
      'Знімайте взуття перед входом у храми та будинки.',
      'Вулична їжа (Street food) - безпечна і найсмачніша.',
      'Tuk-tuk - це атракціон, таксі з лічильником дешевше.'
    ],
    attractions: [
      {
        name: "Острови Пхі-Пхі",
        description: "Візитна картка Таїланду. Смарагдова вода, прямовисні скелі та бухта Майя-Бей з фільму 'Пляж'.",
        image: "https://image.pollinations.ai/prompt/%D0%9E%D1%81%D1%82%D1%80%D0%BE%D0%B2%D0%B8%20%D0%9F%D1%85%D1%96-%D0%9F%D1%85%D1%96%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🏝️"
      },
      {
        name: "Королівський палац",
        description: "Комплекс храмів у Бангкоку. Неймовірна деталізація, золото та статуя Смарагдового Будди.",
        image: "https://image.pollinations.ai/prompt/%D0%9A%D0%BE%D1%80%D0%BE%D0%BB%D1%96%D0%B2%D1%81%D1%8C%D0%BA%D0%B8%D0%B9%20%D0%BF%D0%B0%D0%BB%D0%B0%D1%86%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "👑"
      },
      {
        name: "Храм Істини",
        description: "Гігантський храм у Паттаї, побудований повністю з дерева без жодного цвяха.",
        image: "https://image.pollinations.ai/prompt/%D0%A5%D1%80%D0%B0%D0%BC%20%D0%86%D1%81%D1%82%D0%B8%D0%BD%D0%B8%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🪵"
      },
      {
        name: "Плавучий ринок",
        description: "Традиційна торгівля з човнів. Колоритно, галасливо і дуже смачно.",
        image: "https://image.pollinations.ai/prompt/%D0%9F%D0%BB%D0%B0%D0%B2%D1%83%D1%87%D0%B8%D0%B9%20%D1%80%D0%B8%D0%BD%D0%BE%D0%BA%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🛶"
      }
    ],
    whatToBuy: ['Тайський шовк', 'Кокосова олія', 'Спеції', 'Вироби з дерева'],
    souvenirs: [
      {
        name: "Кокосова олія",
        description: "Найкращий натуральний засіб для шкіри та волосся. У Таїланді вона найякісніша.",
        image: "https://image.pollinations.ai/prompt/%D0%9A%D0%BE%D0%BA%D0%BE%D1%81%D0%BE%D0%B2%D0%B0%20%D0%BE%D0%BB%D1%96%D1%8F%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🥥"
      },
      {
        name: "Тайський бальзам",
        description: "Легендарний 'Тигровий бальзам' від усіх хвороб. Чудово знімає біль у м'язах.",
        image: "https://image.pollinations.ai/prompt/%D0%A2%D0%B0%D0%B9%D1%81%D1%8C%D0%BA%D0%B8%D0%B9%20%D0%B1%D0%B0%D0%BB%D1%8C%D0%B7%D0%B0%D0%BC%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🐅"
      },
      {
        name: "Штани зі слонами",
        description: "Класичний сувенір бекпекера. Зручні, легкі та дуже 'тайські'.",
        image: "https://image.pollinations.ai/prompt/%D0%A8%D1%82%D0%B0%D0%BD%D0%B8%20%D0%B7%D1%96%20%D1%81%D0%BB%D0%BE%D0%BD%D0%B0%D0%BC%D0%B8%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "👖"
      },
      {
        name: "Синій чай (Анчан)",
        description: "Чай з квіток кліторії, який змінює колір на фіолетовий, якщо додати лимон.",
        image: "https://image.pollinations.ai/prompt/%D0%A1%D0%B8%D0%BD%D1%96%D0%B9%20%D1%87%D0%B0%D0%B9%20%D0%90%D0%BD%D1%87%D0%B0%D0%BD%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🍵"
      }
    ],
    bestMonths: [11, 12, 1, 2, 3],
    region: 'Asia'
  },
  {
    id: 'srilanka',
    name: 'Шрі-Ланка',
    season: 'Цілий рік',
    seasonIcon: '🍵',
    image: '/images/destinations/srilanka.webp',
    flag: '🇱🇰',
    icon: '🐆',
    desc: 'Острів чаю та слонів. Тропічні ліси, океан та давні храми.',
    price: 'від 800$',
    highlights: ['Чайні плантації', 'Сігірія', 'Сафарі', 'Серфінг'],
    tags: ['Екзотика', 'Природа', 'Океан'],
    whatToSee: ['Скеля Сігірія', 'Храм Зуба Будди', 'Нацпарк Яла', 'Міст Дев\'яти арок'],
    tips: [
      'Їжа тут дуже гостра, просіть "no spicy".',
      'В поїздах (маршрут Елла) найкращі види на чайні плантації.',
      'Остерігайтеся п\'явок у джунглях під час дощу.',
      'Час тече повільно, ніхто не поспішає (siga-siga по-ланкійськи).'
    ],
    attractions: [
      {
        name: "Скеля Сігірія",
        description: "Левова скеля. Стародавня фортеця на вершині величезного моноліту посеред джунглів.",
        image: "https://image.pollinations.ai/prompt/%D0%A1%D0%BA%D0%B5%D0%BB%D1%8F%20%D0%A1%D1%96%D0%B3%D1%96%D1%80%D1%96%D1%8F%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🦁"
      },
      {
        name: "Дев\'ятиарковий міст",
        description: "Міст у небі в місті Елла. Якщо пощастить, побачите знаменитий синій поїзд.",
        image: "https://image.pollinations.ai/prompt/%D0%94%D0%B5%D0%B2%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🚂"
      },
      {
        name: "Нацпарк Яла",
        description: "Місце, де можна побачити леопардів, слонів та крокодилів у дикій природі.",
        image: "https://image.pollinations.ai/prompt/%D0%9D%D0%B0%D1%86%D0%BF%D0%B0%D1%80%D0%BA%20%D0%AF%D0%BB%D0%B0%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🐆"
      },
      {
        name: "Чайні плантації",
        description: "Нувара-Елія - маленька Англія. Зелені пагорби, туман та найкращий у світі чай.",
        image: "https://image.pollinations.ai/prompt/%D0%A7%D0%B0%D0%B9%D0%BD%D1%96%20%D0%BF%D0%BB%D0%B0%D0%BD%D1%82%D0%B0%D1%86%D1%96%D1%97%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🍃"
      }
    ],
    whatToBuy: ['Цейлонський чай', 'Дорогоцінне каміння', 'Спеції', 'Батик'],
    souvenirs: [
      {
        name: "Цейлонський чай",
        description: "Збирається вручну. Найкращий подарунок зі Шрі-Ланки. Шукайте лева на упаковці.",
        image: "https://image.pollinations.ai/prompt/%D0%A6%D0%B5%D0%B9%D0%BB%D0%BE%D0%BD%D1%81%D1%8C%D0%BA%D0%B8%D0%B9%20%D1%87%D0%B0%D0%B9%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🍵"
      },
      {
        name: "Сапфіри",
        description: "Шрі-Ланка багата на самоцвіти. Синій сапфір - найвідоміший.",
        image: "https://image.pollinations.ai/prompt/%D0%A1%D0%B0%D0%BF%D1%84%D1%96%D1%80%D0%B8%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "💎"
      },
      {
        name: "Спеції",
        description: "Кориця, кардамон, гвоздика. Відвідайте сад спецій, щоб побачити, як вони ростуть.",
        image: "https://image.pollinations.ai/prompt/%D0%A1%D0%BF%D0%B5%D1%86%D1%96%D1%97%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🌿"
      },
      {
        name: "Маски",
        description: "Традиційні дерев'яні маски, які захищають від злих духів 'Ракша'.",
        image: "https://image.pollinations.ai/prompt/%D0%9C%D0%B0%D1%81%D0%BA%D0%B8%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "👺"
      }
    ],
    bestMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    region: 'Asia'
  },
  {
    id: 'indonesia',
    name: 'Індонезія (Балі)',
    season: 'Квітень - Жовтень',
    seasonIcon: '🏄',
    image: '/images/destinations/indonesia.webp',
    flag: '🇮🇩',
    icon: '🧘',
    desc: 'Острів Богів. Джунглі Убуда, вулкани та неймовірні заходи сонця.',
    price: 'від 1100$',
    highlights: ['Убуд', 'Серфінг', 'Вулкани', 'Рисові тераси'],
    tags: ['Екзотика', 'Океан', 'Релакс'],
    whatToSee: ['Ліс мавп', 'Храм Улувату', 'Вулкан Батур', 'Рисові тераси Тегаллаланг'],
    tips: [
      'Gojek/Grab - це ваші найкращі друзі для таксі та доставки їжі.',
      'Будьте обережні з мавпами, вони крадуть окуляри та телефони!',
      'День тиші (Nyepi) - весь острів завмирає, навіть аеропорт не працює.',
      'Пийте багато кокосової води (Kelapa Muda) для гідратації.'
    ],
    attractions: [
      {
        name: "Рисові тераси",
        description: "Тегаллаланг або Джатілувіх. Смарагдові сходинки, що спускаються з пагорбів. Фотогенічність 100%.",
        image: "https://image.pollinations.ai/prompt/%D0%A0%D0%B8%D1%81%D0%BE%D0%B2%D1%96%20%D1%82%D0%B5%D1%80%D0%B0%D1%81%D0%B8%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🌾"
      },
      {
        name: "Священний Ліс Мавп",
        description: "Джунглі в центрі Убуда, де живуть сотні нахабних, але милих макак. Є стародавні храми.",
        image: "https://image.pollinations.ai/prompt/%D0%A1%D0%B2%D1%8F%D1%89%D0%B5%D0%BD%D0%BD%D0%B8%D0%B9%20%D0%9B%D1%96%D1%81%20%D0%9C%D0%B0%D0%B2%D0%BF%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🐒"
      },
      {
        name: "Храм Улувату",
        description: "Храм на краю 70-метрової скелі над океаном. Найкраще місце для заходу сонця та танцю Кечак.",
        image: "https://image.pollinations.ai/prompt/%D0%A5%D1%80%D0%B0%D0%BC%20%D0%A3%D0%BB%D1%83%D0%B2%D0%B0%D1%82%D1%83%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🌅"
      },
      {
        name: "Нуса Пеніда",
        description: "Сусідній острів з дикими пляжами. Kelingking Beach (пляж динозавра) саме тут.",
        image: "https://image.pollinations.ai/prompt/%D0%9D%D1%83%D1%81%D0%B0%20%D0%9F%D0%B5%D0%BD%D1%96%D0%B4%D0%B0%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🦖"
      }
    ],
    whatToBuy: ['Кава Лювак', 'Вироби з дерева', 'Срібло', 'Батик'],
    souvenirs: [
      {
        name: "Ловець снів",
        description: "Балі - батьківщина ловців снів. Вони тут на кожному кроці, різних розмірів та кольорів.",
        image: "https://image.pollinations.ai/prompt/%D0%9B%D0%BE%D0%B2%D0%B5%D1%86%D1%8C%20%D1%81%D0%BD%D1%96%D0%B2%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🕸️"
      },
      {
        name: "Вироби з дерева",
        description: "Майстри з села Мас вирізають неймовірні статуетки, маски та декор з тикового дерева.",
        image: "https://image.pollinations.ai/prompt/%D0%92%D0%B8%D1%80%D0%BE%D0%B1%D0%B8%20%D0%B7%20%D0%B4%D0%B5%D1%80%D0%B5%D0%B2%D0%B0%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🗿"
      },
      {
        name: "Срібло",
        description: "Село Челук відоме своїми ювелірами. Срібні прикраси тут дуже деталізовані та якісні.",
        image: "https://image.pollinations.ai/prompt/%D0%A1%D1%80%D1%96%D0%B1%D0%BB%D0%BE%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "💍"
      },
      {
        name: "Кава Лювак",
        description: "Найдорожча кава у світі, яку 'виробляють' цивети. Скуштуйте на плантації.",
        image: "https://image.pollinations.ai/prompt/%D0%9A%D0%B0%D0%B2%D0%B0%20%D0%9B%D1%8E%D0%B2%D0%B0%D0%BA%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "☕"
      }
    ],
    bestMonths: [4, 5, 6, 7, 8, 9, 10],
    region: 'Asia'
  },
  {
    id: 'maldives',
    name: 'Мальдіви',
    season: 'Цілий рік',
    seasonIcon: '🥥',
    image: '/images/destinations/maldives.webp',
    flag: '🇲🇻',
    icon: '🏖️',
    desc: 'Рай на землі. Приватні вілли на воді та білосніжний пісок.',
    price: 'від 1500$',
    highlights: ['Водні вілли', 'Снорклінг', 'Релакс', 'Медовий місяць'],
    tags: ['Екзотика', 'Океан', 'VIP'],
    whatToSee: ['Підводний ресторан', 'Мале', 'Біолюмінесцентний пляж', 'Коралові рифи'],
    tips: [
      'Алкоголь заборонений (крім островів-резортів).',
      'Гідролітак - це найшвидший і найкрасивіший трансфер.',
      'Не ламайте корали! За це величезний штраф.',
      'Ввечері можна побачити акул біля пірсу (вони безпечні).'
    ],
    attractions: [
      {
        name: "Водні вілли",
        description: "Символ Мальдів. Прокидатися і стрибати в океан прямо зі своєї тераси - це мрія.",
        image: "https://image.pollinations.ai/prompt/%D0%92%D0%BE%D0%B4%D0%BD%D1%96%20%D0%B2%D1%96%D0%BB%D0%BB%D0%B8%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🏠"
      },
      {
        name: "Сяючий пляж",
        description: "Острів Ваадху відомий своїм планктоном, що світиться вночі як зоряне небо.",
        image: "https://image.pollinations.ai/prompt/%D0%A1%D1%8F%D1%8E%D1%87%D0%B8%D0%B9%20%D0%BF%D0%BB%D1%8F%D0%B6%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "✨"
      },
      {
        name: "Підводний ресторан",
        description: "Вечеря на глибині 5 метрів в оточенні риб та скатів. Унікальний гастрономічний досвід.",
        image: "https://image.pollinations.ai/prompt/%D0%9F%D1%96%D0%B4%D0%B2%D0%BE%D0%B4%D0%BD%D0%B8%D0%B9%20%D1%80%D0%B5%D1%81%D1%82%D0%BE%D1%80%D0%B0%D0%BD%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🍽️"
      },
      {
        name: "Місто Мале",
        description: "Одна з найменших столиць світу. Колоритні рибний та фруктовий ринки, мечеті.",
        image: "https://image.pollinations.ai/prompt/%D0%9C%D1%96%D1%81%D1%82%D0%BE%20%D0%9C%D0%B0%D0%BB%D0%B5%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🏙️"
      }
    ],
    whatToBuy: ['Вироби з кокосу', 'Місцеві сувеніри', 'Рибні консерви'],
    souvenirs: [
      {
        name: "Кокосові вироби",
        description: "З шкаралупи кокосу роблять все: від посуду і ламп до сумок і прикрас.",
        image: "https://image.pollinations.ai/prompt/%D0%9A%D0%BE%D0%BA%D0%BE%D1%81%D0%BE%D0%B2%D1%96%20%D0%B2%D0%B8%D1%80%D0%BE%D0%B1%D0%B8%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🥥"
      },
      {
        name: "Рибні консерви",
        description: "Тунець - головний експорт Мальдів. Спробуйте в\'яленого тунця або паштет.",
        image: "https://image.pollinations.ai/prompt/%D0%A0%D0%B8%D0%B1%D0%BD%D1%96%20%D0%BA%D0%BE%D0%BD%D1%81%D0%B5%D1%80%D0%B2%D0%B8%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🐟"
      },
      {
        name: "Пісок у пляшці",
        description: "Частинка білосніжного мальдівського пляжу (з легальних сувенірних крамниць).",
        image: "https://image.pollinations.ai/prompt/%D0%9F%D1%96%D1%81%D0%BE%D0%BA%20%D1%83%20%D0%BF%D0%BB%D1%8F%D1%88%D1%86%D1%96%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "⏳"
      },
      {
        name: "Акулячі зуби",
        description: "Сушені щелепи або зуби акули - популярний, хоч і трохи страхітливий сувенір.",
        image: "https://image.pollinations.ai/prompt/%D0%90%D0%BA%D1%83%D0%BB%D1%8F%D1%87%D1%96%20%D0%B7%D1%83%D0%B1%D0%B8%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🦈"
      }
    ],
    gridClass: 'large',
    bestMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    region: 'Asia'
  },
  {
    id: 'vietnam',
    name: 'В\'єтнам',
    season: 'Листопад - Квітень',
    seasonIcon: '🏮',
    image: '/images/destinations/vietnam.webp',
    flag: '🇻🇳',
    icon: '🍜',
    desc: 'Країна дракона. Бухта Халонг, смачна вулична їжа та кава.',
    price: 'від 900$',
    highlights: ['Бухта Халонг', 'Фукуок', 'Нячанг', 'Кава'],
    tags: ['Екзотика', 'Море', 'Гастро'],
    whatToSee: ['Бухта Халонг', 'Міст "Руки Бога"', 'Дельта Меконгу', 'Старе місто Хойан'],
    tips: [
      'Переходити дорогу тут - це мистецтво. Ідіть повільно і не зупиняйтеся, байки вас об\'їдуть.',
      'Торгуйтеся на ринках.',
      'Кава зі згущеним молоком - це must try.',
      'В\'єтнам - це не тільки море, а й гори (Сапа) та печери.'
    ],
    attractions: [
      {
        name: "Бухта Халонг",
        description: "Тисячі вапнякових островів, що стирчать з води. Найкраще досліджувати на кораблику.",
        image: "https://image.pollinations.ai/prompt/%D0%91%D1%83%D1%85%D1%82%D0%B0%20%D0%A5%D0%B0%D0%BB%D0%BE%D0%BD%D0%B3%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🐉"
      },
      {
        name: "Золотий Міст",
        description: "Міст у Данангу, який підтримують гігантські кам'яні руки. Виглядає фантастично.",
        image: "https://image.pollinations.ai/prompt/%D0%97%D0%BE%D0%BB%D0%BE%D1%82%D0%B8%D0%B9%20%D0%9C%D1%96%D1%81%D1%82%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🌉"
      },
      {
        name: "Хойан",
        description: "Місто ліхтарів. Особливо гарне ввечері, коли запалюються тисячі паперових ліхтариків.",
        image: "https://image.pollinations.ai/prompt/%D0%A5%D0%BE%D0%B9%D0%B0%D0%BD%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🏮"
      },
      {
        name: "Дельта Меконгу",
        description: "Лабіринт річок і каналів. Життя тут проходить на воді.",
        image: "https://image.pollinations.ai/prompt/%D0%94%D0%B5%D0%BB%D1%8C%D1%82%D0%B0%20%D0%9C%D0%B5%D0%BA%D0%BE%D0%BD%D0%B3%D1%83%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🛶"
      }
    ],
    whatToBuy: ['Кава', 'В\'єтнамські капелюхи', 'Шовк', 'Перли'],
    souvenirs: [
      {
        name: "В'єтнамська кава",
        description: "Робуста з шоколадним присмаком. Купіть також спеціальний фітльр (фін).",
        image: "https://image.pollinations.ai/prompt/%D0%92%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "☕"
      },
      {
        name: "Нон Ла",
        description: "Конічний солом'яний капелюх. Найвпізнаваніший символ В'єтнаму.",
        image: "https://image.pollinations.ai/prompt/%D0%9D%D0%BE%D0%BD%20%D0%9B%D0%B0%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "👒"
      },
      {
        name: "Бальзам 'Зірочка'",
        description: "Так-так, вона родом з В'єтнаму! 'Золота зірка' тут справжній бренд.",
        image: "https://image.pollinations.ai/prompt/%D0%91%D0%B0%D0%BB%D1%8C%D0%B7%D0%B0%D0%BC%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "⭐"
      },
      {
        name: "Шовк",
        description: "Якісний та недорогий. Можна пошити плаття або костюм за один день.",
        image: "https://image.pollinations.ai/prompt/%D0%A8%D0%BE%D0%B2%D0%BA%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "👗"
      }
    ],
    bestMonths: [11, 12, 1, 2, 3, 4],
    region: 'Asia'
  },
  {
    id: 'georgia',
    name: 'Грузія',
    season: 'Цілий рік',
    seasonIcon: '🍷',
    image: '/images/destinations/georgia.webp',
    flag: '🇬🇪',
    icon: '🏔️',
    desc: 'Гостинність та гори. Вино, хачапурі та неймовірні краєвиди Кавказу.',
    price: 'від 300$',
    highlights: ['Тбілісі', 'Батумі', 'Казбегі', 'Виноробні'],
    tags: ['Гори', 'Гастро', 'Море'],
    whatToSee: ['Старий Тбілісі', 'Монастир Джварі', 'Печерне місто Уплісцихе', 'Сванетія'],
    tips: [
      'Вино тут п\'ють рогами, а тости говорять довгі.',
      'Якщо вас запросили в гості - відмовлятися не можна.',
      'У горах погода змінюється миттєво.',
      'Слова "Гамарджоба" (Привіт) достатньо, щоб вам посміхнулися.'
    ],
    attractions: [
      {
        name: "Тбілісі",
        description: "Старе місто з сірчаними лазнями, вузькими вуличками та сучасною архітектурою.",
        image: "https://image.pollinations.ai/prompt/%D0%A2%D0%B1%D1%96%D0%BB%D1%96%D1%81%D1%96%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🏙️"
      },
      {
        name: "Казбегі",
        description: "Гора Казбек та церква Гергеті на висоті 2170 м. Краєвид, від якого перехоплює подих.",
        image: "https://image.pollinations.ai/prompt/%D0%9A%D0%B0%D0%B7%D0%B1%D0%B5%D0%B3%D1%96%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🏔️"
      },
      {
        name: "Сванетія",
        description: "Країна тисячі веж. Високогірний регіон, де збереглися стародавні традиції.",
        image: "https://image.pollinations.ai/prompt/%D0%A1%D0%B2%D0%B0%D0%BD%D0%B5%D1%82%D1%96%D1%8F%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🏰"
      },
      {
        name: "Батумі",
        description: "Сучасний курорт на Чорному морі. Хмарочоси, казино та ботанічний сад.",
        image: "https://image.pollinations.ai/prompt/%D0%91%D0%B0%D1%82%D1%83%D0%BC%D1%96%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🎡"
      }
    ],
    whatToBuy: ['Вино', 'Чурчхела', 'Мінанкарі (емель)', 'Спеції'],
    souvenirs: [
      {
        name: "Грузинське вино",
        description: "Сапераві, Кіндзмараулі. Грузія - колиска виноробства.",
        image: "https://image.pollinations.ai/prompt/%D0%93%D1%80%D1%83%D0%B7%D0%B8%D0%BD%D1%81%D1%8C%D0%BA%D0%B5%20%D0%B2%D0%B8%D0%BD%D0%BE%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🍷"
      },
      {
        name: "Чурчхела",
        description: "Грузинський снікерс. Горіхи у виноградному соку. Смачно та корисно.",
        image: "https://image.pollinations.ai/prompt/%D0%A7%D1%83%D1%80%D1%87%D1%85%D0%B5%D0%BB%D0%B0%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🍇"
      },
      {
        name: "Сванська сіль",
        description: "Ароматна суміш солі та гірських трав. Робить будь-яку страву шедевром.",
        image: "https://image.pollinations.ai/prompt/%D0%A1%D0%B2%D0%B0%D0%BD%D1%81%D1%8C%D0%BA%D0%B0%20%D1%81%D1%96%D0%BB%D1%8C%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🧂"
      },
      {
        name: "Мінанкарі",
        description: "Прикраси з перегородчастої емалі. Дуже тонкка та красива робота.",
        image: "https://image.pollinations.ai/prompt/%D0%9C%D1%96%D0%BD%D0%B0%D0%BD%D0%BA%D0%B0%D1%80%D1%96%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "💍"
      }
    ],
    bestMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    region: 'Asia'
  },


  // AFRICA
  {
    id: 'egypt',
    name: 'Єгипет',
    season: 'Жовтень - Травень',
    seasonIcon: '☀️',
    image: '/images/destinations/egypt.webp',
    flag: '🇪🇬',
    icon: '🐫',
    desc: 'Колиска цивілізації. Відкрийте для себе велич пірамід та красу Червоного моря.',
    price: 'від 400$',
    highlights: ['Дайвінг та снорклінг', 'Піраміди', 'Пустельні сафарі', 'Круїз Нілом'],
    tags: ['Море', 'Екзотика'],
    whatToSee: ['Піраміди Гізи та Сфінкс', 'Луксорський храм', 'Долина царів', 'Рифи Шарм-ель-Шейху'],
    tips: [
      'Пийте тільки бутильовану воду, навіть зуби чистіть нею.',
      'Торгуйтеся скрізь! Ціну можна збити вдвічі.',
      'Беріть з собою коралки для купання в морі.',
      'Сонце дуже активне навіть узимку - крем SPF 50 обов\'язковий.'
    ],
    attractions: [
      {
        name: "Піраміди Гізи",
        description: "Єдине з семи чудес світу, що збереглося до наших днів. Відчуйте дотик вічності.",
        image: "https://image.pollinations.ai/prompt/%D0%9F%D1%96%D1%80%D0%B0%D0%BC%D1%96%D0%B4%D0%B8%20%D0%93%D1%96%D0%B7%D0%B8%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🔺"
      },
      {
        name: "Великий Сфінкс",
        description: "Загадковий охоронець пірамід з тілом лева та головою фараона.",
        image: "https://image.pollinations.ai/prompt/%D0%92%D0%B5%D0%BB%D0%B8%D0%BA%D0%B8%D0%B9%20%D0%A1%D1%84%D1%96%D0%BD%D0%BA%D1%81%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🦁"
      },
      {
        name: "Луксорський храм",
        description: "Величний храмовий комплекс на березі Нілу. Особливо красивий ввечері з підсвіткою.",
        image: "https://image.pollinations.ai/prompt/%D0%9B%D1%83%D0%BA%D1%81%D0%BE%D1%80%D1%81%D1%8C%D0%BA%D0%B8%D0%B9%20%D1%85%D1%80%D0%B0%D0%BC%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🏛️"
      },
      {
        name: "Червоне море",
        description: "Один з найкрасивіших підводних світів планети. Корали та рибки доступні навіть біля берега.",
        image: "https://image.pollinations.ai/prompt/%D0%A7%D0%B5%D1%80%D0%B2%D0%BE%D0%BD%D0%B5%20%D0%BC%D0%BE%D1%80%D0%B5%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🐠"
      }
    ],
    whatToBuy: ['Папірус', 'Ароматичні олії', 'Бавовняні вироби', 'Спеції та чай каркаде'],
    souvenirs: [
      {
        name: "Папірус",
        description: "Картини на справжньому папірусі з сюжетами давньоєгипетської міфології.",
        image: "https://image.pollinations.ai/prompt/%D0%9F%D0%B0%D0%BF%D1%96%D1%80%D1%83%D1%81%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "📜"
      },
      {
        name: "Єгипетські олії",
        description: "Есенції, з яких роблять відомі французькі парфуми, або лікувальні олії (чорний кмин).",
        image: "https://image.pollinations.ai/prompt/%D0%84%D0%B3%D0%B8%D0%BF%D0%B5%D1%82%D1%81%D1%8C%D0%BA%D1%96%20%D0%BE%D0%BB%D1%96%D1%97%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🏺"
      },
      {
        name: "Чай Каркаде",
        description: "Національний напій з суданської троянди (гібіскусу). Смачний гарячим і холодним.",
        image: "https://image.pollinations.ai/prompt/%D0%A7%D0%B0%D0%B9%20%D0%9A%D0%B0%D1%80%D0%BA%D0%B0%D0%B4%D0%B5%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🌺"
      },
      {
        name: "Кальян (Шиша)",
        description: "Традиційний сувенір. Важливо обрати якісний метал, а не декоративний варіант.",
        image: "https://image.pollinations.ai/prompt/%D0%9A%D0%B0%D0%BB%D1%8C%D1%8F%D0%BD%20%D0%A8%D0%B8%D1%88%D0%B0%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "💨"
      }
    ],
    gridClass: 'large',
    bestMonths: [10, 11, 12, 1, 2, 3, 4, 5],
    region: 'Africa'
  },
  {
    id: 'tunisia',
    name: 'Туніс',
    season: 'Квітень - Жовтень',
    seasonIcon: '☀️',
    image: '/images/destinations/tunisia.webp',
    flag: '🇹🇳',
    icon: '🏜️',
    desc: 'Північноафриканська екзотика. Пісок Сахари, Середземне море та карфагенські руїни.',
    price: 'від 380$',
    highlights: ['Сахара', 'Талассотерапія', 'Карфаген', 'Сіді-Бу-Саїд'],
    tags: ['Море', 'Екзотика'],
    whatToSee: ['Сіді-Бу-Саїд', 'Руїни Карфагену', 'Колізей у Ель-Джемі', 'Амфітеатр'],
    tips: [
      'Торгуйтеся до останнього!',
      'Водорості на пляжі - це нормально, їх прибирають.',
      'Не погоджуйтеся на безкоштовні подарунки - потім вимагатимуть гроші.',
      'Жінкам краще не гуляти самим у віддалених районах.'
    ],
    attractions: [
      {
        name: "Сіді-Бу-Саїд",
        description: "Біло-блакитне місто художників. Туніський Санторіні з видом на затоку.",
        image: "https://image.pollinations.ai/prompt/%D0%A1%D1%96%D0%B4%D1%96-%D0%91%D1%83-%D0%A1%D0%B0%D1%97%D0%B4%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🏘️"
      },
      {
        name: "Карфаген",
        description: "Carthago delenda est. Руїни однієї з наймогутніших імперій давнини.",
        image: "https://image.pollinations.ai/prompt/%D0%9A%D0%B0%D1%80%D1%84%D0%B0%D0%B3%D0%B5%D0%BD%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🏺"
      },
      {
        name: "Амфітеатр Ель-Джем",
        description: "Римський колізей, що зберігся краще за римський. Тут знімали 'Гладіатора'.",
        image: "https://image.pollinations.ai/prompt/%D0%90%D0%BC%D1%84%D1%96%D1%82%D0%B5%D0%B0%D1%82%D1%80%20%D0%95%D0%BB%D1%8C-%D0%94%D0%B6%D0%B5%D0%BC%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🏟️"
      },
      {
        name: "Сахара",
        description: "Зустріч світанку на дюнах, катання на верблюдах та декорації 'Зоряних воєн'.",
        image: "https://image.pollinations.ai/prompt/%D0%A1%D0%B0%D1%85%D0%B0%D1%80%D0%B0%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🏜️"
      }
    ],
    whatToBuy: ['Оливкова олія', 'Кераміка', 'Килими', 'Спеції та фініки'],
    souvenirs: [
      {
        name: "Кераміка",
        description: "Набел - столиця гончарства. Яскраві тарілки та глечики.",
        image: "https://image.pollinations.ai/prompt/%D0%9A%D0%B5%D1%80%D0%B0%D0%BC%D1%96%D0%BA%D0%B0%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🏺"
      },
      {
        name: "Оливкова олія",
        description: "Туніс - один з лідерів експорту. Якісна і дешевша, ніж в Європі.",
        image: "https://image.pollinations.ai/prompt/%D0%9E%D0%BB%D0%B8%D0%B2%D0%BA%D0%BE%D0%B2%D0%B0%20%D0%BE%D0%BB%D1%96%D1%8F%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🫒"
      },
      {
        name: "Фініки",
        description: "Сорт 'Деглет Нур' (пальці світла) - найсолодші та найпрозоріші.",
        image: "https://image.pollinations.ai/prompt/%D0%A4%D1%96%D0%BD%D1%96%D0%BA%D0%B8%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🌴"
      },
      {
        name: "Троянда пустелі",
        description: "Кристалічне утворення з піску та солі, схоже на квітку. Дарує вічне кохання.",
        image: "https://image.pollinations.ai/prompt/%D0%A2%D1%80%D0%BE%D1%8F%D0%BD%D0%B4%D0%B0%20%D0%BF%D1%83%D1%81%D1%82%D0%B5%D0%BB%D1%96%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🪨"
      }
    ],
    bestMonths: [4, 5, 6, 7, 8, 9, 10],
    region: 'Africa'
  },
  {
    id: 'zanzibar',
    name: 'Занзібар (Танзанія)',
    season: 'Червень - Лютий',
    seasonIcon: '🌴',
    image: '/images/destinations/zanzibar.webp',
    flag: '🇹🇿',
    icon: '🏝️',
    desc: 'Тропічний рай в Індійському океані. Білосніжні пляжі та екзотична африканська культура.',
    price: 'від 950$',
    highlights: ['Екзотичні пляжі', 'Стоун-Таун', 'Дайвінг', 'Спеції'],
    tags: ['Море', 'Екзотика'],
    whatToSee: ['Стоун-Таун (UNESCO)', 'Острів Prison Island', 'Пляж Нунгві', 'Ферми спецій'],
    tips: [
      'На пляжах сильні припливи та відливи (крім Нунгві та Кендва).',
      'Острів мусульманський - в місті одягайтеся скромно.',
      'Jambo (Привіт) і Hakuna Matata (Нема проблем) - головні фрази.',
      'Долари беріть нові (після 2009 року).'
    ],
    attractions: [
      {
        name: "Стоун-Таун",
        description: "Кам'яне місто. Лабіринт вуличок, різьблені двері та будинок, де народився Фредді Мерк'юрі.",
        image: "https://image.pollinations.ai/prompt/%D0%A1%D1%82%D0%BE%D1%83%D0%BD-%D0%A2%D0%B0%D1%83%D0%BD%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🏙️"
      },
      {
        name: "Prison Island",
        description: "Острів, де живуть гігантські сейшельські черепахи. Деяким з них понад 150 років.",
        image: "https://image.pollinations.ai/prompt/Prison%20Island%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🐢"
      },
      {
        name: "Ресторан The Rock",
        description: "Ресторан на скелі посеред океану. Під час припливу дістатися можна лише човном.",
        image: "https://image.pollinations.ai/prompt/%D0%A0%D0%B5%D1%81%D1%82%D0%BE%D1%80%D0%B0%D0%BD%20The%20Rock%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🍴"
      },
      {
        name: "Ферма спецій",
        description: "Подивіться, як росте ваніль, кориця та мускатний горіх. Ароматна екскурсія.",
        image: "https://image.pollinations.ai/prompt/%D0%A4%D0%B5%D1%80%D0%BC%D0%B0%20%D1%81%D0%BF%D0%B5%D1%86%D1%96%D0%B9%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🌿"
      }
    ],
    whatToBuy: ['Прянощі', 'Занзібарський шовк', 'Вироби з кокосу', 'Африканські сувеніри'],
    souvenirs: [
      {
        name: "Спеції",
        description: "Занзібар називають островом спецій. Набори кориці, ванілі та перцю.",
        image: "https://image.pollinations.ai/prompt/%D0%A1%D0%BF%D0%B5%D1%86%D1%96%D1%97%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🌶️"
      },
      {
        name: "Картини Тінга-Тінга",
        description: "Яскравий африканський живопис емаллю. Веселі тварини та сюжети.",
        image: "https://image.pollinations.ai/prompt/%D0%9A%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%B8%20%D0%A2%D1%96%D0%BD%D0%B3%D0%B0-%D0%A2%D1%96%D0%BD%D0%B3%D0%B0%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🎨"
      },
      {
        name: "Дерев'яні маски",
        description: "Маконде - чорне ебенове дерево. Статуетки та маски неймовірної роботи.",
        image: "https://image.pollinations.ai/prompt/%D0%94%D0%B5%D1%80%D0%B5%D0%B2%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🗿"
      },
      {
        name: "Кава з Кіліманджаро",
        description: "Танзанійська арабіка з вулканічних схилів. Має насичений смак.",
        image: "https://image.pollinations.ai/prompt/%D0%9A%D0%B0%D0%B2%D0%B0%20%D0%B7%20%D0%9A%D1%96%D0%BB%D1%96%D0%BC%D0%B0%D0%BD%D0%B4%D0%B6%D0%B0%D1%80%D0%BE%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "☕"
      }
    ],
    bestMonths: [6, 7, 8, 9, 10, 11, 12, 1, 2],
    region: 'Africa'
  },
  {
    id: 'kenya',
    name: 'Кенія',
    season: 'Січень - Березень',
    seasonIcon: '🦁',
    image: '/images/destinations/kenya.webp',
    flag: '🇰🇪',
    icon: '🦓',
    desc: 'Справжнє сафарі. Велика міграція тварин, масаї та Індійський океан.',
    price: 'від 1200$',
    highlights: ['Сафарі', 'Масаї-Мара', 'Жирафи', 'Океан'],
    tags: ['Екзотика', 'Природа', 'Сафарі'],
    whatToSee: ['Нацпарк Масаї-Мара', 'Готель Giraffe Manor', 'Озеро Накуру', 'Момбаса'],
    tips: [
      'Сафарі - це ранній підйом (о 5:00), бо тварини активні вранці.',
      'Одягайтеся шарами - вранці холодно, вдень спекотно.',
      'Слухайте рейнджера - безпека понад усе.',
      'Вакцинація від жовтої лихоманки бажана.'
    ],
    attractions: [
      {
        name: "Масаї-Мара",
        description: "Головний заповідник Кенії. Велика п'ятірка (лев, слон, буйвіл, носоріг, леопард).",
        image: "https://image.pollinations.ai/prompt/%D0%9C%D0%B0%D1%81%D0%B0%D1%97-%D0%9C%D0%B0%D1%80%D0%B0%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🦁"
      },
      {
        name: "Giraffe Manor",
        description: "Знаменитий готель, де жирафи заглядають у вікна під час сніданку.",
        image: "https://image.pollinations.ai/prompt/Giraffe%20Manor%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🦒"
      },
      {
        name: "Озеро Накуру",
        description: "Озеро фламінго. Тисячі рожевих птахів на тлі блакитної води.",
        image: "https://image.pollinations.ai/prompt/%D0%9E%D0%B7%D0%B5%D1%80%D0%BE%20%D0%9D%D0%B0%D0%BA%D1%83%D1%80%D1%83%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🦩"
      },
      {
        name: "Діані Біч",
        description: "Один з найкращих пляжів світу біля Момбаси. Після сафарі - на океан!",
        image: "https://image.pollinations.ai/prompt/%D0%94%D1%96%D0%B0%D0%BD%D1%96%20%D0%91%D1%96%D1%87%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🏖️"
      }
    ],
    whatToBuy: ['Вироби з бісеру', 'Кава', 'Маски з дерева', 'Тканини Канга'],
    souvenirs: [
      {
        name: "Вироби з бісеру",
        description: "Традиційні прикраси племені Масаї. Дуже яскраві та символічні.",
        image: "https://image.pollinations.ai/prompt/%D0%92%D0%B8%D1%80%D0%BE%D0%B1%D0%B8%20%D0%B7%20%D0%B1%D1%96%D1%81%D0%B5%D1%80%D1%83%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "📿"
      },
      {
        name: "Кава Кенія АА",
        description: "Один з кращих сортів арабіки у світі з винною кислинкою.",
        image: "https://image.pollinations.ai/prompt/%D0%9A%D0%B0%D0%B2%D0%B0%20%D0%9A%D0%B5%D0%BD%D1%96%D1%8F%20%D0%90%D0%90%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "☕"
      },
      {
        name: "Канга та Кікой",
        description: "Традиційні африканські тканини. Можна використовувати як парео або шарф.",
        image: "https://image.pollinations.ai/prompt/%D0%9A%D0%B0%D0%BD%D0%B3%D0%B0%20%D1%82%D0%B0%20%D0%9A%D1%96%D0%BA%D0%BE%D0%B9%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🧣"
      },
      {
        name: "Статуетки тварин",
        description: "Дерев'яні або кам'яні фігурки тварин, яких ви бачили на сафарі.",
        image: "https://image.pollinations.ai/prompt/%D0%A1%D1%82%D0%B0%D1%82%D1%83%D0%B5%D1%82%D0%BA%D0%B8%20%D1%82%D0%B2%D0%B0%D1%80%D0%B8%D0%BD%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🦓"
      }
    ],
    bestMonths: [1, 2, 3],
    region: 'Africa'
  },

  // NORTH AMERICA & CARIBBEAN
  {
    id: 'dominican',
    name: 'Домінікана',
    season: 'Цілий рік',
    seasonIcon: '🌴',
    image: '/images/destinations/dominican.webp',
    flag: '🇩🇴',
    icon: '🥥',
    desc: 'Справжній карибський рай. Білий пісок, пальми та безтурботність.',
    price: 'від 900$',
    highlights: ['Пунта-Кана', 'Саона', 'Карибське море', 'Все включено'],
    tags: ['Море', 'Екзотика'],
    whatToSee: ['Острів Саона', 'Альтос-де-Чавон', 'Пляж Баваро', 'Водоспад Ель-Лимон'],
    tips: [
      'Розетки тут американського типу, візьміть перехідник.',
      'Найкращий сувенір - це ром і сигари.',
      'Не пийте воду з крана, навіть не чистіть нею зуби.',
      'Сонце дуже сильне, використовуйте крем і носіть капелюх.'
    ],
    attractions: [
      {
        name: "Острів Саона",
        description: "Карибський рай з реклами 'Баунті'. Білосніжний пісок, пальми, що схиляються до бірюзової води.",
        image: "https://image.pollinations.ai/prompt/%D0%9E%D1%81%D1%82%D1%80%D1%96%D0%B2%20%D0%A1%D0%B0%D0%BE%D0%BD%D0%B0%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🏝️"
      },
      {
        name: "Альтос-де-Чавон",
        description: "Місто художників. Копія італійського середньовічного села, побудована над річкою Чавон.",
        image: "https://image.pollinations.ai/prompt/%D0%90%D0%BB%D1%8C%D1%82%D0%BE%D1%81-%D0%B4%D0%B5-%D0%A7%D0%B0%D0%B2%D0%BE%D0%BD%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🎨"
      },
      {
        name: "Пляж Баваро",
        description: "Один з найкращих пляжів світу в Пунта-Кані. Кілометри ідеального піску та океан.",
        image: "https://image.pollinations.ai/prompt/%D0%9F%D0%BB%D1%8F%D0%B6%20%D0%91%D0%B0%D0%B2%D0%B0%D1%80%D0%BE%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🏖️"
      },
      {
        name: "Водоспад Ель-Лимон",
        description: "Захований у джунглях водоспад. Шлях туди на конях - це окрема пригода.",
        image: "https://image.pollinations.ai/prompt/%D0%92%D0%BE%D0%B4%D0%BE%D1%81%D0%BF%D0%B0%D0%B4%20%D0%95%D0%BB%D1%8C-%D0%9B%D0%B8%D0%BC%D0%BE%D0%BD%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🐎"
      }
    ],
    whatToBuy: ['Ром та сигари', 'Кава', 'Прикраси з ларімару', 'Вироби з бурштину'],
    souvenirs: [
      {
        name: "Ларімар",
        description: "Напівдорогоцінний камінь ніжно-блакитного кольору, який видобувають тільки в Домінікані.",
        image: "https://image.pollinations.ai/prompt/%D0%9B%D0%B0%D1%80%D1%96%D0%BC%D0%B0%D1%80%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "💎"
      },
      {
        name: "Домініканський ром",
        description: "Brugal, Barceló або Oliver. М'який смак та багата історія. Обов'язково беріть витриманий (Anejo).",
        image: "https://image.pollinations.ai/prompt/%D0%94%D0%BE%D0%BC%D1%96%D0%BD%D1%96%D0%BA%D0%B0%D0%BD%D1%81%D1%8C%D0%BA%D0%B8%D0%B9%20%D1%80%D0%BE%D0%BC%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🥃"
      },
      {
        name: "Сигари",
        description: "Ручна скрутка. Домініканські сигари вважаються одними з найкращих у світі (конкурент Куби).",
        image: "https://image.pollinations.ai/prompt/%D0%A1%D0%B8%D0%B3%D0%B0%D1%80%D0%B8%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🚬"
      },
      {
        name: "Кава",
        description: "Santo Domingo Coffee. Ароматна, міцна та з шоколадними нотками.",
        image: "https://image.pollinations.ai/prompt/%D0%9A%D0%B0%D0%B2%D0%B0%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "☕"
      }
    ],
    bestMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    region: 'North America'
  },
  {
    id: 'mexico',
    name: 'Мексика',
    season: 'Листопад - Квітень',
    seasonIcon: '🌮',
    image: '/images/destinations/mexico.webp',
    flag: '🇲🇽',
    icon: '🌵',
    desc: 'Країна майя та ацтеків. Карибське море, сеноти та гостра кухня.',
    price: 'від 1300$',
    highlights: ['Канкун', 'Чичен-Іца', 'Сеноти', 'Текіла'],
    tags: ['Екзотика', 'Море', 'Історія'],
    whatToSee: ['Піраміда Кукулькана', 'Тулум', 'Парк Шкарет', 'Сенот Ік-Кіль'],
    tips: [
      'Гостра їжа тут дійсно гостра (mucho picante).',
      'Сеноти - найкраще місце, щоб освіжитися в спеку.',
      'Не фотографуйте місцевих жителів без дозволу.',
      'Завжди майте при собі дрібні песо для чайових.'
    ],
    attractions: [
      {
        name: "Чичен-Іца",
        description: "Головна піраміда майя (Кукулькан). Одне з Нових семи чудес світу. Енергетично сильне місце.",
        image: "https://image.pollinations.ai/prompt/%D0%A7%D0%B8%D1%87%D0%B5%D0%BD-%D0%86%D1%86%D0%B0%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🔺"
      },
      {
        name: "Тулум",
        description: "Руїни стародавнього міста майя прямо на березі Карибського моря. Вражаючий контраст.",
        image: "https://image.pollinations.ai/prompt/%D0%A2%D1%83%D0%BB%D1%83%D0%BC%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🌊"
      },
      {
        name: "Сенот Ік-Кіль",
        description: "Священна підземна 'криниця' майя з ліанами та кришталевою водою. Ідеально для купання.",
        image: "https://image.pollinations.ai/prompt/%D0%A1%D0%B5%D0%BD%D0%BE%D1%82%20%D0%86%D0%BA-%D0%9A%D1%96%D0%BB%D1%8C%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "💧"
      },
      {
        name: "Парк Шкарет",
        description: "Еко-археологічний парк. Підземні річки, зоопарк, акваріум та вечірнє шоу про історію Мексики.",
        image: "https://image.pollinations.ai/prompt/%D0%9F%D0%B0%D1%80%D0%BA%20%D0%A8%D0%BA%D0%B0%D1%80%D0%B5%D1%82%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🦜"
      }
    ],
    whatToBuy: ['Текіла', 'Сомбреро', 'Срібло', 'Кераміка Талавера'],
    souvenirs: [
      {
        name: "Текіла та Мескаль",
        description: "Справжній смак Мексики. Шукайте напис '100% Agave' для найкращої якості.",
        image: "https://image.pollinations.ai/prompt/%D0%A2%D0%B5%D0%BA%D1%96%D0%BB%D0%B0%20%D1%82%D0%B0%20%D0%9C%D0%B5%D1%81%D0%BA%D0%B0%D0%BB%D1%8C%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🌵"
      },
      {
        name: "Капелюх Сомбреро",
        description: "Яскравий та веселий сувенір. Хоча носити його вдома ви навряд чи будете :)",
        image: "https://image.pollinations.ai/prompt/%D0%9A%D0%B0%D0%BF%D0%B5%D0%BB%D1%8E%D1%85%20%D0%A1%D0%BE%D0%BC%D0%B1%D1%80%D0%B5%D1%80%D0%BE%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "👒"
      },
      {
        name: "Кераміка Талавера",
        description: "Унікальна розписна кераміка. Тарілки, чашки або плитка в синьо-білих тонах.",
        image: "https://image.pollinations.ai/prompt/%D0%9A%D0%B5%D1%80%D0%B0%D0%BC%D1%96%D0%BA%D0%B0%20%D0%A2%D0%B0%D0%BB%D0%B0%D0%B2%D0%B5%D1%80%D0%B0%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🏺"
      },
      {
        name: "Череп (Калавера)",
        description: "Символ Дня Мертвих. Яскраві розписні черепи - це не страшно, а культурно.",
        image: "https://image.pollinations.ai/prompt/%D0%A7%D0%B5%D1%80%D0%B5%D0%BF%20%D0%9A%D0%B0%D0%BB%D0%B0%D0%B2%D0%B5%D1%80%D0%B0%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "💀"
      }
    ],
    bestMonths: [11, 12, 1, 2, 3, 4],
    region: 'North America'
  },
  {
    id: 'cuba',
    name: 'Куба',
    season: 'Листопад - Квітень',
    seasonIcon: '🚗',
    image: '/images/destinations/cuba.webp',
    flag: '🇨🇺',
    icon: '🍹',
    desc: 'Острів Свободи. Ретро-автомобілі, сигари та найкращі пляжі Варадеро.',
    price: 'від 1100$',
    highlights: ['Гавана', 'Варадеро', 'Ром', 'Сальса'],
    tags: ['Екзотика', 'Море', 'Ретро'],
    whatToSee: ['Стара Гавана', 'Капітолій', 'Долина Віньялес', 'Будинок Хемінгуея'],
    tips: [
      'Інтернет тут повільний і дорогий (по картках). Відпочивайте від соцмереж.',
      'Беріть з собою ліки і засоби гігієни - в магазинах дефіцит.',
      'Ром дешевший за воду (майже).',
      'Залишайте покоївкам не гроші, а шоколад чи косметику - вони будуть щасливі.'
    ],
    attractions: [
      {
        name: "Стара Гавана",
        description: "Колоніальна архітектура, площі та атмосфера 50-х років. Жива музика на кожному кроці.",
        image: "https://image.pollinations.ai/prompt/%D0%A1%D1%82%D0%B0%D1%80%D0%B0%20%D0%93%D0%B0%D0%B2%D0%B0%D0%BD%D0%B0%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🏙️"
      },
      {
        name: "Варадеро",
        description: "20 кілометрів ідеального пляжу. Бірюзовий океан та готелі 'все включено'.",
        image: "https://image.pollinations.ai/prompt/%D0%92%D0%B0%D1%80%D0%B0%D0%B4%D0%B5%D1%80%D0%BE%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🏖️"
      },
      {
        name: "Долина Віньялес",
        description: "Нацпарк з карстовими пагорбами 'моготе' та тютюновими плантаціями.",
        image: "https://image.pollinations.ai/prompt/%D0%94%D0%BE%D0%BB%D0%B8%D0%BD%D0%B0%20%D0%92%D1%96%D0%BD%D1%8C%D1%8F%D0%BB%D0%B5%D1%81%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "⛰️"
      },
      {
        name: "Ретро-кари",
        description: "Музей на колесах. Проїхатися на рожевому кабріолеті вздовж набережної Малекон - це магія.",
        image: "https://image.pollinations.ai/prompt/%D0%A0%D0%B5%D1%82%D1%80%D0%BE-%D0%BA%D0%B0%D1%80%D0%B8%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🚗"
      }
    ],
    whatToBuy: ['Сигари (Cohiba)', 'Ром Havana Club', 'Кава', 'Картини'],
    souvenirs: [
      {
        name: "Сигари (Cohiba)",
        description: "Найкращі сигари у світі. Купуйте тільки в офіційних магазинах.",
        image: "https://image.pollinations.ai/prompt/%D0%A1%D0%B8%D0%B3%D0%B0%D1%80%D0%B8%20Cohiba%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🚬"
      },
      {
        name: "Ром Havana Club",
        description: "Legendario або Santiago de Cuba. Солодкий, густий смак Свободи.",
        image: "https://image.pollinations.ai/prompt/%D0%A0%D0%BE%D0%BC%20Havana%20Club%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🥃"
      },
      {
        name: "Кава Cubita",
        description: "Міцна та ароматна кубинська кава. Ідеально поєднується з сигарою.",
        image: "https://image.pollinations.ai/prompt/%D0%9A%D0%B0%D0%B2%D0%B0%20Cubita%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "☕"
      },
      {
        name: "Картини",
        description: "Кубинське мистецтво дуже яскраве. Картина з вулицями Гавани - чудовий спогад.",
        image: "https://image.pollinations.ai/prompt/%D0%9A%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%B8%20travel%20location%20tourist%20attraction%20realistic%20professional%20photography%20high%20quality?width=600&height=400&nologo=true",
        icon: "🎨"
      }
    ],
    bestMonths: [11, 12, 1, 2, 3, 4],
    region: 'North America'
  }
]