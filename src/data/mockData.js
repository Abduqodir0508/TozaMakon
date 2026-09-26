export const TASHKENT_DISTRICTS = [
  "Barcha tumanlar",
  "Chilonzor",
  "Yunusobod",
  "Mirzo Ulug'bek",
  "Yashnobod",
  "Shayxontohur",
  "Olmazor",
  "Yakkasaroy",
  "Mirobod",
  "Sergeli",
  "Yangihayot",
  "Uchtepa",
  "Bektemir"
];

export const INITIAL_INITIATIVES = [
  {
    id: "init-1",
    type: "tree", // "tree" | "cleanup"
    title: "Chilonzor 9-mavze: 40 tup chinor va archa ko'chatlari ekildi",
    description: "Mahalla yoshlari va faxriylari birgalikda qarovsiz qolgan bo'sh maydonga tomchilatib sug'orish tizimi o'rnatib, manzarali daraxtlar ekishdi. Mahalla ko'rkiga ko'rk qo'shildi!",
    district: "Chilonzor",
    address: "Chilonzor tumani, 9-mavze, 14-maktab yonidagi xiyobon",
    coords: [41.2721, 69.2045],
    count: 40, // trees planted or bags/m2 cleaned
    countUnit: "daraxt",
    author: {
      name: "Sardor Komilov",
      handle: "@sardor_eco",
      phone: "+998 90 123 45 67",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      badge: "🌳 Daraxtbon Master"
    },
    date: "2026-03-24",
    likes: 42,
    images: {
      before: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=80", // dry empty barren ground
      after: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80" // lush green planted trees
    },
    verified: true,
    impact: "+40 ta toza havo manbai"
  },
  {
    id: "init-2",
    type: "cleanup",
    title: "Amir Temur xiyoboni orqasidagi maydon chiqindilardan tozalandi",
    description: "Volontyorlar guruhi bilan 350 kg plastik va qog'oz chiqindilari saralanib, qayta ishlashga topshirildi. Endi bu yer toza va xavfsiz sayr joyi.",
    district: "Mirobod",
    address: "Mirobod tumani, Amir Temur xiyoboni atrofi",
    coords: [41.3111, 69.2797],
    count: 350,
    countUnit: "kg chiqindi",
    author: {
      name: "Nilufar Karimova",
      handle: "@nilu_green",
      phone: "+998 93 987 65 43",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      badge: "✨ Toza Shahar Posboni"
    },
    date: "2026-03-25",
    likes: 68,
    images: {
      before: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=800&auto=format&fit=crop&q=80", // trash / cluttered lot
      after: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800&auto=format&fit=crop&q=80" // clean neat park pathway
    },
    verified: true,
    impact: "350 kg chiqindi qayta ishlandi"
  },
  {
    id: "init-3",
    type: "cleanup",
    title: "Yunusobod Anhor bo'yi ommaviy hashar va tozalash aksiyasi",
    description: "Kanal bo'ylab 800 metr masofadagi polietilen paketlar va maishiy qoldiqlar olib tashlandi. Sohil bo'ylab 6 ta yangi chiqindi qutilari o'rnatildi.",
    district: "Yunusobod",
    address: "Yunusobod tumani, 4-mavze, Anhor kanali sohili",
    coords: [41.3638, 69.2882],
    count: 520,
    countUnit: "kg chiqindi",
    author: {
      name: "Jasur Rahimov",
      handle: "@jasur_ecouz",
      phone: "+998 97 777 88 99",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      badge: "🌟 Mega Volontyor"
    },
    date: "2026-03-22",
    likes: 89,
    images: {
      before: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&auto=format&fit=crop&q=80", // littered canal area
      after: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80" // serene clean water promenade
    },
    verified: true,
    impact: "800 metr sohil toza holatga keltirildi"
  },
  {
    id: "init-4",
    type: "tree",
    title: "Sergeli Yangi Hayot bog'i: 60 ta mevali va soya beruvchi daraxtlar",
    description: "Yangi turar-joy massivida yashovchi 30 ta oila birlashib, olma, o'rik va yapon saforasi ko'chatlarini ekishdi. Har bir daraxtga nom berildi.",
    district: "Sergeli",
    address: "Sergeli tumani, Yangi Choshtepa massivi",
    coords: [41.2285, 69.2215],
    count: 60,
    countUnit: "daraxt",
    author: {
      name: "Azizbek Tursunov",
      handle: "@aziz_tursun",
      phone: "+998 99 444 33 22",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      badge: "🌱 Yashil Vatan Elchisi"
    },
    date: "2026-03-20",
    likes: 54,
    images: {
      before: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=80", // construction dry ground
      after: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&auto=format&fit=crop&q=80" // flourishing trees in row
    },
    verified: true,
    impact: "+60 ta yangi nihol"
  },
  {
    id: "init-5",
    type: "tree",
    title: "Mirzo Ulug'bek Eko-Xiyoboni: Shamolga chidamli qarag'aylar ekildi",
    description: "Magistral yo'l yoqasidagi chang va shovqinni kamaytirish maqsadida 50 tup doimiy yashil qoraqarag'ay va pista ko'chatlari o'tqazildi.",
    district: "Mirzo Ulug'bek",
    address: "Mirzo Ulug'bek tumani, Buyuk Ipak Yo'li metrosi yaqini",
    coords: [41.3275, 69.3242],
    count: 50,
    countUnit: "daraxt",
    author: {
      name: "Shahnoza Alimova",
      handle: "@shahnoza_nature",
      phone: "+998 94 111 22 33",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      badge: "🍃 Eko Faol"
    },
    date: "2026-03-18",
    likes: 73,
    images: {
      before: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&auto=format&fit=crop&q=80",
      after: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&auto=format&fit=crop&q=80"
    },
    verified: true,
    impact: "+50 tup havo filtri"
  },
  {
    id: "init-6",
    type: "cleanup",
    title: "Shayxontohur Eski Shahar mahallasi: Ko'cha va ariqlar tozalanishi",
    description: "Tarixiy mahalla hududidagi qadimiy ariqlar va yo'laklar chiqindilardan tozalandi, suv oqimi qayta tiklandi va gullar ekildi.",
    district: "Shayxontohur",
    address: "Shayxontohur tumani, Chorsu maydoni orqasi",
    coords: [41.3262, 69.2392],
    count: 280,
    countUnit: "kg chiqindi",
    author: {
      name: "Bobur Mirzayev",
      handle: "@bobur_tashkent",
      phone: "+998 90 888 12 34",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
      badge: "✨ Toza Shahar Posboni"
    },
    date: "2026-03-16",
    likes: 61,
    images: {
      before: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=80",
      after: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&auto=format&fit=crop&q=80"
    },
    verified: true,
    impact: "Suv o'zani tozalab yo'lga qo'yildi"
  }
];

