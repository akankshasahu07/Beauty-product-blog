export interface Author {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  city: string;
}

export interface Figure {
  src: string;
  caption: string;
  alt: string;
}

export interface FormulationBreakdown {
  id: string;
  name: string;
  category: string;
  keyActives: string;
  texture: string;
  applicationRitual: string;
  origin: string;
}

export interface ArticleSection {
  id: string;
  heading?: string;
  paragraphs: string[];
  pullQuote?: string;
  figure?: Figure;
  formulationNote?: {
    title: string;
    description: string;
  };
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishDate: string;
  author: Author;
  coverImage: string;
  coverCaption: string;
  tags: string[];
  featured?: boolean;
  editorialVol?: string;
  sections: ArticleSection[];
  keyTakeaways: string[];
  products?: FormulationBreakdown[];
  relatedSlugs: string[];
  likes: number;
}

export interface Comment {
  id: string;
  articleId: string;
  authorName: string;
  date: string;
  content: string;
  likes: number;
}

export type CategoryFilter = 
  | 'All'
  | 'Skincare Science'
  | 'Haute Perfumery'
  | 'Pigments & Color'
  | 'Botanical Ferments'
  | 'Vanity Rituals';
