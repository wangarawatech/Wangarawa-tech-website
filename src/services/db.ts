import {
  Project,
  Program,
  Service,
  NewsArticle,
  TeamMember,
  MediaItem,
  Testimonial,
  Partner,
  ContactMessage,
  HeroSlide,
  SiteSettings
} from '../types';

// Storage keys
const STORAGE_KEYS = {
  PROJECTS: 'wangarawa_official_projects_v2',
  PROGRAMS: 'wangarawa_official_programs_v2',
  SERVICES: 'wangarawa_official_services_v2',
  NEWS: 'wangarawa_official_news_v2',
  TEAM: 'wangarawa_official_team_v2',
  MEDIA: 'wangarawa_official_media_v2',
  TESTIMONIALS: 'wangarawa_official_testimonials_v2',
  PARTNERS: 'wangarawa_official_partners_v2',
  MESSAGES: 'wangarawa_official_messages_v2',
  HERO_SLIDES: 'wangarawa_official_hero_slides_v2',
  SETTINGS: 'wangarawa_official_settings_v2',
  AUTH: 'wangarawa_staff_session_v2',
};

// 1. OFFICIAL SITE SETTINGS (Source of Truth)
const DEFAULT_SETTINGS: SiteSettings = {
  companyName: 'Wangarawa Global Technology Limited',
  brandName: 'Wangarawa Tech',
  rcNumber: 'RC No. 9161655',
  tagline: 'Empowering the next generation of innovators.',
  directorGeneral: 'Sulaiman Ado',
  address: 'No. 003 Wangara Shopping Complex, Sabuwar Takur, Dutse, Jigawa State, Nigeria.',
  email: 'wangarawatech@gmail.com',
  phonePrimary: '08169323996',
  phoneSecondary: '08104508713',
  whatsappNumber: '2348169323996',
  vision: 'To become a trusted technology and digital skills hub from Jigawa, serving people and organisations across Nigeria and contributing to a globally competitive generation of innovators.',
  mission: 'To make practical technology education and digital services accessible, useful and career-oriented, while creating opportunities for young people to learn, build, work and solve real-world problems with technology.',
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  cloudinaryCloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '',
  cloudinaryUploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '',
};

// 2. HERO SLIDES
const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    headline: 'Empowering the Next Generation of Innovators',
    subheadline:
      'Wangarawa Global Technology Limited (Wangarawa Tech) is a technology and digital skills company in Dutse, Jigawa State, helping young people, students, businesses and organisations build practical digital capacity and access useful technology services.',
    bgImageUrl: '/images/hero_wangarawa_tech.jpg',
    primaryCtaText: 'Explore Training',
    primaryCtaLink: '/programs',
    secondaryCtaText: 'Our Services',
    secondaryCtaLink: '/services',
    active: true,
    displayOrder: 1,
  },
  {
    id: 'slide-2',
    headline: 'Practical Technology Education & Digital Services',
    subheadline:
      'Combining technology training, practical digital services and community-focused innovation from our technology centre at Wangara Shopping Complex, Sabuwar Takur, Dutse.',
    bgImageUrl: '/images/office_innovation_hub.jpg',
    primaryCtaText: 'Our Services',
    primaryCtaLink: '/services',
    secondaryCtaText: 'Contact Us',
    secondaryCtaLink: '/contact',
    active: true,
    displayOrder: 2,
  },
  {
    id: 'slide-3',
    headline: 'Partner With Wangarawa Tech in Jigawa',
    subheadline:
      'We welcome strategic collaboration with schools, businesses, development partners and individuals committed to youth technology development and regional digital capacity.',
    bgImageUrl: '/images/project_ai_youth_bootcamp.jpg',
    primaryCtaText: 'Support & Partnership',
    primaryCtaLink: '/about',
    secondaryCtaText: 'Contact Us',
    secondaryCtaLink: '/contact',
    active: true,
    displayOrder: 3,
  },
];

