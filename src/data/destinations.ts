import { Destination } from '@/types/destination'

export const destinations: Destination[] = [
  // EUROPE
  {
    id: 'turkey',
    name: 'Туреччина',
    season: 'Травень - Жовтень',
    seasonIcon: '☀️',
    image: '/images/destinations/turkey.jpg',
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
        image: "https://images.unsplash.com/photo-1545459720-aacaf509ebc3?q=80&w=600&auto=format&fit=crop",
        icon: "🕌"
      },
      {
        name: "Каппадокія (повітряні кулі)",
        description: "Казковий ландшафт, де сотні повітряних куль злітають у небо на світанку. Це враження, яке неможливо забути.",
        image: "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?q=80&w=600&auto=format&fit=crop",
        icon: "🎈"
      },
      {
        name: "Памуккале (травертини)",
        description: "Природні басейни з термальною водою сніжно-білого кольору. Унікальне природне явище, відоме як 'Бавовняний замок'.",
        image: "https://images.unsplash.com/photo-1622306351842-5f65a0b7774c?q=80&w=600&auto=format&fit=crop",
        icon: "💧"
      },
      {
        name: "Античне місто Ефес",
        description: "Одне з найкраще збережених античних міст світу. Прогуляйтеся стародавніми вулицями та побачте бібліотеку Цельса.",
        image: "https://images.unsplash.com/photo-1596306499300-e2bf307cb769?q=80&w=600&auto=format&fit=crop",
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
    image: '/images/destinations/spain.jpg',
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
        image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=600&auto=format&fit=crop",
        icon: "⛪"
      },
      {
        name: "Парк Гуель",
        description: "Казковий парк з пряниковими будиночками та мозаїчною ящіркою. Відкриває найкращу панораму на Барселону.",
        image: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?q=80&w=600&auto=format&fit=crop",
        icon: "🦎"
      },
      {
        name: "Альгамбра (Гранада)",
        description: "Шедевр маврітанської архітектури. Палаци, дворики з фонтанами та сади Хенераліфе.",
        image: "https://images.unsplash.com/photo-1621683400760-46961a7c369e?q=80&w=600&auto=format&fit=crop",
        icon: "🏰"
      },
      {
        name: "Королівський палац",
        description: "Офіційна резиденція іспанської королівської родини в Мадриді. Розкішні зали та збройова палата.",
        image: "https://images.unsplash.com/photo-1548679198-d4fa24976767?q=80&w=600&auto=format&fit=crop",
        icon: "👑"
      }
    ],
    whatToBuy: ['Хамон', 'Оливкова олія', 'Вино (Ріоха)', 'Віяла та кастаньєти'],
    souvenirs: [
      {
        name: "Хамон",
        description: "Знаменитий іспанський сиров'ялений окіст. Найкращий сувенір для гурманів.",
        image: "https://images.unsplash.com/photo-1599321955726-e04842d6c2e7?q=80&w=600&auto=format&fit=crop",
        icon: "🍖"
      },
      {
        name: "Оливкова олія",
        description: "Іспанія - лідер з виробництва оливкової олії. Шукайте пляшки з написом 'Extra Virgin'.",
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=600&auto=format&fit=crop",
        icon: "🫒"
      },
      {
        name: "Вино (Ріоха)",
        description: "Червоні вина з регіону Ріоха відомі на весь світ своїм насиченим смаком.",
        image: "https://images.unsplash.com/photo-1559563362-c667ba5f5480?q=80&w=600&auto=format&fit=crop",
        icon: "🍷"
      },
      {
        name: "Віяло (Абаніко)",
        description: "Традиційне іспанське віяло - це не просто аксесуар, а частина культури фламенко.",
        image: "https://images.unsplash.com/photo-1627827829767-6a75f564773c?q=80&w=600&auto=format&fit=crop",
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
    image: '/images/destinations/greece.jpg',
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
        image: "https://images.unsplash.com/photo-1555993539-1732b0258235?q=80&w=600&auto=format&fit=crop",
        icon: "🏛️"
      },
      {
        name: "Санторіні",
        description: "Найромантичніший острів світу з білими будиночками, синіми дахами та вулканічними пляжами.",
        image: "https://images.unsplash.com/photo-1613395877344-13d4c79e42d0?q=80&w=600&auto=format&fit=crop",
        icon: "🌅"
      },
      {
        name: "Метеори",
        description: "Монастирі, що ширяють у повітрі. Побудовані на вершинах гігантських скель, вони виглядають нереально.",
        image: "https://images.unsplash.com/photo-1563720223523-49193796dd32?q=80&w=600&auto=format&fit=crop",
        icon: "⛪"
      },
      {
        name: "Кноський палац",
        description: "Лабіринт мінотавра на острові Крит. Найдавніше місто Європи та центр мінойської цивілізації.",
        image: "https://images.unsplash.com/photo-1628198904797-2a5b28d6c708?q=80&w=600&auto=format&fit=crop",
        icon: "🐂"
      }
    ],
    whatToBuy: ['Оливкова олія та косметика', 'Грецький мед', 'Сир Фета', 'Шкіряні сандалі'],
    souvenirs: [
      {
        name: "Оливкова косметика",
        description: "Натуральні креми та мило на основі оливкової олії - секрет краси гречанок.",
        image: "https://images.unsplash.com/photo-1566737236500-4804a0da9558?q=80&w=600&auto=format&fit=crop",
        icon: "🧴"
      },
      {
        name: "Грецький мед",
        description: "Чебрецевий мед з Криту або сосновий з Тасосу. Має неповторний аромат.",
        image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=600&auto=format&fit=crop",
        icon: "🍯"
      },
      {
        name: "Сир Фета",
        description: "Справжня фета, витримана в розсолі. Смакує ідеально з салатом або просто з хлібом.",
        image: "https://images.unsplash.com/photo-1620917205168-98e945c99450?q=80&w=600&auto=format&fit=crop",
        icon: "🧀"
      },
      {
        name: "Шкіряні сандалі",
        description: "Ручна робота місцевих майстрів. Зручні, стильні та довговічні.",
        image: "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?q=80&w=600&auto=format&fit=crop",
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
    image: '/images/destinations/montenegro.jpg',
    flag: '🇲🇪',
    icon: '⛰️',
    desc: 'Перлина Адріатики. Де гори зустрічаються з морем у неймовірних бухтах.',
    price: 'від 380$',
    highlights: ['Которська затока', 'Будва', 'Національні парки', 'Рафтинг'],
    tags: ['Море', 'Гори', 'Європа'],
    whatToSee: ['Которська затока', 'Старе місто Будва', 'Острів Светого Стефана', 'Національний парк Дурмітор'],
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
    image: '/images/destinations/albania.jpg',
    flag: '🇦🇱',
    icon: '🏖️',
    desc: 'Прихована перлина Балкан. Чисті пляжі Албанської Рив\'єри та стародавні міста.',
    price: 'від 320$',
    highlights: ['Доступні ціни', 'Албанська Рів\'єра', 'Античні руїни', 'Гостинність'],
    tags: ['Море', 'Європа'],
    whatToSee: ['Саранда та пляжі', 'Берат (місто тисячі вікон)', 'Гіроокастра', 'Дуррес'],
    whatToBuy: ['Ракія', 'Вишиті вироби', 'Оливкова олія', 'Традиційний одяг'],
    bestMonths: [6, 7, 8, 9],
    region: 'Europe'
  },
  {
    id: 'france',
    name: 'Франція',
    season: 'Цілий рік',
    seasonIcon: '🗼',
    image: '/images/destinations/france.jpg',
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
        image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce7859?q=80&w=600&auto=format&fit=crop",
        icon: "🗼"
      },
      {
        name: "Лувр",
        description: "Найбільший художній музей світу. Мона Ліза, Венера Мілоська та тисячі інших шедеврів.",
        image: "https://images.unsplash.com/photo-1499856871940-a09627c6dcf6?q=80&w=600&auto=format&fit=crop",
        icon: "🎨"
      },
      {
        name: "Мон-Сен-Мішель",
        description: "Абатство на скелястому острові, яке стає неприступним під час припливу. Магічне місце.",
        image: "https://images.unsplash.com/photo-1569335466487-7a242c14041e?q=80&w=600&auto=format&fit=crop",
        icon: "🏰"
      },
      {
        name: "Лазурний берег",
        description: "Ніцца, Канни, Монако. Розкішні пляжі, яхти та атмосфера красивого життя.",
        image: "https://images.unsplash.com/photo-1533668827798-e4b7852445cc?q=80&w=600&auto=format&fit=crop",
        icon: "🌊"
      }
    ],
    whatToBuy: ['Парфуми', 'Сири', 'Вино', 'Модний одяг'],
    souvenirs: [
      {
        name: "Французькі парфуми",
        description: "Класика від Chanel, Dior або нішеві аромати з Грасса - парфумерної столиці світу.",
        image: "https://images.unsplash.com/photo-1595155255428-1bfd146d9f58?q=80&w=600&auto=format&fit=crop",
        icon: "🧴"
      },
      {
        name: "Сири (Камамбер)",
        description: "Справжній французький сир з пліснявою. Найкраще смакує з багетом та вином.",
        image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?q=80&w=600&auto=format&fit=crop",
        icon: "🧀"
      },
      {
        name: "Макаронс",
        description: "Знамените французьке тістечко. Ladurée або Pierre Hermé - еталон смаку.",
        image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=600&auto=format&fit=crop",
        icon: "🍩"
      },
      {
        name: "Берет",
        description: "Стереотипний, але стильний аксесуар. Додає французького шарму будь-якому образу.",
        image: "https://images.unsplash.com/photo-1523267605499-5604130638ce?q=80&w=600&auto=format&fit=crop",
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
    image: '/images/destinations/italy.jpg',
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
        image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=600&auto=format&fit=crop",
        icon: "⚔️"
      },
      {
        name: "Венеція",
        description: "Місто на воді. Прогулянка на гондолі Гранд-каналом - це найромантичніша пригода.",
        image: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?q=80&w=600&auto=format&fit=crop",
        icon: "🛶"
      },
      {
        name: "Пізанська вежа",
        description: "Архітектурний курйоз, що став світовим символом. Обов'язкове фото, де ви її 'підтримуєте'.",
        image: "https://images.unsplash.com/photo-1543429258-135e612cb7e0?q=80&w=600&auto=format&fit=crop",
        icon: "🗼"
      },
      {
        name: "Флоренція",
        description: "Колиска Відродження. Собор Санта-Марія-дель-Фйоре та галерея Уффіці вражають.",
        image: "https://images.unsplash.com/photo-1533630654593-b222d5d44449?q=80&w=600&auto=format&fit=crop",
        icon: "🎨"
      }
    ],
    whatToBuy: ['Шкіряні вироби', 'Венеціанські маски', 'Оливкова олія', 'Брендовий одяг'],
    souvenirs: [
      {
        name: "Венеціанська маска",
        description: "Вишуканий сувенір ручної роботи, що передає атмосферу знаменитого карнавалу.",
        image: "https://images.unsplash.com/photo-1624892437340-023fc2679237?q=80&w=600&auto=format&fit=crop",
        icon: "🎭"
      },
      {
        name: "Шкіряна сумка",
        description: "Флоренція славиться своїми майстрами шкіряної справи. Якість, яка служить роками.",
        image: "https://images.unsplash.com/photo-1590874103328-eac65d684340?q=80&w=600&auto=format&fit=crop",
        icon: "👜"
      },
      {
        name: "Лімончелло",
        description: "Солодкий лимонний лікер з півдня Італії. Смак літа в кожній краплі.",
        image: "https://images.unsplash.com/photo-1558586043-41bb6242c755?q=80&w=600&auto=format&fit=crop",
        icon: "🍋"
      },
      {
        name: "Паста та соуси",
        description: "Справжня італійська паста ручної роботи та песто - ідеальний подарунок для кухні.",
        image: "https://images.unsplash.com/photo-1563379926898-05f457542c31?q=80&w=600&auto=format&fit=crop",
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
    image: '/images/destinations/croatia.jpg',
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
        image: "https://images.unsplash.com/photo-1555990538-179cdac6933b?q=80&w=600&auto=format&fit=crop",
        icon: "🏰"
      },
      {
        name: "Плітвіцькі озера",
        description: "Нацпарк з каскадом озер та водоспадів. Вода неймовірного бірюзового кольору.",
        image: "https://images.unsplash.com/photo-1570701564993-e00652243b61?q=80&w=600&auto=format&fit=crop",
        icon: "🌊"
      },
      {
        name: "Палац Діоклетіана",
        description: "Стародавній палац у Спліті, який перетворився на живе місто з вузькими вуличками.",
        image: "https://images.unsplash.com/photo-1605335191753-46387d853b0c?q=80&w=600&auto=format&fit=crop",
        icon: "🏛️"
      },
      {
        name: "Амфітеатр Пули",
        description: "Один із шести найбільших збережених римських амфітеатрів світу.",
        image: "https://images.unsplash.com/photo-1596728328657-3f82024b4579?q=80&w=600&auto=format&fit=crop",
        icon: "🏟️"
      }
    ],
    whatToBuy: ['Краватки', 'Лаванда', 'Пажський сир', 'Трюфелі'],
    souvenirs: [
      {
        name: "Краватка",
        description: "Батьківщина краватки - Хорватія (від слова 'Croata'). Елегантний подарунок.",
        image: "https://images.unsplash.com/photo-1589756823695-278bc923f962?q=80&w=600&auto=format&fit=crop",
        icon: "👔"
      },
      {
        name: "Лаванда",
        description: "Хорватська лаванда вважається однією з найякісніших. Саше або олія.",
        image: "https://images.unsplash.com/photo-1493092527342-9908de296650?q=80&w=600&auto=format&fit=crop",
        icon: "🌾"
      },
      {
        name: "Пажський сир",
        description: "Твердий овечий сир з острова Паг. Має пікантний солоний смак.",
        image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?q=80&w=600&auto=format&fit=crop",
        icon: "🧀"
      },
      {
        name: "Трюфелі",
        description: "Істрія славиться своїми трюфелями. Паста з трюфелів (tartufata) - хіт продажів.",
        image: "https://images.unsplash.com/photo-1605650207000-ad647317cd5d?q=80&w=600&auto=format&fit=crop",
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
    image: '/images/destinations/bulgaria.jpg',
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
        image: "https://images.unsplash.com/photo-1563294376-79db04860d4b?q=80&w=600&auto=format&fit=crop",
        icon: "🏘️"
      },
      {
        name: "Рильський монастир",
        description: "Головна святиня Болгарії в горах. Вражає своїми розписами та архітектурою.",
        image: "https://images.unsplash.com/photo-1594247814420-5696576829c7?q=80&w=600&auto=format&fit=crop",
        icon: "⛪"
      },
      {
        name: "Ботанічний сад Балчик",
        description: "Колишня резиденція румунської королеви. Величезна колекція кактусів та троянд.",
        image: "https://images.unsplash.com/photo-1588698943324-fc9210c85c29?q=80&w=600&auto=format&fit=crop",
        icon: "🌺"
      },
      {
        name: "Сім Рильських озер",
        description: "Льодовикові озера в горах. Неймовірний хайкінг для любителів природи.",
        image: "https://images.unsplash.com/photo-1504627471208-4122d15926c1?q=80&w=600&auto=format&fit=crop",
        icon: "⛰️"
      }
    ],
    whatToBuy: ['Рожева олія', 'Кераміка', 'Спеції (Шарена соль)', 'Рахат-лукум'],
    souvenirs: [
      {
        name: "Рожева олія",
        description: "Болгарія - країна троянд. Косметика на основі трояндової олії тут найкраща.",
        image: "https://images.unsplash.com/photo-1616949755610-8c9df40237e1?q=80&w=600&auto=format&fit=crop",
        icon: "🌹"
      },
      {
        name: "Шарена соль",
        description: "Традиційна суміш спецій. Дуже смачна з хлібом та олією.",
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=600&auto=format&fit=crop",
        icon: "🧂"
      },
      {
        name: "Кераміка",
        description: "Троянська кераміка з характерними візерунками. Яскрава і практична.",
        image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=600&auto=format&fit=crop",
        icon: "🏺"
      },
      {
        name: "Рахат-лукум",
        description: "Солодощі з додаванням трояндової води. Ніжний та ароматний.",
        image: "https://images.unsplash.com/photo-1582294101377-62f790c5ee35?q=80&w=600&auto=format&fit=crop",
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
    image: '/images/destinations/cyprus.jpg',
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
        image: "https://images.unsplash.com/photo-1528659570222-77722744955b?q=80&w=600&auto=format&fit=crop",
        icon: "🌊"
      },
      {
        name: "Царські гробниці",
        description: "Величний некрополь у Пафосі, висічений у скелях. Світова спадщина ЮНЕСКО.",
        image: "https://images.unsplash.com/photo-1599423300746-b6250726f1aa?q=80&w=600&auto=format&fit=crop",
        icon: "🏛️"
      },
      {
        name: "Мис Греко",
        description: "Національний парк з блакитними лагунами, печерами та містком закоханих.",
        image: "https://images.unsplash.com/photo-1523363390886-c567a5b32402?q=80&w=600&auto=format&fit=crop",
        icon: "🏞️"
      },
      {
        name: "Пляж Ніссі",
        description: "Найпопулярніший пляж Айя-Напи з білим піском і бірюзовою водою.",
        image: "https://images.unsplash.com/photo-1533903125219-c0ae04797072?q=80&w=600&auto=format&fit=crop",
        icon: "🏖️"
      }
    ],
    whatToBuy: ['Сир Халумі', 'Вино Коммандарія', 'Срібло (Лефкара)', 'Оливкова олія'],
    souvenirs: [
      {
        name: "Сир Халумі",
        description: "Кіпрський сир для смаження. Краще купувати вакуумований, щоб довезти.",
        image: "https://images.unsplash.com/photo-1507590859595-585a0655a6d3?q=80&w=600&auto=format&fit=crop",
        icon: "🧀"
      },
      {
        name: "Вино Коммандарія",
        description: "Найстаріше вино у світі, яке досі виробляють. Солодке та густе.",
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=600&auto=format&fit=crop",
        icon: "🍷"
      },
      {
        name: "Лефкарітика",
        description: "Знамените мереживо з села Лефкара. Внесено до спадщини ЮНЕСКО.",
        image: "https://images.unsplash.com/photo-1605218427306-63372c7edc5f?q=80&w=600&auto=format&fit=crop",
        icon: "🧶"
      },
      {
        name: "Сироп ріжкового дерева",
        description: "Корисний замінник цукру та шоколаду. 'Чорне золото' Кіпру.",
        image: "https://images.unsplash.com/photo-1612741913164-c2c3664d60c4?q=80&w=600&auto=format&fit=crop",
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
    image: '/images/destinations/czechia.jpg',
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
        image: "https://images.unsplash.com/photo-1541849546-216549ae216d?q=80&w=600&auto=format&fit=crop",
        icon: "🌉"
      },
      {
        name: "Празький Град",
        description: "Найбільший замковий комплекс світу. Собор святого Віта видно звідусіль.",
        image: "https://images.unsplash.com/photo-1563842880053-ecbe9fa1a364?q=80&w=600&auto=format&fit=crop",
        icon: "🏰"
      },
      {
        name: "Чеський Крумлов",
        description: "Казкове містечко з червоними дахами та замком, оточене річкою. Час тут зупинився.",
        image: "https://images.unsplash.com/photo-1579417846170-c0b968532f7a?q=80&w=600&auto=format&fit=crop",
        icon: "🏘️"
      },
      {
        name: "Староміська площа",
        description: "Серце Праги з астрономічним годинником (Орлой), де фігурки рухаються щогодини.",
        image: "https://images.unsplash.com/photo-1549526710-539da6c2c8f6?q=80&w=600&auto=format&fit=crop",
        icon: "🕰️"
      }
    ],
    whatToBuy: ['Богемське скло', 'Гранат', 'Вафлі (оплатки)', 'Бехеровка'],
    souvenirs: [
      {
        name: "Бехеровка",
        description: "Трав'яний лікер з Карлових Вар. Лікує тіло і веселить душу.",
        image: "https://images.unsplash.com/photo-1627447479703-a1af17b0d77d?q=80&w=600&auto=format&fit=crop",
        icon: "🍾"
      },
      {
        name: "Чеський гранат",
        description: "Камінь кольору голубиної крові. Купуйте тільки з сертифікатом.",
        image: "https://images.unsplash.com/photo-1602700345092-299696e57df5?q=80&w=600&auto=format&fit=crop",
        icon: "💍"
      },
      {
        name: "Оплатки",
        description: "Тонкі хрусткі вафлі з начинкою. Найсмачніші - теплі.",
        image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=600&auto=format&fit=crop",
        icon: "🧇"
      },
      {
        name: "Крітек (Кріт)",
        description: "Іграшка з відомого мультфільму, яку обожнюють діти і дорослі.",
        image: "https://images.unsplash.com/photo-1557973801-b541797c2728?q=80&w=600&auto=format&fit=crop",
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
    image: '/images/destinations/uae.jpg',
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
        image: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?q=80&w=600&auto=format&fit=crop",
        icon: "🏙️"
      },
      {
        name: "Мечеть Шейха Заїда",
        description: "Білосніжна мечеть в Абу-Дабі, що вражає своєю розкішшю, килимами та люстрами Swarovski.",
        image: "https://images.unsplash.com/photo-1518066000714-58c45f1a2c0a?q=80&w=600&auto=format&fit=crop",
        icon: "🕌"
      },
      {
        name: "Пустельне Сафарі",
        description: "Екстремальна поїздка на джипах по барханах, вечеря під зорями та танці живота.",
        image: "https://images.unsplash.com/photo-1451337516015-6b6fcd53e5a0?q=80&w=600&auto=format&fit=crop",
        icon: "🚙"
      },
      {
        name: "Музей Майбутнього",
        description: "Одна з найкрасивіших будівель світу. Подорож у світ технологій та інновацій завтрашнього дня.",
        image: "https://images.unsplash.com/photo-1652159048386-35f92275b28d?q=80&w=600&auto=format&fit=crop",
        icon: "🚀"
      }
    ],
    whatToBuy: ['Золото та прикраси', 'Парфуми', 'Фініки', 'Електроніка'],
    souvenirs: [
      {
        name: "Фініки (Bateel)",
        description: "Королівський делікатес. Фініки в шоколаді або з горіхами - це смак сходу.",
        image: "https://images.unsplash.com/photo-1594916891040-20513e9a4e8d?q=80&w=600&auto=format&fit=crop",
        icon: "🍮"
      },
      {
        name: "Арабські парфуми",
        description: "Насичені аромати на основі олії уд (agarwood). Стійкі та шлейфові.",
        image: "https://images.unsplash.com/photo-1616949755610-8c9df40237e1?q=80&w=600&auto=format&fit=crop",
        icon: "🧴"
      },
      {
        name: "Золото",
        description: "Золотий ринок Дубая пропонує прикраси за одними з найвигідніших цін у світі.",
        image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=600&auto=format&fit=crop",
        icon: "💍"
      },
      {
        name: "Кавник Далла",
        description: "Традиційний арабський кавник - символ гостинності. Чудовий елемент декору.",
        image: "https://images.unsplash.com/photo-1563287114-11853d969245?q=80&w=600&auto=format&fit=crop",
        icon: "☕"
      }
    ],
    bestMonths: [10, 11, 12, 1, 2, 3, 4],
    region: 'Asia'
  },
  {
    id: 'thailand',
    name: 'Таїланд',
    season: 'Листопад - Березень',
    seasonIcon: '🍜',
    image: '/images/destinations/thailand.jpg',
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
        image: "https://images.unsplash.com/photo-1537956965359-7573183d1f57?q=80&w=600&auto=format&fit=crop",
        icon: "🏝️"
      },
      {
        name: "Королівський палац",
        description: "Комплекс храмів у Бангкоку. Неймовірна деталізація, золото та статуя Смарагдового Будди.",
        image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?q=80&w=600&auto=format&fit=crop",
        icon: "👑"
      },
      {
        name: "Храм Істини",
        description: "Гігантський храм у Паттаї, побудований повністю з дерева без жодного цвяха.",
        image: "https://images.unsplash.com/photo-1598970891484-9547d79b2a75?q=80&w=600&auto=format&fit=crop",
        icon: "🪵"
      },
      {
        name: "Плавучий ринок",
        description: "Традиційна торгівля з човнів. Колоритно, галасливо і дуже смачно.",
        image: "https://images.unsplash.com/photo-1598327733454-e7c6536b99de?q=80&w=600&auto=format&fit=crop",
        icon: "🛶"
      }
    ],
    whatToBuy: ['Тайський шовк', 'Кокосова олія', 'Спеції', 'Вироби з дерева'],
    souvenirs: [
      {
        name: "Кокосова олія",
        description: "Найкращий натуральний засіб для шкіри та волосся. У Таїланді вона найякісніша.",
        image: "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?q=80&w=600&auto=format&fit=crop",
        icon: "🥥"
      },
      {
        name: "Тайський бальзам",
        description: "Легендарний 'Тигровий бальзам' від усіх хвороб. Чудово знімає біль у м'язах.",
        image: "https://images.unsplash.com/photo-1556228720-6d8a3d5f6e80?q=80&w=600&auto=format&fit=crop",
        icon: "🐅"
      },
      {
        name: "Штани зі слонами",
        description: "Класичний сувенір бекпекера. Зручні, легкі та дуже 'тайські'.",
        image: "https://images.unsplash.com/photo-1528164344705-47542687000d?q=80&w=600&auto=format&fit=crop",
        icon: "👖"
      },
      {
        name: "Синій чай (Анчан)",
        description: "Чай з квіток кліторії, який змінює колір на фіолетовий, якщо додати лимон.",
        image: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=600&auto=format&fit=crop",
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
    image: '/images/destinations/srilanka.jpg',
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
        image: "https://images.unsplash.com/photo-1588235282247-c0e81c1950d9?q=80&w=600&auto=format&fit=crop",
        icon: "🦁"
      },
      {
        name: "Дев\'ятиарковий міст",
        description: "Міст у небі в місті Елла. Якщо пощастить, побачите знаменитий синій поїзд.",
        image: "https://images.unsplash.com/photo-1544983273-04b3a4a15993?q=80&w=600&auto=format&fit=crop",
        icon: "🚂"
      },
      {
        name: "Нацпарк Яла",
        description: "Місце, де можна побачити леопардів, слонів та крокодилів у дикій природі.",
        image: "https://images.unsplash.com/photo-1535496660128-444f24eb066c?q=80&w=600&auto=format&fit=crop",
        icon: "🐆"
      },
      {
        name: "Чайні плантації",
        description: "Нувара-Елія - маленька Англія. Зелені пагорби, туман та найкращий у світі чай.",
        image: "https://images.unsplash.com/photo-1544831201-c8529cb5f12e?q=80&w=600&auto=format&fit=crop",
        icon: "🍃"
      }
    ],
    whatToBuy: ['Цейлонський чай', 'Дорогоцінне каміння', 'Спеції', 'Батик'],
    souvenirs: [
      {
        name: "Цейлонський чай",
        description: "Збирається вручну. Найкращий подарунок зі Шрі-Ланки. Шукайте лева на упаковці.",
        image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=600&auto=format&fit=crop",
        icon: "🍵"
      },
      {
        name: "Сапфіри",
        description: "Шрі-Ланка багата на самоцвіти. Синій сапфір - найвідоміший.",
        image: "https://images.unsplash.com/photo-1599707367072-cd6ad66acc40?q=80&w=600&auto=format&fit=crop",
        icon: "💎"
      },
      {
        name: "Спеції",
        description: "Кориця, кардамон, гвоздика. Відвідайте сад спецій, щоб побачити, як вони ростуть.",
        image: "https://images.unsplash.com/photo-1532339142463-fd0a8979791a?q=80&w=600&auto=format&fit=crop",
        icon: "🌿"
      },
      {
        name: "Маски",
        description: "Традиційні дерев'яні маски, які захищають від злих духів 'Ракша'.",
        image: "https://images.unsplash.com/photo-1647424915830-22c608f61530?q=80&w=600&auto=format&fit=crop",
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
    image: '/images/destinations/indonesia.jpg',
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
        image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9dab?q=80&w=600&auto=format&fit=crop",
        icon: "🌾"
      },
      {
        name: "Священний Ліс Мавп",
        description: "Джунглі в центрі Убуда, де живуть сотні нахабних, але милих макак. Є стародавні храми.",
        image: "https://images.unsplash.com/photo-1540304453527-6cdf1aa38d69?q=80&w=600&auto=format&fit=crop",
        icon: "🐒"
      },
      {
        name: "Храм Улувату",
        description: "Храм на краю 70-метрової скелі над океаном. Найкраще місце для заходу сонця та танцю Кечак.",
        image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=600&auto=format&fit=crop",
        icon: "🌅"
      },
      {
        name: "Нуса Пеніда",
        description: "Сусідній острів з дикими пляжами. Kelingking Beach (пляж динозавра) саме тут.",
        image: "https://images.unsplash.com/photo-1532057390913-c24c2fe27d44?q=80&w=600&auto=format&fit=crop",
        icon: "🦖"
      }
    ],
    whatToBuy: ['Кава Лювак', 'Вироби з дерева', 'Срібло', 'Батик'],
    souvenirs: [
      {
        name: "Ловець снів",
        description: "Балі - батьківщина ловців снів. Вони тут на кожному кроці, різних розмірів та кольорів.",
        image: "https://images.unsplash.com/photo-1571217621184-48614a9cf41d?q=80&w=600&auto=format&fit=crop",
        icon: "🕸️"
      },
      {
        name: "Вироби з дерева",
        description: "Майстри з села Мас вирізають неймовірні статуетки, маски та декор з тикового дерева.",
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e35a6?q=80&w=600&auto=format&fit=crop",
        icon: "🗿"
      },
      {
        name: "Срібло",
        description: "Село Челук відоме своїми ювелірами. Срібні прикраси тут дуже деталізовані та якісні.",
        image: "https://images.unsplash.com/photo-1623945952674-3255dc77ea2b?q=80&w=600&auto=format&fit=crop",
        icon: "💍"
      },
      {
        name: "Кава Лювак",
        description: "Найдорожча кава у світі, яку 'виробляють' цивети. Скуштуйте на плантації.",
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop",
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
    image: '/images/destinations/maldives.jpg',
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
        image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=600&auto=format&fit=crop",
        icon: "🏠"
      },
      {
        name: "Сяючий пляж",
        description: "Острів Ваадху відомий своїм планктоном, що світиться вночі як зоряне небо.",
        image: "https://images.unsplash.com/photo-1565459326884-699adca46d0a?q=80&w=600&auto=format&fit=crop",
        icon: "✨"
      },
      {
        name: "Підводний ресторан",
        description: "Вечеря на глибині 5 метрів в оточенні риб та скатів. Унікальний гастрономічний досвід.",
        image: "https://images.unsplash.com/photo-1576018721102-1a48c66e287a?q=80&w=600&auto=format&fit=crop",
        icon: "🍽️"
      },
      {
        name: "Місто Мале",
        description: "Одна з найменших столиць світу. Колоритні рибний та фруктовий ринки, мечеті.",
        image: "https://images.unsplash.com/photo-1578331771960-a29241517409?q=80&w=600&auto=format&fit=crop",
        icon: "🏙️"
      }
    ],
    whatToBuy: ['Вироби з кокосу', 'Місцеві сувеніри', 'Рибні консерви'],
    souvenirs: [
      {
        name: "Кокосові вироби",
        description: "З шкаралупи кокосу роблять все: від посуду і ламп до сумок і прикрас.",
        image: "https://images.unsplash.com/photo-1598460624385-2e658399e5cc?q=80&w=600&auto=format&fit=crop",
        icon: "🥥"
      },
      {
        name: "Рибні консерви",
        description: "Тунець - головний експорт Мальдів. Спробуйте в\'яленого тунця або паштет.",
        image: "https://images.unsplash.com/photo-1534944917544-774f7678853f?q=80&w=600&auto=format&fit=crop",
        icon: "🐟"
      },
      {
        name: "Пісок у пляшці",
        description: "Частинка білосніжного мальдівського пляжу (з легальних сувенірних крамниць).",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop",
        icon: "⏳"
      },
      {
        name: "Акулячі зуби",
        description: "Сушені щелепи або зуби акули - популярний, хоч і трохи страхітливий сувенір.",
        image: "https://images.unsplash.com/photo-1599557476839-829d108d885a?q=80&w=600&auto=format&fit=crop",
        icon: "🦈"
      }
    ],
    bestMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    region: 'Asia'
  },
  {
    id: 'vietnam',
    name: 'В\'єтнам',
    season: 'Листопад - Квітень',
    seasonIcon: '🏮',
    image: '/images/destinations/vietnam.jpg',
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
        image: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=600&auto=format&fit=crop",
        icon: "🐉"
      },
      {
        name: "Золотий Міст",
        description: "Міст у Данангу, який підтримують гігантські кам'яні руки. Виглядає фантастично.",
        image: "https://images.unsplash.com/photo-1590425713437-0176840d2169?q=80&w=600&auto=format&fit=crop",
        icon: "🌉"
      },
      {
        name: "Хойан",
        description: "Місто ліхтарів. Особливо гарне ввечері, коли запалюються тисячі паперових ліхтариків.",
        image: "https://images.unsplash.com/photo-1557750255-c76072a7bb11?q=80&w=600&auto=format&fit=crop",
        icon: "🏮"
      },
      {
        name: "Дельта Меконгу",
        description: "Лабіринт річок і каналів. Життя тут проходить на воді.",
        image: "https://images.unsplash.com/photo-1565022802083-205128038753?q=80&w=600&auto=format&fit=crop",
        icon: "🛶"
      }
    ],
    whatToBuy: ['Кава', 'В\'єтнамські капелюхи', 'Шовк', 'Перли'],
    souvenirs: [
      {
        name: "В'єтнамська кава",
        description: "Робуста з шоколадним присмаком. Купіть також спеціальний фітльр (фін).",
        image: "https://images.unsplash.com/photo-1627521575235-905187768dc2?q=80&w=600&auto=format&fit=crop",
        icon: "☕"
      },
      {
        name: "Нон Ла",
        description: "Конічний солом'яний капелюх. Найвпізнаваніший символ В'єтнаму.",
        image: "https://images.unsplash.com/photo-1535798993952-4467c6999be4?q=80&w=600&auto=format&fit=crop",
        icon: "👒"
      },
      {
        name: "Бальзам 'Зірочка'",
        description: "Так-так, вона родом з В'єтнаму! 'Золота зірка' тут справжній бренд.",
        image: "https://images.unsplash.com/photo-1585834887309-847248e5812e?q=80&w=600&auto=format&fit=crop",
        icon: "⭐"
      },
      {
        name: "Шовк",
        description: "Якісний та недорогий. Можна пошити плаття або костюм за один день.",
        image: "https://images.unsplash.com/photo-1520626078652-32b00511855a?q=80&w=600&auto=format&fit=crop",
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
    image: '/images/destinations/georgia.jpg',
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
        image: "https://images.unsplash.com/photo-1596486161989-2184069805b5?q=80&w=600&auto=format&fit=crop",
        icon: "🏙️"
      },
      {
        name: "Казбегі",
        description: "Гора Казбек та церква Гергеті на висоті 2170 м. Краєвид, від якого перехоплює подих.",
        image: "https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?q=80&w=600&auto=format&fit=crop",
        icon: "🏔️"
      },
      {
        name: "Сванетія",
        description: "Країна тисячі веж. Високогірний регіон, де збереглися стародавні традиції.",
        image: "https://images.unsplash.com/photo-1563721345-4de4b4070732?q=80&w=600&auto=format&fit=crop",
        icon: "🏰"
      },
      {
        name: "Батумі",
        description: "Сучасний курорт на Чорному морі. Хмарочоси, казино та ботанічний сад.",
        image: "https://images.unsplash.com/photo-1565019808453-4876251b3447?q=80&w=600&auto=format&fit=crop",
        icon: "🎡"
      }
    ],
    whatToBuy: ['Вино', 'Чурчхела', 'Мінанкарі (емель)', 'Спеції'],
    souvenirs: [
      {
        name: "Грузинське вино",
        description: "Сапераві, Кіндзмараулі. Грузія - колиска виноробства.",
        image: "https://images.unsplash.com/photo-1585553616435-2dc0a54e271d?q=80&w=600&auto=format&fit=crop",
        icon: "🍷"
      },
      {
        name: "Чурчхела",
        description: "Грузинський снікерс. Горіхи у виноградному соку. Смачно та корисно.",
        image: "https://images.unsplash.com/photo-1632155106173-00f38b41785f?q=80&w=600&auto=format&fit=crop",
        icon: "🍇"
      },
      {
        name: "Сванська сіль",
        description: "Ароматна суміш солі та гірських трав. Робить будь-яку страву шедевром.",
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=600&auto=format&fit=crop",
        icon: "🧂"
      },
      {
        name: "Мінанкарі",
        description: "Прикраси з перегородчастої емалі. Дуже тонкка та красива робота.",
        image: "https://images.unsplash.com/photo-1610984857771-460309995133?q=80&w=600&auto=format&fit=crop",
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
    image: '/images/destinations/egypt.jpg',
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
        image: "https://images.unsplash.com/photo-1539650116455-251d9325a545?q=80&w=600&auto=format&fit=crop",
        icon: "🔺"
      },
      {
        name: "Великий Сфінкс",
        description: "Загадковий охоронець пірамід з тілом лева та головою фараона.",
        image: "https://images.unsplash.com/photo-1539768942893-daf53e448371?q=80&w=600&auto=format&fit=crop",
        icon: "🦁"
      },
      {
        name: "Луксорський храм",
        description: "Величний храмовий комплекс на березі Нілу. Особливо красивий ввечері з підсвіткою.",
        image: "https://images.unsplash.com/photo-1566192250979-565d772989c6?q=80&w=600&auto=format&fit=crop",
        icon: "🏛️"
      },
      {
        name: "Червоне море",
        description: "Один з найкрасивіших підводних світів планети. Корали та рибки доступні навіть біля берега.",
        image: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?q=80&w=600&auto=format&fit=crop",
        icon: "🐠"
      }
    ],
    whatToBuy: ['Папірус', 'Ароматичні олії', 'Бавовняні вироби', 'Спеції та чай каркаде'],
    souvenirs: [
      {
        name: "Папірус",
        description: "Картини на справжньому папірусі з сюжетами давньоєгипетської міфології.",
        image: "https://images.unsplash.com/photo-1605391300055-6b74e84b9015?q=80&w=600&auto=format&fit=crop",
        icon: "📜"
      },
      {
        name: "Єгипетські олії",
        description: "Есенції, з яких роблять відомі французькі парфуми, або лікувальні олії (чорний кмин).",
        image: "https://images.unsplash.com/photo-1608571424266-ed0d96d27166?q=80&w=600&auto=format&fit=crop",
        icon: "🏺"
      },
      {
        name: "Чай Каркаде",
        description: "Національний напій з суданської троянди (гібіскусу). Смачний гарячим і холодним.",
        image: "https://images.unsplash.com/photo-1563729760-444747c34b6b?q=80&w=600&auto=format&fit=crop",
        icon: "🌺"
      },
      {
        name: "Кальян (Шиша)",
        description: "Традиційний сувенір. Важливо обрати якісний метал, а не декоративний варіант.",
        image: "https://images.unsplash.com/photo-1533106497176-45dc19465243?q=80&w=600&auto=format&fit=crop",
        icon: "💨"
      }
    ],
    bestMonths: [10, 11, 12, 1, 2, 3, 4, 5],
    region: 'Africa'
  },
  {
    id: 'tunisia',
    name: 'Туніс',
    season: 'Квітень - Жовтень',
    seasonIcon: '☀️',
    image: '/images/destinations/tunisia.jpg',
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
        image: "https://images.unsplash.com/photo-1539493639822-19e05697d81a?q=80&w=600&auto=format&fit=crop",
        icon: "🏘️"
      },
      {
        name: "Карфаген",
        description: "Carthago delenda est. Руїни однієї з наймогутніших імперій давнини.",
        image: "https://images.unsplash.com/photo-1569426639824-cce865aa4825?q=80&w=600&auto=format&fit=crop",
        icon: "🏺"
      },
      {
        name: "Амфітеатр Ель-Джем",
        description: "Римський колізей, що зберігся краще за римський. Тут знімали 'Гладіатора'.",
        image: "https://images.unsplash.com/photo-1549118742-17865f83863d?q=80&w=600&auto=format&fit=crop",
        icon: "🏟️"
      },
      {
        name: "Сахара",
        description: "Зустріч світанку на дюнах, катання на верблюдах та декорації 'Зоряних воєн'.",
        image: "https://images.unsplash.com/photo-1559586616-361e18714958?q=80&w=600&auto=format&fit=crop",
        icon: "🏜️"
      }
    ],
    whatToBuy: ['Оливкова олія', 'Кераміка', 'Килими', 'Спеції та фініки'],
    souvenirs: [
      {
        name: "Кераміка",
        description: "Набел - столиця гончарства. Яскраві тарілки та глечики.",
        image: "https://images.unsplash.com/photo-1605335191753-46387d853b0c?q=80&w=600&auto=format&fit=crop",
        icon: "🏺"
      },
      {
        name: "Оливкова олія",
        description: "Туніс - один з лідерів експорту. Якісна і дешевша, ніж в Європі.",
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=600&auto=format&fit=crop",
        icon: "🫒"
      },
      {
        name: "Фініки",
        description: "Сорт 'Деглет Нур' (пальці світла) - найсолодші та найпрозоріші.",
        image: "https://images.unsplash.com/photo-1594916891040-20513e9a4e8d?q=80&w=600&auto=format&fit=crop",
        icon: "🌴"
      },
      {
        name: "Троянда пустелі",
        description: "Кристалічне утворення з піску та солі, схоже на квітку. Дарує вічне кохання.",
        image: "https://images.unsplash.com/photo-1558288596-f909db788863?q=80&w=600&auto=format&fit=crop",
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
    image: '/images/destinations/zanzibar.jpg',
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
        image: "https://images.unsplash.com/photo-1534731326463-b1d643d9c750?q=80&w=600&auto=format&fit=crop",
        icon: "🏙️"
      },
      {
        name: "Prison Island",
        description: "Острів, де живуть гігантські сейшельські черепахи. Деяким з них понад 150 років.",
        image: "https://images.unsplash.com/photo-1517456365287-34dd69747a82?q=80&w=600&auto=format&fit=crop",
        icon: "🐢"
      },
      {
        name: "Ресторан The Rock",
        description: "Ресторан на скелі посеред океану. Під час припливу дістатися можна лише човном.",
        image: "https://images.unsplash.com/photo-1579294247262-42173cac47c3?q=80&w=600&auto=format&fit=crop",
        icon: "🍴"
      },
      {
        name: "Ферма спецій",
        description: "Подивіться, як росте ваніль, кориця та мускатний горіх. Ароматна екскурсія.",
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=600&auto=format&fit=crop",
        icon: "🌿"
      }
    ],
    whatToBuy: ['Прянощі', 'Занзібарський шовк', 'Вироби з кокосу', 'Африканські сувеніри'],
    souvenirs: [
      {
        name: "Спеції",
        description: "Занзібар називають островом спецій. Набори кориці, ванілі та перцю.",
        image: "https://images.unsplash.com/photo-1532339142463-fd0a8979791a?q=80&w=600&auto=format&fit=crop",
        icon: "🌶️"
      },
      {
        name: "Картини Тінга-Тінга",
        description: "Яскравий африканський живопис емаллю. Веселі тварини та сюжети.",
        image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?q=80&w=600&auto=format&fit=crop",
        icon: "🎨"
      },
      {
        name: "Дерев'яні маски",
        description: "Маконде - чорне ебенове дерево. Статуетки та маски неймовірної роботи.",
        image: "https://images.unsplash.com/photo-1628174780882-74d1a0179a66?q=80&w=600&auto=format&fit=crop",
        icon: "🗿"
      },
      {
        name: "Кава з Кіліманджаро",
        description: "Танзанійська арабіка з вулканічних схилів. Має насичений смак.",
        image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=600&auto=format&fit=crop",
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
    image: '/images/destinations/kenya.jpg',
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
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=600&auto=format&fit=crop",
        icon: "🦁"
      },
      {
        name: "Giraffe Manor",
        description: "Знаменитий готель, де жирафи заглядають у вікна під час сніданку.",
        image: "https://images.unsplash.com/photo-1549488346-6017b2e1b10a?q=80&w=600&auto=format&fit=crop",
        icon: "🦒"
      },
      {
        name: "Озеро Накуру",
        description: "Озеро фламінго. Тисячі рожевих птахів на тлі блакитної води.",
        image: "https://images.unsplash.com/photo-1547963327-04022af3f87d?q=80&w=600&auto=format&fit=crop",
        icon: "🦩"
      },
      {
        name: "Діані Біч",
        description: "Один з найкращих пляжів світу біля Момбаси. Після сафарі - на океан!",
        image: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?q=80&w=600&auto=format&fit=crop",
        icon: "🏖️"
      }
    ],
    whatToBuy: ['Вироби з бісеру', 'Кава', 'Маски з дерева', 'Тканини Канга'],
    souvenirs: [
      {
        name: "Вироби з бісеру",
        description: "Традиційні прикраси племені Масаї. Дуже яскраві та символічні.",
        image: "https://images.unsplash.com/photo-1578351545648-525287e07a61?q=80&w=600&auto=format&fit=crop",
        icon: "📿"
      },
      {
        name: "Кава Кенія АА",
        description: "Один з кращих сортів арабіки у світі з винною кислинкою.",
        image: "https://images.unsplash.com/photo-1544831201-c8529cb5f12e?q=80&w=600&auto=format&fit=crop",
        icon: "☕"
      },
      {
        name: "Канга та Кікой",
        description: "Традиційні африканські тканини. Можна використовувати як парео або шарф.",
        image: "https://images.unsplash.com/photo-1596700877028-15a01da136a4?q=80&w=600&auto=format&fit=crop",
        icon: "🧣"
      },
      {
        name: "Статуетки тварин",
        description: "Дерев'яні або кам'яні фігурки тварин, яких ви бачили на сафарі.",
        image: "https://images.unsplash.com/photo-1558235282-3d7c58516089?q=80&w=600&auto=format&fit=crop",
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
    image: '/images/destinations/dominican.jpg',
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
        image: "https://images.unsplash.com/photo-1548574505-12cf80521cc5?q=80&w=600&auto=format&fit=crop",
        icon: "🏝️"
      },
      {
        name: "Альтос-де-Чавон",
        description: "Місто художників. Копія італійського середньовічного села, побудована над річкою Чавон.",
        image: "https://images.unsplash.com/photo-1533091090875-1ff4565612ba?q=80&w=600&auto=format&fit=crop",
        icon: "🎨"
      },
      {
        name: "Пляж Баваро",
        description: "Один з найкращих пляжів світу в Пунта-Кані. Кілометри ідеального піску та океан.",
        image: "https://images.unsplash.com/photo-1582650085810-7756fdf068af?q=80&w=600&auto=format&fit=crop",
        icon: "🏖️"
      },
      {
        name: "Водоспад Ель-Лимон",
        description: "Захований у джунглях водоспад. Шлях туди на конях - це окрема пригода.",
        image: "https://images.unsplash.com/photo-1629851722839-44ba2ea7b003?q=80&w=600&auto=format&fit=crop",
        icon: "🐎"
      }
    ],
    whatToBuy: ['Ром та сигари', 'Кава', 'Прикраси з ларімару', 'Вироби з бурштину'],
    souvenirs: [
      {
        name: "Ларімар",
        description: "Напівдорогоцінний камінь ніжно-блакитного кольору, який видобувають тільки в Домінікані.",
        image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?q=80&w=600&auto=format&fit=crop",
        icon: "💎"
      },
      {
        name: "Домініканський ром",
        description: "Brugal, Barceló або Oliver. М'який смак та багата історія. Обов'язково беріть витриманий (Anejo).",
        image: "https://images.unsplash.com/photo-1614313511387-1436a4480ebb?q=80&w=600&auto=format&fit=crop",
        icon: "🥃"
      },
      {
        name: "Сигари",
        description: "Ручна скрутка. Домініканські сигари вважаються одними з найкращих у світі (конкурент Куби).",
        image: "https://images.unsplash.com/photo-1551754055-6c7a72d00167?q=80&w=600&auto=format&fit=crop",
        icon: "🚬"
      },
      {
        name: "Кава",
        description: "Santo Domingo Coffee. Ароматна, міцна та з шоколадними нотками.",
        image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=600&auto=format&fit=crop",
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
    image: '/images/destinations/mexico.jpg',
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
        image: "https://images.unsplash.com/photo-1518638151313-982d6238c914?q=80&w=600&auto=format&fit=crop",
        icon: "🔺"
      },
      {
        name: "Тулум",
        description: "Руїни стародавнього міста майя прямо на березі Карибського моря. Вражаючий контраст.",
        image: "https://images.unsplash.com/photo-1504730655502-6c2354838424?q=80&w=600&auto=format&fit=crop",
        icon: "🌊"
      },
      {
        name: "Сенот Ік-Кіль",
        description: "Священна підземна 'криниця' майя з ліанами та кришталевою водою. Ідеально для купання.",
        image: "https://images.unsplash.com/photo-1534567513524-70a0494dfa96?q=80&w=600&auto=format&fit=crop",
        icon: "💧"
      },
      {
        name: "Парк Шкарет",
        description: "Еко-археологічний парк. Підземні річки, зоопарк, акваріум та вечірнє шоу про історію Мексики.",
        image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=600&auto=format&fit=crop",
        icon: "🦜"
      }
    ],
    whatToBuy: ['Текіла', 'Сомбреро', 'Срібло', 'Кераміка Талавера'],
    souvenirs: [
      {
        name: "Текіла та Мескаль",
        description: "Справжній смак Мексики. Шукайте напис '100% Agave' для найкращої якості.",
        image: "https://images.unsplash.com/photo-1516600164266-f3b8166ae679?q=80&w=600&auto=format&fit=crop",
        icon: "🌵"
      },
      {
        name: "Капелюх Сомбреро",
        description: "Яскравий та веселий сувенір. Хоча носити його вдома ви навряд чи будете :)",
        image: "https://images.unsplash.com/photo-1589400378037-cc7e089d76c9?q=80&w=600&auto=format&fit=crop",
        icon: "👒"
      },
      {
        name: "Кераміка Талавера",
        description: "Унікальна розписна кераміка. Тарілки, чашки або плитка в синьо-білих тонах.",
        image: "https://images.unsplash.com/photo-1623941002347-6644485521f7?q=80&w=600&auto=format&fit=crop",
        icon: "🏺"
      },
      {
        name: "Череп (Калавера)",
        description: "Символ Дня Мертвих. Яскраві розписні черепи - це не страшно, а культурно.",
        image: "https://images.unsplash.com/photo-1509664158680-07c5032b513a?q=80&w=600&auto=format&fit=crop",
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
    image: '/images/destinations/cuba.jpg',
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
        image: "https://images.unsplash.com/photo-1503917988258-f87a78e3c99d?q=80&w=600&auto=format&fit=crop",
        icon: "🏙️"
      },
      {
        name: "Варадеро",
        description: "20 кілометрів ідеального пляжу. Бірюзовий океан та готелі 'все включено'.",
        image: "https://images.unsplash.com/photo-1534945763185-5b4d6b671159?q=80&w=600&auto=format&fit=crop",
        icon: "🏖️"
      },
      {
        name: "Долина Віньялес",
        description: "Нацпарк з карстовими пагорбами 'моготе' та тютюновими плантаціями.",
        image: "https://images.unsplash.com/photo-1620063996531-1869e54d3cd3?q=80&w=600&auto=format&fit=crop",
        icon: "⛰️"
      },
      {
        name: "Ретро-кари",
        description: "Музей на колесах. Проїхатися на рожевому кабріолеті вздовж набережної Малекон - це магія.",
        image: "https://images.unsplash.com/photo-1588613437293-2d25f77174db?q=80&w=600&auto=format&fit=crop",
        icon: "🚗"
      }
    ],
    whatToBuy: ['Сигари (Cohiba)', 'Ром Havana Club', 'Кава', 'Картини'],
    souvenirs: [
      {
        name: "Сигари (Cohiba)",
        description: "Найкращі сигари у світі. Купуйте тільки в офіційних магазинах.",
        image: "https://images.unsplash.com/photo-1579975096649-e7731521a02e?q=80&w=600&auto=format&fit=crop",
        icon: "🚬"
      },
      {
        name: "Ром Havana Club",
        description: "Legendario або Santiago de Cuba. Солодкий, густий смак Свободи.",
        image: "https://images.unsplash.com/photo-1512053014458-3dc3a38062ec?q=80&w=600&auto=format&fit=crop",
        icon: "🥃"
      },
      {
        name: "Кава Cubita",
        description: "Міцна та ароматна кубинська кава. Ідеально поєднується з сигарою.",
        image: "https://images.unsplash.com/photo-1610632380989-680fe40816c6?q=80&w=600&auto=format&fit=crop",
        icon: "☕"
      },
      {
        name: "Картини",
        description: "Кубинське мистецтво дуже яскраве. Картина з вулицями Гавани - чудовий спогад.",
        image: "https://images.unsplash.com/photo-1576485875224-688753228a8d?q=80&w=600&auto=format&fit=crop",
        icon: "🎨"
      }
    ],
    bestMonths: [11, 12, 1, 2, 3, 4],
    region: 'North America'
  }
]