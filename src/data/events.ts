export interface EventData {
  slug: string;
  name: string;
  fullName: string;
  description: string;
  heroTitle: string;
  heroSubtitle: string;
  guestRange: {
    min: number;
    max: number;
  };
  priceRange: {
    starter: number;
    premium: number;
  };
  popularLocations: string[];
  trendingElements: string[];
  serviceTypes: {
    title: string;
    description: string;
    icon: string;
  }[];
  whyChooseUs: string[];
  menuHighlights: {
    category: string;
    description: string;
    price: number;
  }[];
  testimonials: {
    name: string;
    rating: number;
    review: string;
    location?: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  keyFeatures: string[];
  seasonalTrends: string[];
  packageIncludes: string[];
}

export const eventsData: EventData[] = [
  {
    slug: 'baby-shower',
    name: 'Baby Shower',
    fullName: 'Baby Shower Catering in Pune',
    description: 'At Pune Caterers, we bring warmth and delight to baby showers with catering that celebrates new beginnings through gentle flavors and creative touches. From naming ceremonies in Kondhwa to expectant gatherings in Baner, our menus incorporate 2025 trends like health-focused, organic options and interactive sweet stations.',
    heroTitle: 'Joyful Baby Shower Catering',
    heroSubtitle: 'Celebrating new beginnings with wholesome flavors and nurturing experiences across Pune',
    guestRange: {
      min: 30,
      max: 150
    },
    priceRange: {
      starter: 450,
      premium: 800
    },
    popularLocations: [
      'Chinchwad', 'Wakad', 'Hinjewadi', 'Kharadi', 'Viman Nagar', 
      'Wagholi', 'Kothrud', 'Koregaon Park', 'Aundh', 'Hadapsar', 'Kondhwa', 'Baner'
    ],
    trendingElements: [
      'health-focused organic options',
      'interactive sweet stations', 
      'gender-reveal themes',
      'wellness superfood menus',
      'allergy-safe alternatives',
      'vegan and keto choices',
      'herbal tea stations',
      'edible favors'
    ],
    serviceTypes: [
      {
        title: 'Naming Ceremony Feasts',
        description: 'Honor the little one\'s arrival with soft, nutritious bites like fruit platters or mild curries. Suited for traditional rituals in cultural hubs like Kondhwa or Kothrud, we cater to 50+ guests with gentle care.',
        icon: 'heart'
      },
      {
        title: 'Expectant Parent Gatherings',
        description: 'Support moms-to-be with wellness menus featuring superfood salads, herbal teas, and fusion smoothies—aligning with sustainable trends. Ideal for cozy celebrations in residential areas like Baner or Wagholi.',
        icon: 'coffee'
      },
      {
        title: 'Themed Baby Shower Parties',
        description: 'Add fun with gender-reveal themes, including cupcake stations or edible favors—a popular 2025 element. Tailored for playful events in modern spots like Koregaon Park or Viman Nagar, with kid-friendly tweaks.',
        icon: 'sparkles'
      }
    ],
    whyChooseUs: [
      'Baby Shower Specialists in Pune: Premier baby shower caterers in Pune, we\'ve nurtured many family milestones with wholesome, joyful menus.',
      'Thoughtful Customization: Adapt dishes—veg, mild spices, or dietary-specific—to suit expectant needs and themes.',
      '2025 Wellness Trends: Integrate organic sourcing and interactive, nutrient-rich elements for caring celebrations.',
      'Gentle Service: Easy setup in family-friendly areas like Chinchwad and Kharadi, with considerate execution.',
      'Affordable Warmth: Packages starting at ₹450 per plate, providing nurturing value.',
      'Hygiene Focus: Extra-safe protocols for vulnerable guests and post-pandemic peace.',
      'Family-Centric: We emphasize comfort and happiness, making your shower heartwarming.'
    ],
    menuHighlights: [
      { category: 'Light Appetizers', description: 'Fresh fruit skewers and yogurt dips', price: 200 },
      { category: 'Main Course (Veg)', description: 'Mild veggie stir-fries or dal khichdi', price: 450 },
      { category: 'Non-Veg Gentle Options', description: 'Soft chicken soups or fish patties', price: 500 },
      { category: 'Fusion Wellness', description: 'Quinoa salads or herbal infusions', price: 400 },
      { category: 'Sweet Treats', description: 'Themed cupcakes and nut-free halwa', price: 250 },
      { category: 'Interactive Add-Ons', description: 'Smoothie bars or cookie decorating (add-on)', price: 100 },
      { category: 'Dietary Nurtures', description: 'Vegan smoothies or gluten-free bites', price: 0 },
      { category: 'Full Package (50+ Guests)', description: 'Complete baby shower spread with setup', price: 25000 }
    ],
    testimonials: [
      { name: 'Meera & Raj', rating: 5, review: 'Pune Caterers made our naming ceremony in Kondhwa so special—wholesome and joyful!', location: 'Kondhwa' },
      { name: 'Ananya S.', rating: 5, review: 'Best baby shower caterers in Pune. Organic options delighted in Wakad!', location: 'Wakad' },
      { name: 'Priya K.', rating: 4.9, review: 'Themed treats were adorable for our gathering in Kothrud. Perfect!', location: 'Kothrud' },
      { name: 'Sonia M.', rating: 5, review: 'Vegan menu was nurturing for our event in Kharadi. Highly recommend!', location: 'Kharadi' },
      { name: 'Neha P.', rating: 5, review: 'Seamless and caring service in Viman Nagar. Families loved it!', location: 'Viman Nagar' },
      { name: 'Vikram T.', rating: 5, review: 'Wellness stations shone in Hinjewadi. Thank you for the warmth!', location: 'Hinjewadi' }
    ],
    faqs: [
      {
        question: 'What is the cost of baby shower catering in Pune?',
        answer: 'Packages begin at ₹450 per plate; a 50-guest event in Chinchwad could range ₹25,000-₹50,000 with themes.'
      },
      {
        question: 'How do I book baby shower caterers in Pune?',
        answer: 'Submit our form for a warm consult. We cover Wakad, Kothrud, and Kondhwa with care.'
      },
      {
        question: 'Do you offer health-focused or themed menus for baby showers?',
        answer: 'Yes! Organic wellness and gender-reveal themes, matching 2025 Pune trends.'
      },
      {
        question: 'Can you cater small baby showers in Pune suburbs?',
        answer: 'Yes, for 30-150 guests in Wagholi or Baner, with light buffet styles.'
      },
      {
        question: 'What trends are popular in baby shower catering in Pune for 2025?',
        answer: 'Interactive sweet stations, sustainable organics, and nurturing fusions, big in Viman Nagar or Hadapsar.'
      },
      {
        question: 'Do you provide catering for naming ceremonies?',
        answer: 'Absolutely, gentle packages for all rituals, ensuring joy in Aundh or Kharadi.'
      },
      {
        question: 'How far in advance to book baby shower catering in Pune?',
        answer: '1-3 months recommended, but flexible for spots like Hinjewadi.'
      },
      {
        question: 'Are there hidden fees in your baby shower packages?',
        answer: 'No—fully transparent for expectant ease.'
      }
    ],
    keyFeatures: [
      'wholesome and joyful celebrations',
      'health-focused organic menus',
      'interactive sweet stations',
      'themed decorations and setups',
      'dietary customization',
      'family-friendly service'
    ],
    seasonalTrends: [
      'organic wellness menus',
      'gender-reveal interactive elements',
      'sustainable ingredient sourcing',
      'allergy-conscious preparations',
      'herbal and superfood integrations'
    ],
    packageIncludes: [
      'complete menu planning',
      'themed decorations',
      'interactive food stations',
      'dietary customizations',
      'professional service staff',
      'cleanup services',
      'photography-friendly setups'
    ]
  },
  {
    slug: 'birthday-party',
    name: 'Birthday Party',
    fullName: 'Birthday Party Catering in Pune',
    description: 'At Pune Caterers, we turn birthdays into joyful feasts with creative catering that delights guests of all ages. From kids\' themed parties in Wakad to adult milestone bashes in Koregaon Park, our menus feature playful fusion dishes, interactive stations, and sustainable ingredients trending in 2025. With expertise in birthday party catering in Pune, we offer everything from finger foods to full buffets, incorporating eco-friendly practices like farm-to-table sourcing and vegan options.',
    heroTitle: 'Fun, Customized, and Memorable Celebrations',
    heroSubtitle: 'Creating joyful birthday experiences with creative catering across Pune for all ages',
    guestRange: {
      min: 20,
      max: 200
    },
    priceRange: {
      starter: 400,
      premium: 750
    },
    popularLocations: [
      'Chinchwad', 'Wakad', 'Hinjewadi', 'Kharadi', 'Viman Nagar', 
      'Wagholi', 'Kothrud', 'Koregaon Park', 'Aundh', 'Hadapsar', 'Kondhwa', 'Baner'
    ],
    trendingElements: [
      'interactive food stations',
      'themed decorations and setups',
      'farm-to-table sustainability',
      'DIY dessert stations',
      'edible favors',
      'vegan and gluten-free options',
      'craft cocktails for adults',
      'live cooking counters'
    ],
    serviceTypes: [
      {
        title: 'Kids\' Birthday Parties',
        description: 'Spark excitement with kid-friendly options like live pizza counters, candy bars, and gluten-free treats. Ideal for playful events in family hubs like Kothrud or suburban spots in Wagholi, we handle setups for energetic groups of 50+ kids.',
        icon: 'star'
      },
      {
        title: 'Adult Milestone Celebrations',
        description: 'Elevate grown-up birthdays with sophisticated fusion menus, such as Indo-Mexican tacos or craft cocktails. Embrace sustainable trends with organic ingredients, perfect for intimate gatherings in upscale areas like Koregaon Park or Baner.',
        icon: 'wine'
      },
      {
        title: 'Themed Birthday Bashes',
        description: 'Customize for themes like superhero or retro—featuring edible favors and DIY dessert stations, a hot 2025 trend. Tailored for lively parties in IT zones like Hinjewadi or Viman Nagar, with options for dietary tweaks.',
        icon: 'palette'
      }
    ],
    whyChooseUs: [
      'Pune Birthday Experts: As leading caterers for birthday party in Pune, we\'ve delighted hundreds with trendy, fun menus blending local and global flavors.',
      'Full Customization: Personalize everything—from Jain veg to non-veg—to fit your theme, age group, and budget.',
      '2025 Trend-Forward: Incorporate farm-to-table sustainability and interactive stations for memorable, Instagram-worthy events.',
      'Reliable Team: Seamless setup and service in busy areas like Chinchwad and Kharadi, with stress-free cleanup.',
      'Budget-Friendly Fun: Packages start at ₹400 per plate, offering value without skimping on quality.',
      'Safety First: Strict hygiene for kids\' parties, post-pandemic protocols for all sizes.',
      'Joyful Focus: We prioritize smiles, making your birthday the talk of Pune.'
    ],
    menuHighlights: [
      { category: 'Snack Platter', description: 'Finger foods like mini burgers and veggie sticks', price: 200 },
      { category: 'Main Course (Veg)', description: 'Pasta bar or pav bhaji with twists', price: 400 },
      { category: 'Non-Veg Options', description: 'Chicken nuggets or grilled skewers', price: 500 },
      { category: 'Fusion Treats', description: 'Sushi rolls or desi nachos', price: 450 },
      { category: 'Cake & Desserts', description: 'Custom cakes, cupcakes, and ice cream stations', price: 300 },
      { category: 'Interactive Add-Ons', description: 'Live chaat or popcorn counters (add-on)', price: 150 },
      { category: 'Dietary Specials', description: 'Vegan cupcakes or gluten-free snacks', price: 0 },
      { category: 'Full Package (50+ Guests)', description: 'Complete birthday spread with setup', price: 20000 }
    ],
    testimonials: [
      { name: 'Neha R.', rating: 5, review: 'Pune Caterers nailed our kid\'s birthday in Kothrud—interactive stations were a hit!', location: 'Kothrud' },
      { name: 'Amit P.', rating: 5, review: 'Best caterers for birthday party in Pune. Sustainable and fun in Wakad!', location: 'Wakad' },
      { name: 'Sara K.', rating: 4.9, review: 'Themed fusion menu for my 30th in Koregaon Park was perfect. Affordable too!', location: 'Koregaon Park' },
      { name: 'Raj S.', rating: 5, review: 'Vegan options shone at our family bash in Kharadi. Highly recommend!', location: 'Kharadi' },
      { name: 'Priya M.', rating: 5, review: 'Seamless service for a surprise party in Viman Nagar. Kids loved it!', location: 'Viman Nagar' },
      { name: 'Vikram T.', rating: 5, review: 'Trendy desserts stole the show in Hinjewadi. Thank you!', location: 'Hinjewadi' }
    ],
    faqs: [
      {
        question: 'What is the cost of birthday party catering in Pune?',
        answer: 'Packages start at ₹400 per plate, depending on guests, menu, and location. A 50-guest event in Chinchwad could cost ₹20,000-₹40,000 with customizations.'
      },
      {
        question: 'How do I find the best caterers for birthday party in Pune?',
        answer: 'Fill out our form for a free chat. We cover areas like Wakad, Kothrud, and Kondhwa with tailored plans.'
      },
      {
        question: 'Do you offer themed or dietary-specific menus for birthdays?',
        answer: 'Yes! From superhero themes to vegan/gluten-free, aligning with 2025 Pune trends like fusion and sustainability.'
      },
      {
        question: 'Can you cater small birthday parties in Pune suburbs?',
        answer: 'Definitely— we\'ve handled 20-50 guest events in Wagholi and Baner with buffet or plated styles.'
      },
      {
        question: 'What are popular trends in birthday catering in Pune for 2025?',
        answer: 'Interactive stations, farm-to-table ingredients, and edible favors are big, especially in Viman Nagar or Hadapsar.'
      },
      {
        question: 'Do you provide add-ons like cake stations for birthdays?',
        answer: 'Absolutely, including live dessert bars for cohesive fun in Aundh or Kharadi.'
      },
      {
        question: 'How far in advance to book birthday party catering in Pune?',
        answer: '1-3 months ideal, but we manage short-notice in high-demand spots like Hinjewadi.'
      },
      {
        question: 'Any hidden fees in your birthday catering packages?',
        answer: 'None—transparent from setup to cleanup for peace of mind.'
      }
    ],
    keyFeatures: [
      'fun and customized celebrations',
      'interactive food stations',
      'themed decorations and setups',
      'age-appropriate menus',
      'dietary customization options',
      'professional entertainment coordination'
    ],
    seasonalTrends: [
      'farm-to-table sustainability',
      'interactive DIY stations',
      'themed fusion cuisines',
      'Instagram-worthy presentations',
      'eco-friendly packaging and setup'
    ],
    packageIncludes: [
      'complete menu planning',
      'themed decorations',
      'interactive food stations',
      'custom cake arrangements',
      'entertainment coordination',
      'professional service staff',
      'cleanup services',
      'photography support'
    ]
  },
  {
    slug: 'buffet-style',
    name: 'Buffet-Style',
    fullName: 'Buffet-Style Catering in Pune',
    description: 'At Pune Caterers, our buffet-style catering offers a feast of choices that lets guests savor at their own pace, perfect for vibrant events across Pune. From wedding receptions in Chinchwad to corporate buffets in Hinjewadi, we curate expansive spreads with fresh, sustainable ingredients and interactive stations trending in 2025. As leading buffet caterers in Pune, we handle setups for 50-500+ guests, emphasizing variety, efficiency, and customization.',
    heroTitle: 'Versatile, Abundant, and Guest-Friendly Service',
    heroSubtitle: 'Creating expansive buffet experiences with variety and efficiency across Pune for all occasions',
    guestRange: {
      min: 50,
      max: 500
    },
    priceRange: {
      starter: 500,
      premium: 850
    },
    popularLocations: [
      'Chinchwad', 'Wakad', 'Hinjewadi', 'Kharadi', 'Viman Nagar', 
      'Wagholi', 'Kothrud', 'Koregaon Park', 'Aundh', 'Hadapsar', 'Kondhwa', 'Baner'
    ],
    trendingElements: [
      'self-serve sustainability',
      'interactive live stations',
      'global-local fusion variety',
      'dietary-labeled sections',
      'farm-to-table ingredients',
      'vegan and keto islands',
      'efficient flow management',
      'eco-friendly serving stations'
    ],
    serviceTypes: [
      {
        title: 'Wedding & Engagement Buffets',
        description: 'Offer guests a lavish array of starters, mains, and desserts with live carving stations. Ideal for grand receptions in upscale spots like Koregaon Park or family events in Kothrud, accommodating large crowds effortlessly.',
        icon: 'heart'
      },
      {
        title: 'Corporate & Private Party Buffets',
        description: 'Facilitate networking with efficient, health-focused lines featuring salads, grilled options, and eco-plates. Perfect for professional gatherings in IT hubs like Hinjewadi or intimate parties in Baner.',
        icon: 'briefcase'
      },
      {
        title: 'Festival & Housewarming Buffets',
        description: 'Celebrate with themed counters like pooja prasad or homey thalis, incorporating seasonal, farm-to-table elements. Tailored for communal vibes in cultural areas like Kondhwa or suburban Wagholi.',
        icon: 'home'
      }
    ],
    whyChooseUs: [
      'Buffet Specialists in Pune: Top buffet caterers in Pune, we\'ve mastered abundant setups for hundreds of events with variety and flow.',
      'Endless Customization: Design your spread—veg, non-veg, or mixed—to fit event themes, guest counts, and preferences.',
      '2025 Buffet Trends: Embrace sustainable self-serve and interactive stations for efficient, engaging dining.',
      'Efficient Operations: Quick setup and management in high-traffic areas like Chinchwad and Kharadi, minimizing queues.',
      'Cost-Effective Abundance: Packages from ₹500 per plate, maximizing options without excess waste.',
      'Hygiene Excellence: Sanitized stations and protocols for safe, communal feasting.',
      'Guest-Centric: We prioritize choice and satisfaction, making buffets a highlight.'
    ],
    menuHighlights: [
      { category: 'Starter Buffet', description: 'Assorted salads, chaats, and finger foods', price: 200 },
      { category: 'Main Course (Veg)', description: 'Multiple curries, rice, and breads', price: 500 },
      { category: 'Non-Veg Section', description: 'Grilled meats, seafood, and biryanis', price: 600 },
      { category: 'Fusion Variety', description: 'Global-Indian mixes like pasta bhaji', price: 550 },
      { category: 'Dessert Spread', description: 'Assorted sweets, fruits, and ice creams', price: 250 },
      { category: 'Live Stations', description: 'Carving or pasta bars (add-on)', price: 150 },
      { category: 'Dietary Islands', description: 'Vegan curries or gluten-free options', price: 0 },
      { category: 'Full Package (200+ Guests)', description: 'Comprehensive buffet with setup', price: 100000 }
    ],
    testimonials: [
      { name: 'Sneha & Rohit', rating: 5, review: 'Pune Caterers\' buffet was a hit at our wedding in Chinchwad—abundant and varied!', location: 'Chinchwad' },
      { name: 'Corporate Team', rating: 5, review: 'Best buffet caterers in Pune. Sustainable stations impressed in Hinjewadi!', location: 'Hinjewadi' },
      { name: 'Priya K.', rating: 4.9, review: 'Interactive spreads made our party in Koregaon Park flawless. Guests loved the choice!', location: 'Koregaon Park' },
      { name: 'Family Group', rating: 5, review: 'Vegan section was perfect for our festival in Kondhwa. Efficient!', location: 'Kondhwa' },
      { name: 'Raj P.', rating: 5, review: 'Seamless abundance for our housewarming in Viman Nagar. Highly recommended!', location: 'Viman Nagar' },
      { name: 'Vikram T.', rating: 5, review: 'Varied options shone at our corporate in Kharadi. Thank you!', location: 'Kharadi' }
    ],
    faqs: [
      {
        question: 'What is the cost of buffet-style catering in Pune?',
        answer: 'Packages start at ₹500 per plate; a 200-guest event in Wakad could range ₹1,00,000-₹2,00,000 with stations.'
      },
      {
        question: 'How do I book buffet caterers in Pune?',
        answer: 'Fill our form for an efficient consult. We cover Kothrud, Kondhwa, and more with variety.'
      },
      {
        question: 'Do you offer fusion or dietary options in buffets?',
        answer: 'Yes! Global fusions and labeled vegan/gluten-free, per 2025 Pune trends.'
      },
      {
        question: 'Can you setup buffets for large events in Pune suburbs?',
        answer: 'Yes, for 50-500+ guests in Wagholi or Baner, with flow-optimized lines.'
      },
      {
        question: 'What trends are popular in buffet catering in Pune for 2025?',
        answer: 'Interactive, sustainable stations and variety, big in Viman Nagar or Hadapsar.'
      },
      {
        question: 'Is buffet suitable for weddings or corporates?',
        answer: 'Absolutely, versatile for all, ensuring guest satisfaction in Aundh or Kharadi.'
      },
      {
        question: 'How far in advance to book buffet-style catering in Pune?',
        answer: '1-3 months, but flexible for high-demand like Hinjewadi.'
      },
      {
        question: 'Are there hidden fees in your buffet packages?',
        answer: 'No—transparent abundance from start to finish.'
      }
    ],
    keyFeatures: [
      'versatile and abundant spreads',
      'interactive live stations',
      'efficient guest flow management',
      'variety-focused menus',
      'dietary customization options',
      'professional buffet coordination'
    ],
    seasonalTrends: [
      'sustainable self-serve systems',
      'interactive live cooking stations',
      'global-local fusion variety',
      'eco-friendly serving solutions',
      'flow-optimized buffet layouts'
    ],
    packageIncludes: [
      'complete buffet setup',
      'interactive live stations',
      'dietary customization sections',
      'professional service staff',
      'efficient flow management',
      'hygiene protocols',
      'cleanup services',
      'equipment and serving stations'
    ]
  },
  {
    slug: 'corporate',
    name: 'Corporate',
    fullName: 'Corporate Catering in Pune',
    description: 'At Pune Caterers, we elevate corporate events with seamless catering that combines professionalism, innovation, and Pune\'s vibrant culinary scene. From team lunches in Hinjewadi to product launches in Kharadi, our menus feature health-conscious options, fusion dishes, and sustainable sourcing trending in 2025. As expert corporate caterers in Pune, we provide boxed meals, buffets, or full-service setups, ensuring productivity and satisfaction.',
    heroTitle: 'Professional, Efficient, and Flavorful Events',
    heroSubtitle: 'Elevating corporate gatherings with seamless catering and innovative cuisine across Pune',
    guestRange: {
      min: 50,
      max: 1000
    },
    priceRange: {
      starter: 500,
      premium: 900
    },
    popularLocations: [
      'Chinchwad', 'Wakad', 'Hinjewadi', 'Kharadi', 'Viman Nagar', 
      'Wagholi', 'Kothrud', 'Koregaon Park', 'Aundh', 'Hadapsar', 'Kondhwa', 'Baner'
    ],
    trendingElements: [
      'health-conscious wellness meals',
      'sustainable farm-to-table sourcing',
      'interactive food stations',
      'branded packaging options',
      'vegan and gluten-free alternatives',
      'coffee and beverage bars',
      'boxed meal efficiency',
      'fusion global-local cuisine'
    ],
    serviceTypes: [
      {
        title: 'Team Lunches and Meetings',
        description: 'Fuel productive sessions with nutritious boxed lunches or hot buffets, including salads, wraps, and energy-boosting snacks. Ideal for IT hubs like Hinjewadi or Baner, we cater to diverse dietary needs for 20-100 participants.',
        icon: 'users'
      },
      {
        title: 'Conferences and Seminars',
        description: 'Impress attendees with multi-course spreads featuring global fusions like Asian-inspired salads or Indian tapas. Incorporate sustainable trends with organic, low-waste options, perfect for large venues in Kharadi or Viman Nagar.',
        icon: 'presentation'
      },
      {
        title: 'Product Launches and Annual Days',
        description: 'Create buzz with themed stations, live grilling, or cocktail pairings. Tailored for high-energy events in upscale spots like Koregaon Park or Wakad, with vegan/keto alternatives for inclusive appeal.',
        icon: 'rocket'
      }
    ],
    whyChooseUs: [
      'Corporate Specialists in Pune: As premier corporate caterers in Pune, we\'ve supported countless businesses with reliable, high-quality service blending efficiency and taste.',
      'Flexible Customization: Adapt menus to your brand—veg, non-veg, or dietary-specific—to suit timelines, themes, and preferences.',
      '2025 Trend Integration: Embrace wellness with farm-to-table ingredients and interactive setups for engaging, memorable corporate gatherings.',
      'Dependable Execution: On-time delivery and setup in demanding areas like Chinchwad and Kondhwa, with minimal disruption.',
      'Cost-Effective Solutions: Packages from ₹500 per plate, maximizing value for budgets large or small.',
      'Hygiene Excellence: Rigorous standards for safe, professional environments, especially in post-pandemic settings.',
      'Business-Focused: We prioritize your success, ensuring catering enhances networking and morale.'
    ],
    menuHighlights: [
      { category: 'Starter Platter', description: 'Fresh salads and finger sandwiches', price: 250 },
      { category: 'Main Course (Veg)', description: 'Stir-fried veggies, pasta, or dal-rice combos', price: 500 },
      { category: 'Non-Veg Selections', description: 'Grilled chicken salads or fish fillets', price: 600 },
      { category: 'Fusion Highlights', description: 'Sushi bowls or desi wraps', price: 550 },
      { category: 'Dessert Options', description: 'Fruit platters and mini pastries', price: 200 },
      { category: 'Beverage Stations', description: 'Coffee/tea bars or mocktails (add-on)', price: 100 },
      { category: 'Dietary Alternatives', description: 'Vegan salads or gluten-free mains', price: 0 },
      { category: 'Full Package (200+ Guests)', description: 'Comprehensive corporate meal with setup', price: 100000 }
    ],
    testimonials: [
      { name: 'TechCorp Team', rating: 5, review: 'Pune Caterers transformed our team lunch in Hinjewadi—healthy and on-time!', location: 'Hinjewadi' },
      { name: 'Innovate Ltd.', rating: 5, review: 'Best corporate caterers in Pune. Sustainable menus impressed in Kharadi.', location: 'Kharadi' },
      { name: 'StartupX', rating: 4.9, review: 'Flawless service for our launch in Koregaon Park. Fusion hits!', location: 'Koregaon Park' },
      { name: 'Global Inc.', rating: 5, review: 'Vegan options were spot-on for our seminar in Wakad. Reliable!', location: 'Wakad' },
      { name: 'Finance Group', rating: 5, review: 'Efficient buffets for meetings in Viman Nagar. Highly professional!', location: 'Viman Nagar' },
      { name: 'HR Pros', rating: 5, review: 'Interactive stations boosted morale in Baner. Thank you!', location: 'Baner' }
    ],
    faqs: [
      {
        question: 'What is the cost of corporate catering in Pune?',
        answer: 'Packages begin at ₹500 per plate, varying by scale and menu. A 200-guest conference in Chinchwad might range ₹1,00,000-₹2,00,000.'
      },
      {
        question: 'How do I book corporate caterers in Pune?',
        answer: 'Submit our form for a quick consult. We serve areas like Wakad, Kothrud, and Kondhwa with flexible scheduling.'
      },
      {
        question: 'Do you offer health-focused or fusion menus for corporate events?',
        answer: 'Yes! Wellness options like vegan/gluten-free and fusions align with 2025 trends in Pune.'
      },
      {
        question: 'Can you handle large corporate events in Pune IT hubs?',
        answer: 'Yes, up to 1000 guests in areas like Hinjewadi and Baner, with buffet or plated efficiency.'
      },
      {
        question: 'What trends are shaping corporate catering in Pune for 2025?',
        answer: 'Wellness meals, sustainable sourcing, and interactive stations, popular in Viman Nagar or Hadapsar.'
      },
      {
        question: 'Do you provide branded add-ons for corporate catering?',
        answer: 'Absolutely, including custom packaging for cohesive branding in Aundh or Kharadi.'
      },
      {
        question: 'How far in advance to book corporate catering services in Pune?',
        answer: '2-4 weeks recommended, but we handle urgent needs in spots like Koregaon Park.'
      },
      {
        question: 'Are there hidden fees in your corporate packages?',
        answer: 'No—fully transparent, covering all logistics for trust.'
      }
    ],
    keyFeatures: [
      'professional and efficient service',
      'health-conscious wellness menus',
      'sustainable sourcing practices',
      'flexible scheduling and delivery',
      'branded packaging options',
      'business networking enhancement'
    ],
    seasonalTrends: [
      'wellness-focused meal planning',
      'sustainable farm-to-table ingredients',
      'interactive beverage stations',
      'branded corporate presentations',
      'hybrid meeting catering solutions'
    ],
    packageIncludes: [
      'complete menu planning',
      'professional service staff',
      'flexible delivery options',
      'branded packaging available',
      'dietary customizations',
      'setup and cleanup services',
      'networking-friendly layouts',
      'corporate presentation support'
    ]
  },
  {
    slug: 'engagement',
    name: 'Engagement',
    fullName: 'Engagement Catering in Pune',
    description: 'At Pune Caterers, we craft enchanting engagement experiences with catering that captures romance and tradition in every bite. From ring ceremonies in Koregaon Park to family betrothals in Kothrud, our menus highlight fusion elegance, sustainable sourcing, and interactive elements trending in 2025. As leading engagement caterers in Pune, we deliver intimate buffets or plated services for 50-300 guests, blending Maharashtrian charm with modern twists.',
    heroTitle: 'Romantic, Elegant, and Custom-Crafted Celebrations',
    heroSubtitle: 'Creating enchanting engagement experiences with romance and tradition in every detail',
    guestRange: {
      min: 50,
      max: 300
    },
    priceRange: {
      starter: 600,
      premium: 950
    },
    popularLocations: [
      'Chinchwad', 'Wakad', 'Hinjewadi', 'Kharadi', 'Viman Nagar', 
      'Wagholi', 'Kothrud', 'Koregaon Park', 'Aundh', 'Hadapsar', 'Kondhwa', 'Baner'
    ],
    trendingElements: [
      'fusion elegance combinations',
      'sustainable ingredient sourcing',
      'interactive romantic stations',
      'floral-infused presentations',
      'themed decor integration',
      'couple customization options',
      'dietary inclusivity choices',
      'eco-friendly romantic touches'
    ],
    serviceTypes: [
      {
        title: 'Ring Ceremony Feasts',
        description: 'Celebrate the exchange with delicate appetizers like floral-infused chaats or live sushi counters. Ideal for elegant affairs in upscale locales like Koregaon Park or family settings in Kothrud, catering to 100+ guests.',
        icon: 'heart'
      },
      {
        title: 'Family Betrothal Gatherings',
        description: 'Honor traditions with multi-course meals featuring regional thalis or international fusions, using farm-to-table ingredients. Perfect for heartfelt events in growing suburbs like Baner or Wagholi.',
        icon: 'users'
      },
      {
        title: 'Themed Engagement Parties',
        description: 'Add sparkle with custom themes, such as Bollywood-inspired stations or dessert bars—a 2025 favorite. Tailored for vibrant celebrations in IT areas like Hinjewadi or Viman Nagar, with dietary inclusivity.',
        icon: 'sparkles'
      }
    ],
    whyChooseUs: [
      'Engagement Experts in Pune: Top engagement caterers in Pune, we\'ve curated numerous romantic events with authentic and innovative flavors.',
      'Bespoke Customization: Personalize menus—Jain, veg, or non-veg—to reflect your story, theme, and preferences.',
      '2025 Trend Alignment: Incorporate sustainability and interactive touches for romantic, memorable occasions.',
      'Flawless Delivery: Professional setup in key spots like Chinchwad and Kharadi, with graceful execution.',
      'Elegant Affordability: Packages from ₹600 per plate, balancing luxury and value.',
      'Safety Assurance: High hygiene standards for intimate, worry-free celebrations.',
      'Romantic Focus: We infuse love into every detail, making your engagement unforgettable.'
    ],
    menuHighlights: [
      { category: 'Appetizer Selection', description: 'Delicate canapés and floral chaats', price: 250 },
      { category: 'Main Course (Veg)', description: 'Elegant thali with paneer specialties and rice', price: 600 },
      { category: 'Non-Veg Delights', description: 'Lamb kebabs or seafood fusions', price: 700 },
      { category: 'Fusion Creations', description: 'Indo-Italian risottos or spiced salads', price: 650 },
      { category: 'Dessert Symphony', description: 'Heart-shaped sweets and chocolate fountains', price: 300 },
      { category: 'Live Stations', description: 'Custom cocktail or pasta bars (add-on)', price: 150 },
      { category: 'Dietary Elegance', description: 'Vegan risottos or gluten-free treats', price: 0 },
      { category: 'Full Package (100+ Guests)', description: 'Complete engagement feast with setup', price: 60000 }
    ],
    testimonials: [
      { name: 'Neha & Arjun', rating: 5, review: 'Pune Caterers made our ring ceremony in Koregaon Park magical—elegant and romantic!', location: 'Koregaon Park' },
      { name: 'Priya S.', rating: 5, review: 'Best engagement caterers in Pune. Sustainable fusions wowed in Wakad!', location: 'Wakad' },
      { name: 'Rohan K.', rating: 4.9, review: 'Themed stations were perfect for our betrothal in Kothrud. Flawless!', location: 'Kothrud' },
      { name: 'Anjali M.', rating: 5, review: 'Vegan options elevated our family event in Kharadi. Highly romantic!', location: 'Kharadi' },
      { name: 'Vikram P.', rating: 5, review: 'Seamless service for our intimate party in Viman Nagar. Guests loved it!', location: 'Viman Nagar' },
      { name: 'Sneha T.', rating: 5, review: 'Interactive delights shone in Hinjewadi. Thank you for the magic!', location: 'Hinjewadi' }
    ],
    faqs: [
      {
        question: 'What is the cost of engagement catering in Pune?',
        answer: 'Packages start at ₹600 per plate; a 100-guest ceremony in Chinchwad may range ₹60,000-₹1,20,000 with customizations.'
      },
      {
        question: 'How do I book engagement caterers in Pune?',
        answer: 'Fill our form for a complimentary consult. We serve Wakad, Kothrud, and Kondhwa with ease.'
      },
      {
        question: 'Do you offer fusion or dietary-specific menus for engagements?',
        answer: 'Yes! Fusion elegance and vegan/gluten-free options, in line with 2025 Pune trends.'
      },
      {
        question: 'Can you handle medium-sized engagements in Pune suburbs?',
        answer: 'Absolutely, for 50-300 guests in Wagholi or Baner, with buffet or plated romance.'
      },
      {
        question: 'What trends are popular in engagement catering in Pune for 2025?',
        answer: 'Themed stations, sustainable ingredients, and floral infusions, especially in Viman Nagar or Hadapsar.'
      },
      {
        question: 'Do you provide catering for ring ceremonies or betrothals?',
        answer: 'Yes, full packages for all engagement rituals, ensuring harmony in Aundh or Kharadi.'
      },
      {
        question: 'How far in advance should I book engagement catering in Pune?',
        answer: '2-4 months ideal, but we accommodate shorter notices in high-demand areas like Hinjewadi.'
      },
      {
        question: 'Are there any hidden fees in your engagement packages?',
        answer: 'No—transparent costs for complete peace and joy.'
      }
    ],
    keyFeatures: [
      'romantic and elegant celebrations',
      'fusion cuisine combinations',
      'sustainable ingredient sourcing',
      'themed decor integration',
      'interactive romantic stations',
      'couple story customization'
    ],
    seasonalTrends: [
      'fusion elegance presentations',
      'sustainable romantic sourcing',
      'floral-infused menu elements',
      'themed interactive stations',
      'eco-friendly celebration touches'
    ],
    packageIncludes: [
      'complete romantic menu planning',
      'themed decoration coordination',
      'interactive culinary stations',
      'couple customization options',
      'professional romantic presentation',
      'dietary inclusivity options',
      'setup and cleanup services',
      'photography-friendly arrangements'
    ]
  },
  {
    slug: 'festival-religious',
    name: 'Festival & Religious',
    fullName: 'Festival & Religious Catering in Pune',
    description: 'At Pune Caterers, we honor festivals and religious occasions with catering that reveres customs while embracing modern touches. From Diwali parties in Kondhwa to Ganesh Chaturthi poojas in Kothrud, our menus showcase seasonal specialties, sustainable sourcing, and interactive traditional stations trending in 2025. As dedicated festival and religious caterers in Pune, we offer prasad-style buffets or full spreads for 50-500 guests, fostering devotion and community.',
    heroTitle: 'Traditional, Spiritual, and Festive Delights',
    heroSubtitle: 'Honoring sacred traditions with authentic flavors and modern touches across Pune',
    guestRange: {
      min: 50,
      max: 500
    },
    priceRange: {
      starter: 400,
      premium: 750
    },
    popularLocations: [
      'Chinchwad', 'Wakad', 'Hinjewadi', 'Kharadi', 'Viman Nagar', 
      'Wagholi', 'Kothrud', 'Koregaon Park', 'Aundh', 'Hadapsar', 'Kondhwa', 'Baner'
    ],
    trendingElements: [
      'seasonal specialty showcases',
      'sustainable sacred sourcing',
      'interactive traditional stations',
      'prasad-style presentations',
      'eco-conscious ritual preparations',
      'regional authenticity focus',
      'satvik and vrat-friendly options',
      'community devotion enhancement'
    ],
    serviceTypes: [
      {
        title: 'Diwali & Holi Celebrations',
        description: 'Illuminate festivities with sweet-savory spreads like modak counters or colorful chaats. Ideal for vibrant parties in community areas like Kondhwa or Wakad, we cater to 100+ guests with festive energy.',
        icon: 'sparkles'
      },
      {
        title: 'Ganesh Chaturthi & Navratri Poojas',
        description: 'Serve blessed prasad and fasting-friendly menus with organic fruits, sabudana khichdi, or fusion vrat dishes. Perfect for devotional events in traditional neighborhoods like Kothrud or Chinchwad.',
        icon: 'heart'
      },
      {
        title: 'Religious Milestones & Ceremonies',
        description: 'Support rituals with pure, satvik options or themed bhog platters—a 2025 sustainable favorite. Tailored for serene occasions in upscale spots like Koregaon Park or suburban Hadapsar.',
        icon: 'star'
      }
    ],
    whyChooseUs: [
      'Festival & Religious Experts in Pune: Premier festival caterers in Pune, we\'ve enriched numerous sacred events with respectful, flavorful authenticity.',
      'Cultural Customization: Tailor menus—satvik, veg, or ritual-specific—to honor your traditions and preferences.',
      '2025 Sacred Trends: Feature sustainable ingredients and interactive stations for spiritually uplifting experiences.',
      'Devoted Service: Timely, respectful setup in holy areas like Wagholi and Kharadi, with sanctity in mind.',
      'Affordable Devotion: Packages from ₹400 per plate, balancing piety and value.',
      'Purity Standards: Strict hygiene and purity protocols for blessed, safe offerings.',
      'Spiritual Focus: We infuse reverence, making your event a divine communion.'
    ],
    menuHighlights: [
      { category: 'Pooja Appetizers', description: 'Prasad nuts, fruits, and sabudana vada', price: 150 },
      { category: 'Main Course (Satvik Veg)', description: 'Khichdi, aloo sabzi, and puri', price: 400 },
      { category: 'Non-Veg Ritual Options', description: '(If applicable) Mild fish curries or chicken', price: 500 },
      { category: 'Fusion Festive', description: 'Vrat-friendly quinoa or millet dishes', price: 350 },
      { category: 'Sweet Blessings', description: 'Modak, laddoo, or halwa varieties', price: 200 },
      { category: 'Live Stations', description: 'Prasad distribution or sweet counters (add-on)', price: 100 },
      { category: 'Dietary Purity', description: 'Jain khichdi or gluten-free prasad', price: 0 },
      { category: 'Full Package (200+ Guests)', description: 'Complete festival spread with setup', price: 80000 }
    ],
    testimonials: [
      { name: 'Priya & Family', rating: 5, review: 'Pune Caterers blessed our Diwali in Kondhwa—pure and festive!', location: 'Kondhwa' },
      { name: 'Raj S.', rating: 5, review: 'Best festival caterers in Pune. Sustainable prasad amazed in Wakad!', location: 'Wakad' },
      { name: 'Anita K.', rating: 4.9, review: 'Ganesh pooja menu was divine in Kothrud. Perfect reverence!', location: 'Kothrud' },
      { name: 'Meera M.', rating: 5, review: 'Jain options were spot-on for our Navratri in Kharadi. Highly spiritual!', location: 'Kharadi' },
      { name: 'Vikram P.', rating: 5, review: 'Seamless setup for our ceremony in Viman Nagar. Guests felt blessed!', location: 'Viman Nagar' },
      { name: 'Sonia T.', rating: 5, review: 'Interactive sweets stole the show in Hinjewadi. Thank you!', location: 'Hinjewadi' }
    ],
    faqs: [
      {
        question: 'What is the cost of festival catering in Pune?',
        answer: 'Packages start at ₹400 per plate; a 200-guest Diwali in Chinchwad could range ₹80,000-₹1,60,000 with stations.'
      },
      {
        question: 'How do I book religious caterers in Pune?',
        answer: 'Use our form for a respectful consult. We cover Wakad, Kothrud, and Kondhwa devotedly.'
      },
      {
        question: 'Do you offer satvik or fusion menus for festivals?',
        answer: 'Yes! Pure satvik and eco-fusions, following 2025 Pune trends.'
      },
      {
        question: 'Can you handle large religious events in Pune suburbs?',
        answer: 'Yes, for 50-500 guests in Wagholi or Baner, with prasad buffets.'
      },
      {
        question: 'What trends are popular in festival catering in Pune for 2025?',
        answer: 'Seasonal stations, sustainable sourcing, and ritual fusions, popular in Viman Nagar or Hadapsar.'
      },
      {
        question: 'Do you provide prasad for poojas and ceremonies?',
        answer: 'Absolutely, blessed packages for all rituals, ensuring sanctity in Aundh or Kharadi.'
      },
      {
        question: 'How far in advance to book festival catering in Pune?',
        answer: '1-3 months for peaks, but flexible in areas like Hinjewadi.'
      },
      {
        question: 'Are there hidden fees in your religious packages?',
        answer: 'No—pure transparency for divine trust.'
      }
    ],
    keyFeatures: [
      'traditional spiritual celebrations',
      'seasonal specialty showcases',
      'satvik and vrat-friendly menus',
      'prasad-style presentations',
      'cultural authenticity respect',
      'community devotion fostering'
    ],
    seasonalTrends: [
      'sustainable sacred ingredient sourcing',
      'interactive traditional station setups',
      'regional authentic flavor presentations',
      'eco-conscious ritual preparations',
      'seasonal festival menu specialties'
    ],
    packageIncludes: [
      'complete spiritual menu planning',
      'traditional decoration coordination',
      'prasad preparation and distribution',
      'cultural customization options',
      'ritual-appropriate service staff',
      'purity protocol maintenance',
      'setup and cleanup services',
      'blessing-friendly arrangements'
    ]
  },
  {
    slug: 'full-service',
    name: 'Full-Service',
    fullName: 'Full-Service Catering in Pune',
    description: 'At Pune Caterers, our full-service catering takes care of every detail, from menu planning to cleanup, allowing you to enjoy your event fully. Ideal for weddings in Chinchwad or corporates in Hinjewadi, we provide end-to-end solutions with personalized menus, professional staff, and sustainable practices trending in 2025. As top full-service caterers in Pune, we handle events for 50-1000+ guests with seamless execution.',
    heroTitle: 'Comprehensive, Hassle-Free, and Premium Experiences',
    heroSubtitle: 'Complete event management with end-to-end solutions and seamless execution across Pune',
    guestRange: {
      min: 50,
      max: 1000
    },
    priceRange: {
      starter: 600,
      premium: 1200
    },
    popularLocations: [
      'Chinchwad', 'Wakad', 'Hinjewadi', 'Kharadi', 'Viman Nagar', 
      'Wagholi', 'Kothrud', 'Koregaon Park', 'Aundh', 'Hadapsar', 'Kondhwa', 'Baner'
    ],
    trendingElements: [
      'end-to-end event management',
      'sustainable full-cycle service',
      'interactive premium elements',
      'bespoke eco-integrated setups',
      'professional staff coordination',
      'comprehensive venue adaptation',
      'all-inclusive luxury packaging',
      'stress-free total convenience'
    ],
    serviceTypes: [
      {
        title: 'Wedding & Engagement Full-Service',
        description: 'From decor-matched menus to attentive waitstaff, we orchestrate grand affairs with live stations and fusion elegance. Suited for elaborate ceremonies in upscale Koregaon Park or family-focused Kothrud, managing all logistics.',
        icon: 'heart'
      },
      {
        title: 'Corporate & Private Full-Service',
        description: 'Elevate meetings or dinners with on-site chefs, timed service, and sustainable disposables. Perfect for professional efficiency in IT zones like Hinjewadi or discreet privates in Baner, with customized flow.',
        icon: 'briefcase'
      },
      {
        title: 'Festival & Social Full-Service',
        description: 'Handle poojas or housewarmings with ritual-appropriate setups, staff in attire, and cleanup. Tailored for cultural depth in Kondhwa or communal joy in Wagholi, incorporating 2025 interactive sustainability.',
        icon: 'sparkles'
      }
    ],
    whyChooseUs: [
      'Full-Service Leaders in Pune: Premier full-service caterers in Pune, we\'ve managed complete events with expertise and reliability.',
      'Total Personalization: Customize every aspect—menus, staffing, setup—to match your vision and event scale.',
      '2025 Complete Trends: Integrate sustainable full-cycle service and interactive elements for hassle-free luxury.',
      'Professional Excellence: Trained teams ensure smooth operations in demanding areas like Chinchwad and Kharadi.',
      'All-Inclusive Value: Packages from ₹600 per plate, covering everything for true convenience.',
      'Immaculate Standards: Rigorous hygiene and detail-oriented execution for worry-free hosting.',
      'Host-Focused: We handle it all, letting you savor the moment without oversight.'
    ],
    menuHighlights: [
      { category: 'Appetizer Service', description: 'Passed hors d\'oeuvres and stations', price: 250 },
      { category: 'Main Course (Veg)', description: 'Plated or buffet curries, rice, breads', price: 600 },
      { category: 'Non-Veg Premiums', description: 'Served meats, seafood, specialties', price: 700 },
      { category: 'Fusion All-In', description: 'Global-Indian with chef presentations', price: 650 },
      { category: 'Dessert Finale', description: 'Tiered sweets, live flambe', price: 300 },
      { category: 'Beverage Management', description: 'Full bar or mocktail service (add-on)', price: 150 },
      { category: 'Dietary Complete', description: 'Vegan mains or gluten-free full meals', price: 0 },
      { category: 'Full Package (200+ Guests)', description: 'End-to-end catering with staff & cleanup', price: 120000 }
    ],
    testimonials: [
      { name: 'Meera & Raj', rating: 5, review: 'Pune Caterers handled our wedding full-service in Chinchwad—hassle-free perfection!', location: 'Chinchwad' },
      { name: 'Corporate Host', rating: 5, review: 'Best full-service caterers in Pune. Complete luxury in Hinjewadi!', location: 'Hinjewadi' },
      { name: 'Priya K.', rating: 4.9, review: 'End-to-end elegance for our party in Koregaon Park. Flawless execution!', location: 'Koregaon Park' },
      { name: 'Family', rating: 5, review: 'Sustainable all-in was ideal for our festival in Kondhwa. Stress-free!', location: 'Kondhwa' },
      { name: 'Sonia P.', rating: 5, review: 'Seamless management for our private in Viman Nagar. Highly professional!', location: 'Viman Nagar' },
      { name: 'Vikram T.', rating: 5, review: 'Interactive complete shone in Kharadi. Thank you for everything!', location: 'Kharadi' }
    ],
    faqs: [
      {
        question: 'What is the cost of full-service catering in Pune?',
        answer: 'Packages start at ₹600 per plate; a 200-guest event in Wakad could range ₹1,20,000-₹2,40,000 including staff.'
      },
      {
        question: 'How do I book full-service caterers in Pune?',
        answer: 'Submit our form for a comprehensive consult. We cover Kothrud, Kondhwa, and beyond with detail.'
      },
      {
        question: 'Do you offer customized menus in full-service?',
        answer: 'Yes! Personalized fusions and dietary, with 2025 sustainable trends.'
      },
      {
        question: 'Can you provide full-service for large events in Pune suburbs?',
        answer: 'Yes, for 50-1000+ guests in Wagholi or Baner, with total management.'
      },
      {
        question: 'What trends are in full-service catering in Pune for 2025?',
        answer: 'Eco-integrated setups, interactive premium, and all-inclusive luxury, popular in Viman Nagar or Hadapsar.'
      },
      {
        question: 'What does full-service include?',
        answer: 'Planning, setup, serving, cleanup—complete for weddings or corporates in Aundh or Kharadi.'
      },
      {
        question: 'How far in advance to book full-service catering in Pune?',
        answer: '2-4 months, but flexible for spots like Hinjewadi.'
      },
      {
        question: 'Are there hidden fees in full-service packages?',
        answer: 'No—all-inclusive transparency from consultation to close.'
      }
    ],
    keyFeatures: [
      'comprehensive event management',
      'end-to-end service coordination',
      'professional staff management',
      'complete venue adaptation',
      'all-inclusive luxury packaging',
      'stress-free total convenience'
    ],
    seasonalTrends: [
      'sustainable full-cycle operations',
      'interactive premium service elements',
      'bespoke eco-integrated setups',
      'comprehensive digital coordination',
      'all-inclusive luxury experiences'
    ],
    packageIncludes: [
      'complete event planning',
      'professional service staff',
      'comprehensive setup and teardown',
      'menu planning and execution',
      'venue coordination and adaptation',
      'complete cleanup services',
      'event coordination management',
      'comprehensive logistics handling'
    ]
  },
  {
    slug: 'housewarming',
    name: 'Housewarming',
    fullName: 'Housewarming Catering in Pune',
    description: 'At Pune Caterers, we make housewarmings feel like home with catering that blends tradition, comfort, and modern flair. From griha pravesh ceremonies in Wagholi to modern move-ins in Baner, our menus feature hearty regional dishes, fusion comforts, and sustainable options trending in 2025. As expert housewarming caterers in Pune, we provide buffet or family-style services for 40-200 guests, fostering community and joy.',
    heroTitle: 'Warm, Welcoming, and Flavorful New Beginnings',
    heroSubtitle: 'Creating comforting housewarming experiences with tradition and modern touches across Pune',
    guestRange: {
      min: 40,
      max: 200
    },
    priceRange: {
      starter: 500,
      premium: 850
    },
    popularLocations: [
      'Chinchwad', 'Wakad', 'Hinjewadi', 'Kharadi', 'Viman Nagar', 
      'Wagholi', 'Kothrud', 'Koregaon Park', 'Aundh', 'Hadapsar', 'Kondhwa', 'Baner'
    ],
    trendingElements: [
      'hearty regional comfort dishes',
      'fusion home cooking styles',
      'sustainable local sourcing',
      'interactive home stations',
      'eco-friendly welcoming touches',
      'community building atmospheres',
      'themed new nest celebrations',
      'traditional griha pravesh elements'
    ],
    serviceTypes: [
      {
        title: 'Griha Pravesh Ceremonies',
        description: 'Bless your new home with auspicious menus like pooja thalis or blessed sweets. Ideal for ritualistic events in cultural spots like Kondhwa or Kothrud, we serve 50+ guests with reverent care.',
        icon: 'home'
      },
      {
        title: 'Move-In Parties',
        description: 'Welcome neighbors with comforting fusions, such as home-style curries or global appetizers using local, sustainable ingredients. Perfect for casual vibes in expanding suburbs like Wagholi or Baner.',
        icon: 'users'
      },
      {
        title: 'Themed Housewarming Bashes',
        description: 'Add personality with themes like "New Nest" stations, featuring build-your-own chaat or dessert bars—a 2025 hit. Tailored for lively gatherings in upscale areas like Koregaon Park or Viman Nagar.',
        icon: 'party'
      }
    ],
    whyChooseUs: [
      'Housewarming Masters in Pune: Leading housewarming caterers in Pune, we\'ve warmed countless new homes with authentic, inviting flavors.',
      'Custom Warmth: Personalize menus—traditional veg, non-veg, or special—to match your home\'s vibe and guest list.',
      '2025 Home Trends: Include farm-to-table sustainability and interactive elements for cozy, community-building events.',
      'Smooth Service: Effortless setup in new developments like Chinchwad and Kharadi, with homely touches.',
      'Budget-Friendly Welcome: Packages from ₹500 per plate, offering heartfelt value.',
      'Hygiene Harmony: Strict standards for safe, welcoming environments.',
      'Home-Focused: We prioritize comfort, making your housewarming a true embrace.'
    ],
    menuHighlights: [
      { category: 'Welcome Appetizers', description: 'Spiced nuts, pakoras, and dips', price: 200 },
      { category: 'Main Course (Veg)', description: 'Homey dal makhani, paneer sabzi, and rice', price: 500 },
      { category: 'Non-Veg Comforts', description: 'Chicken curry or mutton stew', price: 600 },
      { category: 'Fusion Home Twists', description: 'Stuffed parathas or desi pasta', price: 450 },
      { category: 'Sweet Home Endings', description: 'Laddoos, kheer, or fruit custards', price: 250 },
      { category: 'Interactive Add-Ons', description: 'Live roti or salad stations (add-on)', price: 150 },
      { category: 'Dietary Welcomes', description: 'Vegan curries or gluten-free breads', price: 0 },
      { category: 'Full Package (100+ Guests)', description: 'Complete housewarming feast with setup', price: 50000 }
    ],
    testimonials: [
      { name: 'Ravi & Priya', rating: 5, review: 'Pune Caterers warmed our new home in Wagholi perfectly—traditional and tasty!', location: 'Wagholi' },
      { name: 'Neha S.', rating: 5, review: 'Best housewarming caterers in Pune. Sustainable menu impressed in Wakad!', location: 'Wakad' },
      { name: 'Amit K.', rating: 4.9, review: 'Themed stations made our griha pravesh in Kondhwa memorable. Flawless!', location: 'Kondhwa' },
      { name: 'Sonia M.', rating: 5, review: 'Vegan options were homey for our move-in in Kharadi. Highly welcoming!', location: 'Kharadi' },
      { name: 'Raj P.', rating: 5, review: 'Seamless setup for our party in Viman Nagar. Guests felt at home!', location: 'Viman Nagar' },
      { name: 'Meera T.', rating: 5, review: 'Comforting flavors shone in Hinjewadi. Thank you for the warmth!', location: 'Hinjewadi' }
    ],
    faqs: [
      {
        question: 'What is the cost of housewarming catering in Pune?',
        answer: 'Starts at ₹500 per plate; a 100-guest event in Chinchwad might range ₹50,000-₹1,00,000 with customizations.'
      },
      {
        question: 'How do I book housewarming caterers in Pune?',
        answer: 'Fill our form for a cozy consult. We serve Wakad, Kothrud, and Kondhwa seamlessly.'
      },
      {
        question: 'Do you offer traditional or fusion menus for housewarmings?',
        answer: 'Yes! Regional comforts and sustainable fusions, per 2025 Pune trends.'
      },
      {
        question: 'Can you handle large housewarmings in Pune suburbs?',
        answer: 'Yes, for 40-200 guests in Wagholi or Baner, with buffet warmth.'
      },
      {
        question: 'What trends are popular in housewarming catering in Pune for 2025?',
        answer: 'Interactive home stations, eco-sourcing, and themed welcomes, big in Viman Nagar or Hadapsar.'
      },
      {
        question: 'Do you provide catering for griha pravesh ceremonies?',
        answer: 'Absolutely, auspicious packages for rituals, ensuring blessings in Aundh or Kharadi.'
      },
      {
        question: 'How far in advance to book housewarming catering in Pune?',
        answer: '1-2 months ideal, but we handle shorter in areas like Hinjewadi.'
      },
      {
        question: 'Are there hidden fees in your housewarming packages?',
        answer: 'No—transparent for a stress-free new start.'
      }
    ],
    keyFeatures: [
      'warm and welcoming celebrations',
      'hearty regional comfort food',
      'fusion home cooking styles',
      'community building atmospheres',
      'traditional griha pravesh elements',
      'sustainable local sourcing'
    ],
    seasonalTrends: [
      'farm-to-table home comfort ingredients',
      'interactive home station setups',
      'eco-friendly welcoming presentations',
      'themed new nest celebrations',
      'community building menu selections'
    ],
    packageIncludes: [
      'complete home-style menu planning',
      'welcoming decor coordination',
      'interactive comfort food stations',
      'traditional blessing elements',
      'community atmosphere creation',
      'sustainable sourcing practices',
      'setup and cleanup services',
      'new home celebration support'
    ]
  },
  {
    slug: 'private-party',
    name: 'Private Party',
    fullName: 'Private Party Catering in Pune',
    description: 'At Pune Caterers, we transform private parties into exclusive affairs with catering that exudes sophistication and personal touch. From anniversary dinners in Koregaon Park to retirement soirees in Aundh, our menus blend premium fusions, sustainable elegance, and interactive gourmet stations trending in 2025. As premier private party caterers in Pune, we deliver discreet buffets or plated experiences for 20-150 guests, ensuring privacy and indulgence.',
    heroTitle: 'Exclusive, Personalized, and Unforgettable Evenings',
    heroSubtitle: 'Creating sophisticated private celebrations with discretion and luxury across Pune',
    guestRange: {
      min: 20,
      max: 150
    },
    priceRange: {
      starter: 700,
      premium: 1200
    },
    popularLocations: [
      'Chinchwad', 'Wakad', 'Hinjewadi', 'Kharadi', 'Viman Nagar', 
      'Wagholi', 'Kothrud', 'Koregaon Park', 'Aundh', 'Hadapsar', 'Kondhwa', 'Baner'
    ],
    trendingElements: [
      'premium fusion sophistication',
      'sustainable luxury elegance',
      'interactive gourmet stations',
      'bespoke customization options',
      'discreet exclusive service',
      'eco-luxury presentations',
      'intimate atmosphere creation',
      'personalized luxury touches'
    ],
    serviceTypes: [
      {
        title: 'Anniversary Dinners',
        description: 'Toast milestones with romantic multi-course meals, featuring candlelit stations or wine-paired fusions. Ideal for couple-focused events in upscale areas like Koregaon Park or Baner, serving 20-50 guests with subtlety.',
        icon: 'heart'
      },
      {
        title: 'Retirement & Milestone Soirees',
        description: 'Honor achievements with refined menus like artisanal cheeses, sustainable seafood, or heritage thalis. Perfect for reflective gatherings in family-oriented spots like Kothrud or Kondhwa, with personalized flair.',
        icon: 'award'
      },
      {
        title: 'Exclusive Themed Evenings',
        description: 'Elevate with bespoke themes, such as cocktail mixology bars or dessert ateliers—a 2025 luxury staple. Tailored for sophisticated parties in modern hubs like Hinjewadi or Viman Nagar, including dietary refinements.',
        icon: 'wine'
      }
    ],
    whyChooseUs: [
      'Private Party Elites in Pune: Top private party caterers in Pune, we\'ve orchestrated discreet events with unparalleled discretion and taste.',
      'Elite Customization: Craft menus—gourmet veg, non-veg, or bespoke—to align with your privacy, theme, and exclusivity.',
      '2025 Luxury Trends: Incorporate sustainable opulence and interactive gourmet for refined, unforgettable nights.',
      'Seamless Discretion: Confidential setup in premium areas like Chinchwad and Kharadi, with elegant efficiency.',
      'Premium Value: Packages from ₹700 per plate, delivering high-end indulgence affordably.',
      'Impeccable Standards: Superior hygiene for elite, intimate settings.',
      'Personalized Excellence: We focus on your vision, ensuring every detail whispers luxury.'
    ],
    menuHighlights: [
      { category: 'Gourmet Starters', description: 'Caviar canapés or truffle bites', price: 300 },
      { category: 'Main Course (Veg)', description: 'Truffled risotto or paneer roulade', price: 700 },
      { category: 'Non-Veg Luxuries', description: 'Lobster thermidor or wagyu skewers', price: 800 },
      { category: 'Fusion Elegance', description: 'Sushi-thali hybrids or spiced foie gras', price: 750 },
      { category: 'Dessert Decadence', description: 'Gold-leaf sweets or molecular gastronomy', price: 400 },
      { category: 'Interactive Add-Ons', description: 'Mixology or chef\'s table (add-on)', price: 200 },
      { category: 'Dietary Refinements', description: 'Vegan caviar or gluten-free luxuries', price: 0 },
      { category: 'Full Package (50+ Guests)', description: 'Complete private party indulgence with setup', price: 50000 }
    ],
    testimonials: [
      { name: 'Riya & Karan', rating: 5, review: 'Pune Caterers elevated our anniversary in Koregaon Park—exclusive and exquisite!', location: 'Koregaon Park' },
      { name: 'Amit S.', rating: 5, review: 'Best private party caterers in Pune. Luxury fusions stunned in Wakad!', location: 'Wakad' },
      { name: 'Vikram K.', rating: 4.9, review: 'Gourmet stations were impeccable for our retirement in Aundh. Perfect!', location: 'Aundh' },
      { name: 'Sonia M.', rating: 5, review: 'Vegan indulgences were elite for our soiree in Kharadi. Highly discreet!', location: 'Kharadi' },
      { name: 'Neha P.', rating: 5, review: 'Seamless elegance for our dinner in Viman Nagar. Guests were wowed!', location: 'Viman Nagar' },
      { name: 'Raj T.', rating: 5, review: 'Interactive opulence shone in Hinjewadi. Thank you for the privacy!', location: 'Hinjewadi' }
    ],
    faqs: [
      {
        question: 'What is the cost of private party catering in Pune?',
        answer: 'Packages start at ₹700 per plate; a 50-guest dinner in Chinchwad may range ₹50,000-₹1,00,000 with gourmet add-ons.'
      },
      {
        question: 'How do I book private party caterers in Pune?',
        answer: 'Submit our form for a confidential consult. We serve Wakad, Kothrud, and Kondhwa with discretion.'
      },
      {
        question: 'Do you offer gourmet or dietary menus for private parties?',
        answer: 'Yes! Luxury fusions and vegan/gluten-free, in sync with 2025 Pune trends.'
      },
      {
        question: 'Can you handle intimate private parties in Pune suburbs?',
        answer: 'Absolutely, for 20-150 guests in Wagholi or Baner, with plated exclusivity.'
      },
      {
        question: 'What trends are popular in private party catering in Pune for 2025?',
        answer: 'Gourmet stations, sustainable luxury, and themed indulgences, big in Viman Nagar or Hadapsar.'
      },
      {
        question: 'Do you provide catering for anniversaries or retirements?',
        answer: 'Yes, bespoke packages for all milestones, ensuring elegance in Aundh or Kharadi.'
      },
      {
        question: 'How far in advance should I book private party catering in Pune?',
        answer: '1-3 months for exclusivity, but we accommodate in high-demand spots like Hinjewadi.'
      },
      {
        question: 'Are there any hidden fees in your private party packages?',
        answer: 'No—elite transparency for complete trust.'
      }
    ],
    keyFeatures: [
      'exclusive and personalized service',
      'premium fusion sophistication',
      'sustainable luxury elegance',
      'discreet intimate atmospheres',
      'interactive gourmet stations',
      'bespoke customization options'
    ],
    seasonalTrends: [
      'sustainable luxury ingredient sourcing',
      'interactive gourmet station experiences',
      'bespoke themed evening presentations',
      'eco-luxury intimate celebrations',
      'personalized milestone commemorations'
    ],
    packageIncludes: [
      'complete luxury menu planning',
      'discreet professional service',
      'interactive gourmet stations',
      'bespoke customization options',
      'elegant intimate atmosphere creation',
      'premium presentation coordination',
      'setup and cleanup services',
      'confidential event management'
    ]
  },
  {
    slug: 'small-party',
    name: 'Small Party',
    fullName: 'Small Party Catering in Pune',
    description: 'At Pune Caterers, we specialize in small party catering that turns cozy events into cherished memories with fresh, customized flavors. Ideal for casual get-togethers in Kothrud or kitty parties in Aundh, our menus embrace 2025 trends like home-style fusion, sustainable sourcing, and interactive mini-stations. As top caterers for small parties in Pune, we offer flexible setups from platters to buffets, perfect for 10-50 guests.',
    heroTitle: 'Intimate, Personalized, and Delightful Gatherings',
    heroSubtitle: 'Creating cozy, memorable small party experiences with personalized touches across Pune',
    guestRange: {
      min: 10,
      max: 50
    },
    priceRange: {
      starter: 350,
      premium: 600
    },
    popularLocations: [
      'Chinchwad', 'Wakad', 'Hinjewadi', 'Kharadi', 'Viman Nagar', 
      'Wagholi', 'Kothrud', 'Koregaon Park', 'Aundh', 'Hadapsar', 'Kondhwa', 'Baner'
    ],
    trendingElements: [
      'home-style fusion varieties',
      'sustainable sourcing practices',
      'interactive mini-stations',
      'personalized health-focused bites',
      'effortless elegance presentations',
      'farm-to-table ingredients',
      'customized dietary accommodations',
      'intimate atmosphere creation'
    ],
    serviceTypes: [
      {
        title: 'Kitty Parties and Get-Togethers',
        description: 'Delight friends with light, shareable options like chaat stations or veggie skewers. Suited for relaxed vibes in residential spots like Kothrud or Kondhwa, we cater to groups of 15-30 with seamless delivery.',
        icon: 'coffee'
      },
      {
        title: 'Family Reunions',
        description: 'Warm up reunions with comforting home-style menus, including thalis or fusion pastas using farm-to-table ingredients. Perfect for sentimental gatherings in suburbs like Wagholi or Baner, accommodating dietary preferences.',
        icon: 'users'
      },
      {
        title: 'Casual Celebrations',
        description: 'Elevate simple occasions with themed trays, such as Mediterranean dips or desi tacos—a rising 2025 trend. Tailored for informal fun in upscale areas like Koregaon Park or Viman Nagar.',
        icon: 'party'
      }
    ],
    whyChooseUs: [
      'Small Party Pros in Pune: Leading caterers for small parties in Pune, we\'ve crafted countless intimate events with heartfelt, flavorful touches.',
      'Ultimate Personalization: Tailor menus—veg, non-veg, or special diets—to your vibe, guest list, and budget.',
      '2025 Trend Leaders: Feature eco-friendly sourcing and interactive elements for cozy, modern gatherings.',
      'Convenient Service: Quick setup and cleanup in accessible areas like Chinchwad and Kharadi, minimizing host stress.',
      'Value-Driven Pricing: Starts at ₹350 per plate, delivering premium quality affordably.',
      'Hygiene Priority: Stringent protocols for safe, home-like experiences.',
      'Warm Hospitality: We make every small party feel special and effortless.'
    ],
    menuHighlights: [
      { category: 'Finger Food Platter', description: 'Mini samosas, cheese bites, and dips', price: 150 },
      { category: 'Main Course (Veg)', description: 'Compact thali with paneer curry and rice', price: 350 },
      { category: 'Non-Veg Bites', description: 'Chicken kebabs or fish fingers', price: 400 },
      { category: 'Fusion Snacks', description: 'Paneer tacos or veggie sushi', price: 300 },
      { category: 'Sweet Endings', description: 'Mini desserts like brownies or halwa', price: 150 },
      { category: 'Mini Stations', description: 'Live salad or mocktail bars (add-on)', price: 100 },
      { category: 'Dietary Choices', description: 'Vegan wraps or gluten-free options', price: 0 },
      { category: 'Full Package (20+ Guests)', description: 'Complete small party spread with delivery', price: 10000 }
    ],
    testimonials: [
      { name: 'Riya S.', rating: 5, review: 'Pune Caterers made our kitty party in Kothrud so easy—delicious and fun!', location: 'Kothrud' },
      { name: 'Karan M.', rating: 5, review: 'Best caterers for small parties in Pune. Sustainable choices in Wakad!', location: 'Wakad' },
      { name: 'Pooja K.', rating: 4.9, review: 'Fusion snacks were a highlight at our reunion in Koregaon Park. Perfect!', location: 'Koregaon Park' },
      { name: 'Amit R.', rating: 5, review: 'Vegan menu shone for our casual meet in Kharadi. Affordable and tasty!', location: 'Kharadi' },
      { name: 'Sneha P.', rating: 5, review: 'Seamless delivery for a home party in Viman Nagar. Guests raved!', location: 'Viman Nagar' },
      { name: 'Vikram T.', rating: 5, review: 'Intimate setup stole the show in Hinjewadi. Highly recommend!', location: 'Hinjewadi' }
    ],
    faqs: [
      {
        question: 'What is the cost of small party catering in Pune?',
        answer: 'Starts at ₹350 per plate; a 20-guest event in Chinchwad could be ₹10,000-₹20,000 with add-ons.'
      },
      {
        question: 'How do I find caterers for small parties in Pune?',
        answer: 'Use our form for a free discussion. We cover Wakad, Kothrud, and Kondhwa effortlessly.'
      },
      {
        question: 'Do you offer fusion or dietary menus for small parties?',
        answer: 'Yes! Fusion like desi tacos and vegan/gluten-free, matching 2025 Pune trends.'
      },
      {
        question: 'Can you cater very small gatherings in Pune suburbs?',
        answer: 'Yes, from 10 guests in Wagholi or Baner, with platter or buffet styles.'
      },
      {
        question: 'What trends are popular for small party catering in Pune 2025?',
        answer: 'Personalized stations, farm-to-table, and home fusions, big in Viman Nagar or Hadapsar.'
      },
      {
        question: 'Do you provide add-ons like mini stations for small parties?',
        answer: 'Absolutely, for engaging fun in Aundh or Kharadi.'
      },
      {
        question: 'How far in advance to book small party catering in Pune?',
        answer: '2-4 weeks, but flexible for last-minute in spots like Hinjewadi.'
      },
      {
        question: 'Any hidden fees in small party packages?',
        answer: 'No—clear pricing from start to finish.'
      }
    ],
    keyFeatures: [
      'intimate and personalized service',
      'home-style fusion varieties',
      'sustainable sourcing practices',
      'flexible setup options',
      'interactive mini-stations',
      'customized dietary accommodations'
    ],
    seasonalTrends: [
      'personalized health-focused bite selections',
      'farm-to-table ingredient sourcing',
      'interactive mini-station experiences',
      'home-style fusion presentations',
      'effortless elegance setups'
    ],
    packageIncludes: [
      'complete intimate menu planning',
      'flexible delivery and setup',
      'personalized dietary accommodations',
      'interactive mini-station options',
      'home-style atmosphere creation',
      'sustainable sourcing practices',
      'cleanup services included',
      'cozy event coordination'
    ]
  },
  {
    slug: 'wedding',
    name: 'Wedding',
    fullName: 'Wedding Catering Services in Pune',
    description: 'At Pune Caterers, we specialize in creating unforgettable wedding experiences through exquisite catering that blends tradition, innovation, and impeccable service. Whether you\'re planning a grand Maharashtrian wedding in Chinchwad or an intimate fusion ceremony in Koregaon Park, our team delivers customized menus featuring fresh, locally sourced ingredients. With over 10 years of expertise in wedding catering in Pune, we handle everything from pre-wedding mehendi parties to lavish receptions, ensuring every bite reflects your love story.',
    heroTitle: 'Tailored for Your Special Day',
    heroSubtitle: 'Creating unforgettable wedding experiences with tradition, innovation, and impeccable service across Pune',
    guestRange: {
      min: 50,
      max: 800
    },
    priceRange: {
      starter: 800,
      premium: 1500
    },
    popularLocations: [
      'Chinchwad', 'Wakad', 'Hinjewadi', 'Kharadi', 'Viman Nagar', 
      'Wagholi', 'Kothrud', 'Koregaon Park', 'Aundh', 'Hadapsar', 'Kondhwa', 'Baner'
    ],
    trendingElements: [
      'fresh locally sourced ingredients',
      'sustainable practices integration',
      'diverse dietary accommodations',
      'interactive food stations',
      'themed presentations',
      'farm-to-table ingredient focus',
      'eco-friendly catering approach',
      'traditional and contemporary fusion'
    ],
    serviceTypes: [
      {
        title: 'Pre-Wedding Events Catering',
        description: 'Kick off your celebrations with vibrant catering for sangeet, mehendi, and engagement parties. Our offerings include live chaat counters, fusion appetizers like paneer tikka tacos, and refreshing mocktails. Perfect for lively gatherings in upscale locales like Koregaon Park or family-oriented spots in Kothrud, we ensure seamless service for 50-500 guests.',
        icon: 'heart'
      },
      {
        title: 'Main Ceremony Feast',
        description: 'For the big day, opt for our full-service wedding catering featuring elaborate multi-course meals. Choose from traditional Maharashtrian thalis, North Indian delights, or international fusion menus. We incorporate rising trends like farm-to-table ingredients and sustainable plating, ideal for eco-conscious couples in growing areas like Hinjewadi or Baner.',
        icon: 'crown'
      },
      {
        title: 'Post-Wedding Gatherings',
        description: 'Wind down with relaxed receptions or brunches. Our buffet-style setups include dessert bars with modak-inspired treats and global sweets, ensuring a sweet end to your festivities. Tailored for intimate receptions in Viman Nagar or larger ones in Wakad, with options for dietary-specific customizations.',
        icon: 'champagne'
      }
    ],
    whyChooseUs: [
      'Expertise in Pune Weddings: With a proven track record as top wedding caterers in Pune, we\'ve served hundreds of events, blending local flavors with global trends.',
      'Customization at Its Core: Every menu is personalized—whether it\'s Jain, vegetarian, or non-veg—to match your theme, budget, and guest preferences.',
      'Sustainable and Fresh: We source organic ingredients locally, aligning with the growing demand for eco-friendly catering in Pune\'s urban scene.',
      'Professional Team: Our staff handles setup, service, and cleanup, ensuring stress-free experiences in high-demand areas like Chinchwad and Kharadi.',
      'Affordable Excellence: Competitive pricing without compromising quality; packages start from ₹800 per plate for premium wedding menus.',
      'Hygiene and Safety: Adhering to strict standards, especially post-pandemic, for safe, intimate or large-scale weddings.',
      'Client-Centric Approach: From initial consultation to final execution, we focus on making your day magical.'
    ],
    menuHighlights: [
      { category: 'Appetizer Platter', description: 'Assorted starters like aloo tikki and spring rolls', price: 300 },
      { category: 'Main Course Thali (Veg)', description: 'Traditional veg thali with dal makhani, paneer butter masala, and biryani', price: 600 },
      { category: 'Non-Veg Feast', description: 'Chicken tikka masala, mutton curry, and seafood options', price: 800 },
      { category: 'Fusion Specials', description: 'Italian-Indian pasta or Mexican-inspired chaat', price: 700 },
      { category: 'Dessert Bar', description: 'Gulab jamun, rasmalai, and chocolate fountains', price: 400 },
      { category: 'Live Counters', description: 'Custom pasta or dosa stations (add-on)', price: 200 },
      { category: 'Dietary Options', description: 'Vegan biryani or gluten-free breads', price: 0 },
      { category: 'Full Package (100+ Guests)', description: 'Complete wedding meal including setup', price: 50000 }
    ],
    testimonials: [
      { name: 'Priya & Rohan', rating: 5, review: 'Pune Caterers made our wedding in Wakad truly magical! The fusion menu was a hit, and their team was so professional.', location: 'Wakad' },
      { name: 'Anjali S.', rating: 5, review: 'Best wedding caterers in Pune hands down. Sustainable options and flawless service in Chinchwad.', location: 'Chinchwad' },
      { name: 'Vikram K.', rating: 4.8, review: 'From mehendi to reception in Koregaon Park, everything was perfect. Highly recommend for corporate-turned-wedding planners!', location: 'Koregaon Park' },
      { name: 'Sneha M.', rating: 5, review: 'The veg menu for our housewarming-wedding combo in Kharadi was outstanding. Affordable and delicious!', location: 'Kharadi' },
      { name: 'Rajesh P.', rating: 5, review: 'Exceptional attention to detail for our baby shower-inspired pre-wedding in Viman Nagar. Top-notch!', location: 'Viman Nagar' },
      { name: 'Meera T.', rating: 5, review: 'Interactive stations stole the show at our festival-themed wedding in Hinjewadi. Thank you!', location: 'Hinjewadi' }
    ],
    faqs: [
      {
        question: 'What is the cost of wedding catering in Pune?',
        answer: 'Our packages start at ₹800 per plate for full-service weddings, varying by guest count, menu complexity, and location. For example, a 200-guest event in Chinchwad might range from ₹1,50,000 to ₹3,00,000, including customizations.'
      },
      {
        question: 'How do I book the best wedding caterers in Pune?',
        answer: 'Simply fill out our form or call us. We offer free consultations to discuss your vision, with availability across Pune areas like Wakad, Kothrud, and Kondhwa.'
      },
      {
        question: 'Do you offer fusion or dietary-specific menus for weddings?',
        answer: 'Yes! We specialize in fusion cuisine (e.g., Indo-Chinese) and options like vegan, gluten-free, or Jain menus, aligning with Pune\'s health-conscious trends.'
      },
      {
        question: 'Can you handle large weddings in Pune suburbs?',
        answer: 'Absolutely. We\'ve catered events for 500+ guests in growing areas like Wagholi and Baner, with full buffet or plated service.'
      },
      {
        question: 'What trends are popular in wedding catering in Pune?',
        answer: 'Interactive stations, sustainable ingredients, and themed menus (e.g., farm-to-table) are rising, especially for destination-style weddings in Viman Nagar or Hadapsar.'
      },
      {
        question: 'Do you provide catering for pre-wedding events like mehendi?',
        answer: 'Yes, we offer packages for all sub-events, ensuring cohesive flavors throughout your celebrations in Aundh or Kharadi.'
      },
      {
        question: 'How far in advance should I book wedding catering services in Pune?',
        answer: 'We recommend 3-6 months, but we accommodate last-minute requests based on availability in high-demand spots like Hinjewadi.'
      },
      {
        question: 'Are there any hidden fees in your wedding catering packages?',
        answer: 'No hidden costs—everything from setup to cleanup is included. Transparent pricing for peace of mind.'
      }
    ],
    keyFeatures: [
      'unforgettable wedding experiences',
      'tradition and innovation blend',
      'customized menu creation',
      'sustainable practices integration',
      'comprehensive event coverage',
      'diverse dietary accommodations'
    ],
    seasonalTrends: [
      'fresh locally sourced ingredient integration',
      'interactive food station experiences',
      'themed presentation customizations',
      'farm-to-table sustainable practices',
      'eco-friendly catering approaches'
    ],
    packageIncludes: [
      'complete wedding menu planning',
      'pre-wedding event catering',
      'main ceremony feast coordination',
      'post-wedding gathering services',
      'sustainable ingredient sourcing',
      'dietary customization options',
      'professional setup and cleanup',
      'comprehensive event management'
    ]
  },
  // Add more events here (wedding, birthday, corporate, etc.)
];

export const getEventBySlug = (slug: string): EventData | undefined => {
  return eventsData.find(event => event.slug === slug);
};

export const getAllEventSlugs = (): string[] => {
  return eventsData.map(event => event.slug);
};