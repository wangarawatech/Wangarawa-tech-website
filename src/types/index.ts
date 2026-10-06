export interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  coverImage: string;
  images: string[];
  videos: string[];
  projectDate: string;
  location: string;
  category: 'AI Education' | 'Digital Skills' | 'Community Innovation' | 'Student Empowerment' | 'Technology Summit';
  beneficiariesCount?: number;
  impactMetrics: {
    label: string;
    value: string;
  }[];
  partners: string[];
  status: 'Active' | 'Completed' | 'Upcoming' | 'In Progress';
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Program {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  videoUrl?: string;
  startDate?: string;
  endDate?: string;
  location: string;
  targetAudience: string;
  registrationLink: string;
  status: 'Open for Registration' | 'In Progress' | 'Upcoming' | 'Continuous';
  curriculumHighlights?: string[];
  gallery?: string[];
  published: boolean;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category?: string;
  image: string;
  iconName: string;
  published: boolean;
  order: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  featuredImage: string;
  content: string;
  excerpt: string;
  author: string;
  date: string;
  category: 'Announcement' | 'Community Impact' | 'Technology' | 'Education' | 'Partnerships';
  images: string[];
  published: boolean;
  readTimeMinutes: number;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  biography: string;
  profileImage: string;
  linkedIn?: string;
  twitter?: string;
  email?: string;
  displayOrder: number;
  published: boolean;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video';
  caption?: string;
  uploadDate: string;
  category?: 'training' | 'event' | 'facility' | 'leadership';
  sizeBytes?: number;
  provider?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  quote: string;
  rating: number;
  programOrProject?: string;
  published: boolean;
}

export interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  type?: 'Education' | 'Community' | 'Industry' | 'Strategic' | 'Government';
  published: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  serviceOfInterest?: string;
  read: boolean;
  createdAt: string;
}

export interface HeroSlide {
  id: string;
  headline: string;
  subheadline: string;
  bgImageUrl: string;
  bgVideoUrl?: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  active: boolean;
  displayOrder: number;
}

export interface SiteSettings {
  companyName: string;
  brandName: string;
  rcNumber: string;
  tagline: string;
  directorGeneral: string;
  address: string;
  email: string;
  phonePrimary: string;
  phoneSecondary: string;
  whatsappNumber: string;
  vision: string;
  mission: string;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  cloudinaryCloudName?: string;
  cloudinaryUploadPreset?: string;
}