// 3. FIVE OFFICIAL CORE TRAINING PROGRAMMES (Exact specifications)
const DEFAULT_PROGRAMS: Program[] = [
  {
    id: 'prog-1',
    title: 'AI & Prompt Engineering',
    description: 'AI fundamentals, prompt writing, productivity, business use cases and practical AI workflows.',
    coverImage: '/images/project_ai_youth_bootcamp.jpg',
    location: 'Wangarawa Tech Centre, Sabuwar Takur, Dutse',
    targetAudience: 'Youth, students, content creators, business owners & professionals',
    registrationLink: '/contact',
    status: 'Open for Registration',
    curriculumHighlights: [
      'Foundations of Artificial Intelligence and Large Language Models',
      'Effective prompt writing techniques for text, code and media',
      'AI productivity tools for everyday workplace tasks',
      'Business use cases, customer communication and workflow automation',
      'Responsible AI practices, ethics and continuous learning',
    ],
    published: true,
    order: 1,
  },
  {
    id: 'prog-2',
    title: 'Data Analytics & Data Science',
    description: 'Excel/data tools, data cleaning, analysis, visualisation, dashboards and introductory data science.',
    coverImage: '/images/project_digital_skills_training.jpg',
    location: 'Wangarawa Tech Centre, Sabuwar Takur, Dutse',
    targetAudience: 'Students, graduates, analysts, civil servants & SME managers',
    registrationLink: '/contact',
    status: 'Open for Registration',
    curriculumHighlights: [
      'Spreadsheet mastery with Microsoft Excel and Google Sheets',
      'Data preparation, cleansing and validation methods',
      'Descriptive analysis and exploratory data interpretation',
      'Interactive dashboards, charts and visual reporting',
      'Foundational concepts in data science and business metrics',
    ],
    published: true,
    order: 2,
  },
  {
    id: 'prog-3',
    title: 'Cybersecurity',
    description: 'Digital safety, cybersecurity fundamentals, awareness and responsible security practices.',
    coverImage: '/images/hero_wangarawa_tech.jpg',
    location: 'Wangarawa Tech Centre, Sabuwar Takur, Dutse',
    targetAudience: 'Students, administrative staff, IT support learners & individuals',
    registrationLink: '/contact',
    status: 'Upcoming',
    curriculumHighlights: [
      'Core principles of information security and privacy',
      'Safe internet browsing, password management and multi-factor auth',
      'Identifying phishing scams, social engineering and malicious files',
      'Workstation and device protection for homes and offices',
      'Responsible security practices and reporting protocols',
    ],
    published: true,
    order: 3,
  },
  {
    id: 'prog-4',
    title: 'Web Development',
    description: 'Web fundamentals, front-end development, back-end concepts and practical website projects.',
    coverImage: '/images/office_innovation_hub.jpg',
    location: 'Wangarawa Tech Centre, Sabuwar Takur, Dutse',
    targetAudience: 'Aspiring web engineers, students, freelancers & creatives',
    registrationLink: '/contact',
    status: 'Open for Registration',
    curriculumHighlights: [
      'HTML5 semantic structure and modern responsive CSS styling',
      'JavaScript fundamentals and interactive client features',
      'Front-end workflow tools and modern web design layout',
      'Introduction to web servers, databases and back-end concepts',
      'Hands-on website development and deployment project',
    ],
    published: true,
    order: 4,
  },
  {
    id: 'prog-5',
    title: 'Basic Digital Skills & Computer Literacy',
    description: 'Computer fundamentals, internet use, Google tools, digital productivity and essential workplace skills.',
    coverImage: '/images/project_digital_skills_training.jpg',
    location: 'Wangarawa Tech Centre, Sabuwar Takur, Dutse',
    targetAudience: 'School leavers, beginners, traders, job seekers & community members',
    registrationLink: '/contact',
    status: 'Continuous',
    curriculumHighlights: [
      'Computer hardware essentials, mouse and keyboard proficiency',
      'Operating system navigation, file management and folders',
      'Efficient web browsing, online search and email communication',
      'Google Workspace and essential office document preparation',
      'Digital safety, online etiquette and workplace digital habits',
    ],
    published: true,
    order: 5,
  },
];