export const LEADERBOARD = [
  {
    id: "user-1",
    rank: 1,
    name: "Jasur Rahimov",
    handle: "@jasur_ecouz",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    points: 1250,
    trees: 110,
    cleanups: 8,
    badge: "🌟 Mega Eko-Qahramon",
    district: "Yunusobod"
  },
  {
    id: "user-2",
    rank: 2,
    name: "Sardor Komilov",
    handle: "@sardor_eco",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    points: 980,
    trees: 95,
    cleanups: 4,
    badge: "🌳 Daraxtbon Master",
    district: "Chilonzor"
  },
  {
    id: "user-3",
    rank: 3,
    name: "Nilufar Karimova",
    handle: "@nilu_green",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    points: 840,
    trees: 45,
    cleanups: 9,
    badge: "✨ Toza Shahar Posboni",
    district: "Mirobod"
  },
  {
    id: "user-4",
    rank: 4,
    name: "Shahnoza Alimova",
    handle: "@shahnoza_nature",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    points: 720,
    trees: 70,
    cleanups: 3,
    badge: "🍃 Eko Faol",
    district: "Mirzo Ulug'bek"
  },
  {
    id: "user-5",
    rank: 5,
    name: "Azizbek Tursunov",
    handle: "@aziz_tursun",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    points: 650,
    trees: 60,
    cleanups: 2,
    badge: "🌱 Yashil Vatan Elchisi",
    district: "Sergeli"
  },
  {
    id: "user-6",
    rank: 6,
    name: "Bobur Mirzayev",
    handle: "@bobur_tashkent",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    points: 590,
    trees: 30,
    cleanups: 6,
    badge: "✨ Toza Shahar Posboni",
    district: "Shayxontohur"
  }
];

export const SAMPLE_PRESET_IMAGES = {
  tree: {
    before: [
      { label: "Quruq bo'sh yer", url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=80" },
      { label: "Chang yo'l yoqasi", url: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&auto=format&fit=crop&q=80" },
      { label: "Eski beton maydoncha", url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&auto=format&fit=crop&q=80" }
    ],
    after: [
      { label: "Yashil archazor va chinorlar", url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80" },
      { label: "Gullagan mevali bog'", url: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&auto=format&fit=crop&q=80" },
      { label: "Qalin yashil xiyobon", url: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&auto=format&fit=crop&q=80" }
    ]
  },
  cleanup: {
    before: [
      { label: "Chiqindilar to'plangan joy", url: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=800&auto=format&fit=crop&q=80" },
      { label: "Ifloslangan anhor sohili", url: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&auto=format&fit=crop&q=80" },
      { label: "Qarovsiz ko'cha", url: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=80" }
    ],
    after: [
      { label: "Toza va yorug' sayrgoh", url: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800&auto=format&fit=crop&q=80" },
      { label: "Ozoda suv bo'yi", url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80" },
      { label: "Yashil va tartibli mahalla", url: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&auto=format&fit=crop&q=80" }
    ]
  }
};
