// Core Block Types for Page Builder

export type BlockType = 
  | 'hero'
  | 'hero-split'
  | 'hero-video'
  | 'features-grid'
  | 'features-list'
  | 'features-icons'
  | 'cta-banner'
  | 'cta-split'
  | 'testimonials-carousel'
  | 'testimonials-grid'
  | 'team-grid'
  | 'team-carousel'
  | 'gallery-grid'
  | 'gallery-masonry'
  | 'pricing-table'
  | 'pricing-cards'
  | 'contact-form'
  | 'contact-split'
  | 'faq-accordion'
  | 'stats-counter'
  | 'logo-cloud'
  | 'text-content'
  | 'image-text'
  | 'video-embed'
  | 'divider'
  | 'spacer'
  | 'cards-grid'
  | 'newsletter'
  | 'header'
  | 'footer';

export type BlockCategory = 
  | 'hero'
  | 'features'
  | 'cta'
  | 'testimonials'
  | 'team'
  | 'gallery'
  | 'pricing'
  | 'contact'
  | 'content'
  | 'layout'
  | 'navigation';

export interface BlockField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'richtext' | 'image' | 'video' | 'url' | 'color' | 'number' | 'boolean' | 'select' | 'icon' | 'array';
  placeholder?: string;
  defaultValue?: any;
  options?: { label: string; value: string }[];
  arrayFields?: BlockField[];
  required?: boolean;
  group?: string;
}

export interface BlockStyle {
  key: string;
  label: string;
  type: 'color' | 'spacing' | 'alignment' | 'border' | 'shadow' | 'select';
  options?: { label: string; value: string }[];
  defaultValue?: any;
}

export interface BlockDefinition {
  type: BlockType;
  name: string;
  description: string;
  category: BlockCategory;
  icon: string;
  thumbnail?: string;
  fields: BlockField[];
  styles: BlockStyle[];
  defaultContent: Record<string, any>;
  variants?: {
    id: string;
    name: string;
    thumbnail?: string;
    defaultContent: Record<string, any>;
  }[];
}

export interface BlockInstance {
  id: string;
  type: BlockType;
  content: Record<string, any>;
  styles: Record<string, any>;
  order: number;
  isHidden?: boolean;
  variantId?: string;
}

export interface PageLayout {
  id: string;
  name: string;
  slug: string;
  blocks: BlockInstance[];
  meta: {
    title?: string;
    description?: string;
    ogImage?: string;
  };
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface PageTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: string;
  blocks: Omit<BlockInstance, 'id'>[];
  tags: string[];
}

export interface BuilderState {
  selectedBlockId: string | null;
  hoveredBlockId: string | null;
  isDragging: boolean;
  viewMode: 'desktop' | 'tablet' | 'mobile';
  showGrid: boolean;
  zoom: number;
  history: PageLayout[];
  historyIndex: number;
  isPreviewing: boolean;
}

export interface BlockEditorProps {
  block: BlockInstance;
  definition: BlockDefinition;
  onUpdate: (content: Record<string, any>, styles?: Record<string, any>) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}