// 4. SIX OFFICIAL DIGITAL SERVICES (Exact specifications)
const DEFAULT_SERVICES: Service[] = [
  {
    id: 'srv-1',
    title: 'Printing & Document Services',
    description: 'Printing, photocopying, scanning, typing, lamination, CV/document preparation and related services.',
    longDescription: 'Reliable, high-speed document processing located at our Sabuwar Takur centre in Dutse. We handle personal, academic and corporate documentation including CV formatting, project printing, colour copying, clear scanning, lamination and binding.',
    image: '/images/office_innovation_hub.jpg',
    iconName: 'Printer',
    published: true,
    order: 1,
  },
  {
    id: 'srv-2',
    title: 'Online & Digital Services',
    description: 'Online applications, registrations, digital documentation and other legitimate digital support services.',
    longDescription: 'Assisting students, job seekers and citizens with legitimate online portal tasks including academic admissions, job portal registrations, digital form submissions, document uploads and official online verification support.',
    image: '/images/hero_wangarawa_tech.jpg',
    iconName: 'Globe',
    published: true,
    order: 2,
  },
  {
    id: 'srv-3',
    title: 'Website Development',
    description: 'Business, school and organisational websites, updates and basic maintenance.',
    longDescription: 'Custom, modern, mobile-friendly websites designed for businesses, schools, non-profits and public institutions. We provide initial website architecture, responsive design, content layout, domain setup and ongoing maintenance.',
    image: '/images/office_innovation_hub.jpg',
    iconName: 'Code',
    published: true,
    order: 3,
  },
  {
    id: 'srv-4',
    title: 'Data Analytics & Reporting',
    description: 'Data cleaning, analysis, dashboards, visualisation and reporting support.',
    longDescription: 'Empowering local businesses, civil society groups and organisations to make evidence-based decisions. We turn raw records into clean spreadsheets, informative dashboards, charts and visual summary reports.',
    image: '/images/project_digital_skills_training.jpg',
    iconName: 'BarChart3',
    published: true,
    order: 4,
  },
  {
    id: 'srv-5',
    title: 'Social Media & Digital Marketing',
    description: 'Content support, page management, digital presence and campaign assistance.',
    longDescription: 'Helping local enterprises, schools and brands build a credible online voice. We assist with content creation, brand design, social page setup, customer response workflows and promotional digital campaigns.',
    image: '/images/project_ai_youth_bootcamp.jpg',
    iconName: 'Sparkles',
    published: true,
    order: 5,
  },
  {
    id: 'srv-6',
    title: 'Podcast & Media Production',
    description: 'Podcast recording, interviews and basic audio/video content production.',
    longDescription: 'Equipped audio and media production facility in Dutse supporting creators, educators and community leaders to record podcasts, host interviews, produce educational audio and develop digital video materials.',
    image: '/images/hero_wangarawa_tech.jpg',
    iconName: 'Mic',
    published: true,
    order: 6,
  },
];

// 5. PROJECTS & IMPACT ACTIVITIES (Truthful community engagements)
const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'act-1',
    title: 'Wangarawa Tech Training Cohorts & Lab Sessions',
    slug: 'wangarawa-tech-training-cohorts',
    shortDescription: 'Hands-on digital skills and AI education sessions conducted at our Dutse technology centre.',
    fullDescription: 'At Wangarawa Tech Centre in Sabuwar Takur, Dutse, we conduct structured cohort training combining lecture instruction with active workstation practice. Trainees gain hands-on experience in computer operations, prompt engineering, and digital workflows, building practical skills that prepare them for employment and digital enterprise.',
    coverImage: '/images/project_ai_youth_bootcamp.jpg',
    images: [
      '/images/project_ai_youth_bootcamp.jpg',
      '/images/project_digital_skills_training.jpg',
      '/images/hero_wangarawa_tech.jpg',
    ],
    videos: [],
    projectDate: 'Ongoing Initiative',
    location: 'Sabuwar Takur, Dutse, Jigawa State',
    category: 'AI Education',
    impactMetrics: [
      { label: 'Core Tracks', value: '5 Programmes' },
      { label: 'Learning Format', value: '100% Practical' },
      { label: 'Focus', value: 'Youth & SMEs' },
    ],
    partners: ['Local Community Partners', 'Dutse Tech Network'],
    status: 'Active',
    featured: true,
    published: true,
    createdAt: '2026-01-10T08:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 'act-2',
    title: 'Dutse Technology Centre & Computer Lab Establishment',
    slug: 'dutse-technology-centre-establishment',
    shortDescription: 'Developing a physical hub for training, digital services, community engagement and technology growth.',
    fullDescription: 'Located at No. 003 Wangara Shopping Complex in Sabuwar Takur, our technology centre serves as the physical base for Wangarawa Tech. The facility accommodates computer workstations, printing and document services, and dedicated rooms for student cohorts and business consultations.',
    coverImage: '/images/office_innovation_hub.jpg',
    images: [
      '/images/office_innovation_hub.jpg',
      '/images/hero_wangarawa_tech.jpg',
    ],
    videos: [],
    projectDate: 'Physical Base in Dutse',
    location: 'No. 003 Wangara Shopping Complex, Sabuwar Takur, Dutse',
    category: 'Community Innovation',
    impactMetrics: [
      { label: 'Facility Base', value: 'Dutse Central' },
      { label: 'Services', value: 'Training & Digital' },
      { label: 'Community Base', value: 'Sabuwar Takur' },
    ],
    partners: ['Wangara Complex Community'],
    status: 'Active',
    featured: true,
    published: true,
    createdAt: '2025-11-01T08:00:00Z',
    updatedAt: '2026-02-15T10:00:00Z',
  },
  {
    id: 'act-3',
    title: 'Wangarawa Digital Transformations Summit & Community Dialogue',
    slug: 'wangarawa-digital-transformations-summit',
    shortDescription: 'Convening technology practitioners, guests of honour and youth to discuss emerging technology adoption.',
    fullDescription: 'Organised to foster awareness and cross-border knowledge sharing, the Wangarawa Digital Transformations Summit brought together invited international and Nigerian technology voices to explore digital skills, artificial intelligence and youth development opportunities.',
    coverImage: '/images/hero_wangarawa_tech.jpg',
    images: [
      '/images/hero_wangarawa_tech.jpg',
      '/images/project_ai_youth_bootcamp.jpg',
    ],
    videos: [],
    projectDate: 'Community Dialogue',
    location: 'Dutse & Virtual Dialogue',
    category: 'Technology Summit',
    impactMetrics: [
      { label: 'Dialogue Focus', value: 'Digital Future' },
      { label: 'Participants', value: 'Youth & Tech Enthusiasts' },
      { label: 'Collaboration', value: 'Ecosystem' },
    ],
    partners: ['Tech Community Collaborators'],
    status: 'Completed',
    featured: true,
    published: true,
    createdAt: '2025-12-20T08:00:00Z',
    updatedAt: '2026-01-05T10:00:00Z',
  },
  {
    id: 'act-4',
    title: 'Apex Insight Sessions — Monthly Industry Conversations',
    slug: 'apex-insight-sessions',
    shortDescription: 'Monthly learning conversations with media and technology practitioners to guide student career pathways.',
    fullDescription: 'A recurring developmental platform hosted by Wangarawa Tech to connect young learners with accomplished professionals in media, journalism, content creation and software technology. Participants gain direct advice on career navigation, digital communication and portfolio building.',
    coverImage: '/images/project_digital_skills_training.jpg',
    images: [
      '/images/project_digital_skills_training.jpg',
    ],
    videos: [],
    projectDate: 'Monthly Series',
    location: 'Wangarawa Tech Suite, Dutse',
    category: 'Student Empowerment',
    impactMetrics: [
      { label: 'Cadence', value: 'Monthly' },
      { label: 'Mentors', value: 'Industry Leaders' },
      { label: 'Outcome', value: 'Career Clarity' },
    ],
    partners: ['Media & Industry Speakers'],
    status: 'Active',
    featured: false,
    published: true,
    createdAt: '2026-01-01T08:00:00Z',
    updatedAt: '2026-02-28T10:00:00Z',
  },
];

// 6. NEWS & ARTICLES
const DEFAULT_NEWS: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'Wangarawa Tech Sets Vision to Bridge Digital Skills Gap from Dutse',
    slug: 'wangarawa-tech-sets-vision-in-dutse',
    featuredImage: '/images/hero_wangarawa_tech.jpg',
    excerpt: 'Wangarawa Global Technology Limited outlines its strategic commitment to practical technology education and digital services in Jigawa State.',
    content: `Dutse, Jigawa State — Wangarawa Global Technology Limited (CAC RC No. 9161655) has detailed its core operating strategy aimed at making practical digital skills and modern technology services accessible to young people, students, businesses and organisations.

Led by Director General Sulaiman Ado, the company is positioning its physical centre at No. 003 Wangara Shopping Complex, Sabuwar Takur, Dutse as a multifaceted hub for training, daily document services and community technology collaboration.

"Our mission is to make practical technology education and digital services accessible, useful and career-oriented," stated the Director General. "We combine daily digital services with structured training in AI, data analytics, cybersecurity, web development and foundational computer skills."

The company invites local schools, SMEs and development partners to collaborate in building a strong regional talent pipeline.`,
    author: 'Wangarawa Tech Editorial',
    date: 'March 2026',
    category: 'Announcement',
    images: [
      '/images/hero_wangarawa_tech.jpg',
      '/images/office_innovation_hub.jpg',
    ],
    published: true,
    readTimeMinutes: 3,
    createdAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 'news-2',
    title: 'Why Practical Digital Services and Training Must Go Hand-in-Hand',
    slug: 'practical-digital-services-and-training',
    featuredImage: '/images/project_digital_skills_training.jpg',
    excerpt: 'How Wangarawa Tech’s operating model generates sustainable local value through document services, web solutions, and hands-on cohorts.',
    content: `In developing technology ecosystems across Northern Nigeria, sustainability is key. Many training initiatives struggle once external funding ceases. 

Wangarawa Tech addresses this through a balanced five-principle operating model: Train, Serve, Build, Connect, and Grow. By providing essential day-to-day services such as printing, digital applications, website maintenance and data reporting to the local community, the centre generates recurring revenue while providing learners with real customer projects to work on.`,
    author: 'Wangarawa Tech Insights',
    date: 'February 2026',
    category: 'Technology',
    images: [
      '/images/project_digital_skills_training.jpg',
    ],
    published: true,
    readTimeMinutes: 4,
    createdAt: '2026-02-15T09:00:00Z',
  },
];

// 7. LEADERSHIP & TEAM (Accurate official leadership)
const DEFAULT_TEAM: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Sulaiman Ado',
    position: 'Director General',
    biography: 'Founder and Director General of Wangarawa Global Technology Limited. Leading the strategic direction, community engagement, technology education initiatives, and ecosystem partnerships from Dutse, Jigawa State.',
    profileImage: '/images/hero_wangarawa_tech.jpg',
    linkedIn: '',
    email: 'wangarawatech@gmail.com',
    displayOrder: 1,
    published: true,
  },
  {
    id: 'team-2',
    name: 'Technical Training Lead',
    position: 'Head of Core Programmes',
    biography: 'Overseeing practical lab delivery, curriculum updates, and student workstation mentorship across AI, Data, Cybersecurity, and Web Development tracks.',
    profileImage: '/images/project_ai_youth_bootcamp.jpg',
    linkedIn: '',
    email: 'wangarawatech@gmail.com',
    displayOrder: 2,
    published: true,
  },
  {
    id: 'team-3',
    name: 'Digital Services Coordinator',
    position: 'Operations & Customer Desk',
    biography: 'Managing day-to-day printing, document preparation, online applications, and customer support at the Sabuwar Takur centre.',
    profileImage: '/images/office_innovation_hub.jpg',
    linkedIn: '',
    email: 'wangarawatech@gmail.com',
    displayOrder: 3,
    published: true,
  },
];

// 8. TESTIMONIALS (Realistic participant experiences)
const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Trainee Participant',
    role: 'Digital Skills Learner',
    organization: 'Dutse Tech Community',
    quote: 'Wangarawa Tech gave me practical, direct practice on computers. The instructors take time to ensure every student understands before moving forward.',
    rating: 5,
    published: true,
  },
  {
    id: 'test-2',
    name: 'Local Business Client',
    role: 'Small Business Owner',
    organization: 'Sabuwar Takur Commercial Area',
    quote: 'Reliable document processing and prompt online support right in Wangara Shopping Complex. They are professional and thorough.',
    rating: 5,
    published: true,
  },
];

// 9. PARTNERS / COLLABORATORS
const DEFAULT_PARTNERS: Partner[] = [
  {
    id: 'part-1',
    name: 'Dutse Community & Youth Networks',
    logoUrl: '/images/hero_wangarawa_tech.jpg',
    type: 'Community',
    published: true,
  },
  {
    id: 'part-2',
    name: 'Wangara Commercial Business Community',
    logoUrl: '/images/office_innovation_hub.jpg',
    type: 'Industry',
    published: true,
  },
  {
    id: 'part-3',
    name: 'Educational & School Collaborators in Jigawa',
    logoUrl: '/images/project_digital_skills_training.jpg',
    type: 'Education',
    published: true,
  },
];

// 10. MEDIA ARCHIVE (Catalog of documentary images)
const DEFAULT_MEDIA: MediaItem[] = [
  {
    id: 'med-1',
    name: 'Wangarawa Tech Training Cohort',
    url: '/images/hero_wangarawa_tech.jpg',
    type: 'image',
    caption: 'Trainees and youth gathered at Wangarawa Global Technology training session in Dutse.',
    uploadDate: '2026-03-01',
    category: 'training',
  },
  {
    id: 'med-2',
    name: 'Dutse Computer Workstation Lab',
    url: '/images/project_digital_skills_training.jpg',
    type: 'image',
    caption: 'Student workstations and training laboratory at Wangara Shopping Complex.',
    uploadDate: '2026-03-01',
    category: 'facility',
  },
  {
    id: 'med-3',
    name: 'Hands-on AI & Coding Workshop',
    url: '/images/project_ai_youth_bootcamp.jpg',
    type: 'image',
    caption: 'Students collaborating on prompt engineering and software exercises.',
    uploadDate: '2026-03-01',
    category: 'training',
  },
  {
    id: 'med-4',
    name: 'Technology Centre & Service Office',
    url: '/images/office_innovation_hub.jpg',
    type: 'image',
    caption: 'Official office and digital services station in Sabuwar Takur, Dutse.',
    uploadDate: '2026-03-01',
    category: 'facility',
  },
];

class DBService {
  private sanitizeImagePaths<T>(data: T): T {
    if (!data) return data;
    if (typeof data === 'string') {
      if (data.startsWith('/src/assets/images/')) {
        return data.replace('/src/assets/images/', '/images/') as unknown as T;
      }
      return data;
    }
    if (Array.isArray(data)) {
      return data.map((item) => this.sanitizeImagePaths(item)) as unknown as T;
    }
    if (typeof data === 'object') {
      const copy: Record<string, any> = {};
      for (const [k, v] of Object.entries(data)) {
        copy[k] = this.sanitizeImagePaths(v);
      }
      return copy as T;
    }
    return data;
  }

  private getItem<T>(key: string, defaultValue: T): T {
    try {
      const data = localStorage.getItem(key);
      if (!data) {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
      const parsed = JSON.parse(data) as T;
      return this.sanitizeImagePaths(parsed);
    } catch {
      return defaultValue;
    }
  }

  private setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Failed to write to localStorage for key ${key}:`, e);
    }
  }

  // SETTINGS
  getSettings(): SiteSettings {
    return this.getItem<SiteSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
  }

  saveSettings(settings: SiteSettings): SiteSettings {
    this.setItem(STORAGE_KEYS.SETTINGS, settings);
    return settings;
  }

  // HERO SLIDES
  getHeroSlides(): HeroSlide[] {
    return this.getItem<HeroSlide[]>(STORAGE_KEYS.HERO_SLIDES, DEFAULT_HERO_SLIDES).sort(
      (a, b) => a.displayOrder - b.displayOrder
    );
  }

  saveHeroSlide(slide: HeroSlide): HeroSlide {
    const list = this.getHeroSlides();
    const index = list.findIndex((s) => s.id === slide.id);
    if (index >= 0) {
      list[index] = slide;
    } else {
      list.push(slide);
    }
    this.setItem(STORAGE_KEYS.HERO_SLIDES, list);
    return slide;
  }

  deleteHeroSlide(id: string): void {
    const list = this.getHeroSlides().filter((s) => s.id !== id);
    this.setItem(STORAGE_KEYS.HERO_SLIDES, list);
  }

  // PROGRAMS (5 official core training programmes)
  getPrograms(): Program[] {
    return this.getItem<Program[]>(STORAGE_KEYS.PROGRAMS, DEFAULT_PROGRAMS).sort(
      (a, b) => (a.order ?? 0) - (b.order ?? 0)
    );
  }

  saveProgram(prog: Program): Program {
    const list = this.getPrograms();
    const index = list.findIndex((p) => p.id === prog.id);
    if (index >= 0) {
      list[index] = prog;
    } else {
      list.push(prog);
    }
    this.setItem(STORAGE_KEYS.PROGRAMS, list);
    return prog;
  }

  deleteProgram(id: string): void {
    const list = this.getPrograms().filter((p) => p.id !== id);
    this.setItem(STORAGE_KEYS.PROGRAMS, list);
  }

  // SERVICES (6 official digital services)
  getServices(): Service[] {
    return this.getItem<Service[]>(STORAGE_KEYS.SERVICES, DEFAULT_SERVICES).sort(
      (a, b) => a.order - b.order
    );
  }

  saveService(srv: Service): Service {
    const list = this.getServices();
    const index = list.findIndex((s) => s.id === srv.id);
    if (index >= 0) {
      list[index] = srv;
    } else {
      list.push(srv);
    }
    this.setItem(STORAGE_KEYS.SERVICES, list);
    return srv;
  }

  deleteService(id: string): void {
    const list = this.getServices().filter((s) => s.id !== id);
    this.setItem(STORAGE_KEYS.SERVICES, list);
  }

  // PROJECTS & ACTIVITIES
  getProjects(): Project[] {
    return this.getItem<Project[]>(STORAGE_KEYS.PROJECTS, DEFAULT_PROJECTS);
  }

  getProjectBySlug(slug: string): Project | undefined {
    return this.getProjects().find((p) => p.slug === slug || p.id === slug);
  }

  saveProject(project: Project): Project {
    const list = this.getProjects();
    const index = list.findIndex((p) => p.id === project.id);
    const updated = { ...project, updatedAt: new Date().toISOString() };
    if (index >= 0) {
      list[index] = updated;
    } else {
      updated.createdAt = new Date().toISOString();
      list.unshift(updated);
    }
    this.setItem(STORAGE_KEYS.PROJECTS, list);
    return updated;
  }

  deleteProject(id: string): void {
    const list = this.getProjects().filter((p) => p.id !== id);
    this.setItem(STORAGE_KEYS.PROJECTS, list);
  }

  // NEWS
  getNews(): NewsArticle[] {
    return this.getItem<NewsArticle[]>(STORAGE_KEYS.NEWS, DEFAULT_NEWS);
  }

  getNewsBySlug(slug: string): NewsArticle | undefined {
    return this.getNews().find((n) => n.slug === slug || n.id === slug);
  }

  saveNews(article: NewsArticle): NewsArticle {
    const list = this.getNews();
    const index = list.findIndex((n) => n.id === article.id);
    if (index >= 0) {
      list[index] = article;
    } else {
      list.unshift(article);
    }
    this.setItem(STORAGE_KEYS.NEWS, list);
    return article;
  }

  deleteNews(id: string): void {
    const list = this.getNews().filter((n) => n.id !== id);
    this.setItem(STORAGE_KEYS.NEWS, list);
  }

  // TEAM
  getTeam(): TeamMember[] {
    return this.getItem<TeamMember[]>(STORAGE_KEYS.TEAM, DEFAULT_TEAM).sort(
      (a, b) => a.displayOrder - b.displayOrder
    );
  }

  saveTeamMember(m: TeamMember): TeamMember {
    const list = this.getTeam();
    const index = list.findIndex((item) => item.id === m.id);
    if (index >= 0) {
      list[index] = m;
    } else {
      list.push(m);
    }
    this.setItem(STORAGE_KEYS.TEAM, list);
    return m;
  }

  deleteTeamMember(id: string): void {
    const list = this.getTeam().filter((m) => m.id !== id);
    this.setItem(STORAGE_KEYS.TEAM, list);
  }

  // MEDIA
  getMedia(): MediaItem[] {
    return this.getItem<MediaItem[]>(STORAGE_KEYS.MEDIA, DEFAULT_MEDIA);
  }

  saveMedia(item: MediaItem): MediaItem {
    const list = this.getMedia();
    const index = list.findIndex((m) => m.id === item.id);
    if (index >= 0) {
      list[index] = item;
    } else {
      list.unshift(item);
    }
    this.setItem(STORAGE_KEYS.MEDIA, list);
    return item;
  }

  deleteMedia(id: string): void {
    const list = this.getMedia().filter((m) => m.id !== id);
    this.setItem(STORAGE_KEYS.MEDIA, list);
  }

  // TESTIMONIALS
  getTestimonials(): Testimonial[] {
    return this.getItem<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, DEFAULT_TESTIMONIALS);
  }

  saveTestimonial(t: Testimonial): Testimonial {
    const list = this.getTestimonials();
    const index = list.findIndex((item) => item.id === t.id);
    if (index >= 0) {
      list[index] = t;
    } else {
      list.push(t);
    }
    this.setItem(STORAGE_KEYS.TESTIMONIALS, list);
    return t;
  }

  deleteTestimonial(id: string): void {
    const list = this.getTestimonials().filter((t) => t.id !== id);
    this.setItem(STORAGE_KEYS.TESTIMONIALS, list);
  }

  // PARTNERS
  getPartners(): Partner[] {
    return this.getItem<Partner[]>(STORAGE_KEYS.PARTNERS, DEFAULT_PARTNERS);
  }

  savePartner(p: Partner): Partner {
    const list = this.getPartners();
    const index = list.findIndex((item) => item.id === p.id);
    if (index >= 0) {
      list[index] = p;
    } else {
      list.push(p);
    }
    this.setItem(STORAGE_KEYS.PARTNERS, list);
    return p;
  }

  deletePartner(id: string): void {
    const list = this.getPartners().filter((p) => p.id !== id);
    this.setItem(STORAGE_KEYS.PARTNERS, list);
  }

  // MESSAGES
  getMessages(): ContactMessage[] {
    return this.getItem<ContactMessage[]>(STORAGE_KEYS.MESSAGES, []);
  }

  saveMessage(msg: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>): ContactMessage {
    const list = this.getMessages();
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      createdAt: new Date().toISOString(),
      read: false,
    };
    list.unshift(newMsg);
    this.setItem(STORAGE_KEYS.MESSAGES, list);
    return newMsg;
  }

  markMessageRead(id: string, read = true): void {
    const list = this.getMessages();
    const target = list.find((m) => m.id === id);
    if (target) {
      target.read = read;
      this.setItem(STORAGE_KEYS.MESSAGES, list);
    }
  }

  deleteMessage(id: string): void {
    const list = this.getMessages().filter((m) => m.id !== id);
    this.setItem(STORAGE_KEYS.MESSAGES, list);
  }

  // STAFF & ADMIN AUTHENTICATION
  isStaffLoggedIn(): boolean {
    try {
      const sess = localStorage.getItem(STORAGE_KEYS.AUTH);
      if (!sess) return false;
      const parsed = JSON.parse(sess);
      return Boolean(parsed && parsed.authenticated);
    } catch {
      return false;
    }
  }

  isAdminLoggedIn(): boolean {
    return this.isStaffLoggedIn();
  }

  loginStaff(pass: string): boolean {
    const trimmed = (pass || '').trim();
    if (!trimmed) return false;

    const settings = this.getSettings();
    const envPass = (import.meta.env.VITE_ADMIN_PASSWORD || '').trim();
    const customPass = (settings.adminPassword || '').trim();

    // Verify against custom configured password, VITE_ADMIN_PASSWORD env var, or initial setup key
    const isAuthorized =
      (customPass && trimmed === customPass) ||
      (envPass && trimmed === envPass) ||
      (!customPass && !envPass && (trimmed === 'wangarawa2026' || trimmed === 'wangarawatech'));

    if (isAuthorized) {
      localStorage.setItem(
        STORAGE_KEYS.AUTH,
        JSON.stringify({ authenticated: true, staffEmail: settings.email || 'wangarawatech@gmail.com', time: Date.now() })
      );
      return true;
    }
    return false;
  }

  updateAdminPassword(newPassword: string): boolean {
    if (!newPassword || newPassword.length < 6) return false;
    const settings = this.getSettings();
    settings.adminPassword = newPassword.trim();
    this.saveSettings(settings);
    return true;
  }

  loginAdmin(pass: string): boolean {
    return this.loginStaff(pass);
  }

  logoutStaff(): void {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  }

  logoutAdmin(): void {
    this.logoutStaff();
  }

  // BACKUP & RESET
  resetToFactoryDefaults(): void {
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
  }

  exportAllDataJSON(): string {
    return JSON.stringify(
      {
        settings: this.getSettings(),
        heroSlides: this.getHeroSlides(),
        programs: this.getPrograms(),
        services: this.getServices(),
        projects: this.getProjects(),
        news: this.getNews(),
        team: this.getTeam(),
        media: this.getMedia(),
        testimonials: this.getTestimonials(),
        partners: this.getPartners(),
        messages: this.getMessages(),
        exportedAt: new Date().toISOString(),
      },
      null,
      2
    );
  }

  importAllDataJSON(jsonStr: string): boolean {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.settings) this.setItem(STORAGE_KEYS.SETTINGS, parsed.settings);
      if (parsed.heroSlides) this.setItem(STORAGE_KEYS.HERO_SLIDES, parsed.heroSlides);
      if (parsed.programs) this.setItem(STORAGE_KEYS.PROGRAMS, parsed.programs);
      if (parsed.services) this.setItem(STORAGE_KEYS.SERVICES, parsed.services);
      if (parsed.projects) this.setItem(STORAGE_KEYS.PROJECTS, parsed.projects);
      if (parsed.news) this.setItem(STORAGE_KEYS.NEWS, parsed.news);
      if (parsed.team) this.setItem(STORAGE_KEYS.TEAM, parsed.team);
      if (parsed.media) this.setItem(STORAGE_KEYS.MEDIA, parsed.media);
      if (parsed.testimonials) this.setItem(STORAGE_KEYS.TESTIMONIALS, parsed.testimonials);
      if (parsed.partners) this.setItem(STORAGE_KEYS.PARTNERS, parsed.partners);
      return true;
    } catch {
      return false;
    }
  }
}

export const db = new DBService();
