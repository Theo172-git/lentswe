import { BlockDefinition, BlockType } from './types';

// Complete Block Registry with all block definitions
export const blockRegistry: Record<BlockType, BlockDefinition> = {
  // ========== HERO BLOCKS ==========
  hero: {
    type: 'hero',
    name: 'Hero Banner',
    description: 'Full-width hero section with title, subtitle, and CTA',
    category: 'hero',
    icon: 'Layout',
    fields: [
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Welcome to Our Site', required: true },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea', placeholder: 'A brief description of your business' },
      { key: 'backgroundImage', label: 'Background Image', type: 'image' },
      { key: 'ctaText', label: 'Button Text', type: 'text', placeholder: 'Get Started' },
      { key: 'ctaUrl', label: 'Button URL', type: 'url', placeholder: '/contact' },
      { key: 'secondaryCtaText', label: 'Secondary Button', type: 'text', placeholder: 'Learn More' },
      { key: 'secondaryCtaUrl', label: 'Secondary Button URL', type: 'url', placeholder: '/about' },
      { key: 'overlayOpacity', label: 'Overlay Opacity', type: 'number', defaultValue: 50 },
    ],
    styles: [
      { key: 'height', label: 'Height', type: 'select', options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Full Screen', value: 'full' },
      ], defaultValue: 'lg' },
      { key: 'alignment', label: 'Text Alignment', type: 'alignment', defaultValue: 'center' },
      { key: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#ffffff' },
    ],
    defaultContent: {
      title: 'Welcome to Our Site',
      subtitle: 'We provide exceptional services tailored to your needs',
      ctaText: 'Get Started',
      ctaUrl: '/contact',
      overlayOpacity: 50,
    },
    variants: [
      {
        id: 'hero-centered',
        name: 'Centered Hero',
        defaultContent: {
          title: 'Build Something Amazing',
          subtitle: 'Start your journey with us today',
          ctaText: 'Get Started',
          ctaUrl: '/contact',
        },
      },
      {
        id: 'hero-left',
        name: 'Left-Aligned Hero',
        defaultContent: {
          title: 'Professional Solutions',
          subtitle: 'Expert services for your business needs',
          ctaText: 'Learn More',
          ctaUrl: '/services',
        },
      },
    ],
  },

  'hero-split': {
    type: 'hero-split',
    name: 'Split Hero',
    description: 'Hero with image on one side and content on the other',
    category: 'hero',
    icon: 'Columns',
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
      { key: 'image', label: 'Image', type: 'image' },
      { key: 'ctaText', label: 'Button Text', type: 'text' },
      { key: 'ctaUrl', label: 'Button URL', type: 'url' },
      { key: 'imagePosition', label: 'Image Position', type: 'select', options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ] },
    ],
    styles: [
      { key: 'backgroundColor', label: 'Background Color', type: 'color' },
    ],
    defaultContent: {
      title: 'Grow Your Business',
      subtitle: 'Partner with experts who understand your vision',
      imagePosition: 'right',
      ctaText: 'Contact Us',
      ctaUrl: '/contact',
    },
  },

  'hero-video': {
    type: 'hero-video',
    name: 'Video Hero',
    description: 'Hero section with video background',
    category: 'hero',
    icon: 'Video',
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
      { key: 'videoUrl', label: 'Video URL', type: 'url' },
      { key: 'posterImage', label: 'Poster Image', type: 'image' },
      { key: 'ctaText', label: 'Button Text', type: 'text' },
      { key: 'ctaUrl', label: 'Button URL', type: 'url' },
      { key: 'overlayOpacity', label: 'Overlay Opacity', type: 'number', defaultValue: 40 },
    ],
    styles: [],
    defaultContent: {
      title: 'Experience Excellence',
      subtitle: 'Watch our story unfold',
      overlayOpacity: 40,
    },
  },

  // ========== FEATURES BLOCKS ==========
  'features-grid': {
    type: 'features-grid',
    name: 'Features Grid',
    description: 'Grid of feature cards with icons',
    category: 'features',
    icon: 'Grid3x3',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text' },
      { key: 'subtitle', label: 'Section Subtitle', type: 'textarea' },
      { key: 'features', label: 'Features', type: 'array', arrayFields: [
        { key: 'icon', label: 'Icon', type: 'icon' },
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'link', label: 'Link URL', type: 'url' },
      ] },
      { key: 'columns', label: 'Columns', type: 'select', options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ] },
    ],
    styles: [
      { key: 'backgroundColor', label: 'Background', type: 'color' },
    ],
    defaultContent: {
      title: 'Our Features',
      subtitle: 'Everything you need to succeed',
      columns: '3',
      features: [
        { icon: 'Zap', title: 'Fast & Reliable', description: 'Lightning-fast performance you can count on' },
        { icon: 'Shield', title: 'Secure', description: 'Enterprise-grade security for your peace of mind' },
        { icon: 'Users', title: 'Team Support', description: '24/7 expert support when you need it' },
      ],
    },
  },

  'features-list': {
    type: 'features-list',
    name: 'Features List',
    description: 'Vertical list of features with descriptions',
    category: 'features',
    icon: 'List',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text' },
      { key: 'features', label: 'Features', type: 'array', arrayFields: [
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
      ] },
    ],
    styles: [],
    defaultContent: {
      title: 'Why Choose Us',
      features: [
        { title: 'Quality Service', description: 'We deliver excellence in everything we do' },
        { title: 'Expert Team', description: 'Our professionals have years of experience' },
      ],
    },
  },

  'features-icons': {
    type: 'features-icons',
    name: 'Icon Features',
    description: 'Simple icon-based feature highlights',
    category: 'features',
    icon: 'Sparkles',
    fields: [
      { key: 'features', label: 'Features', type: 'array', arrayFields: [
        { key: 'icon', label: 'Icon', type: 'icon' },
        { key: 'label', label: 'Label', type: 'text' },
      ] },
    ],
    styles: [],
    defaultContent: {
      features: [
        { icon: 'Clock', label: '24/7 Support' },
        { icon: 'Award', label: 'Award Winning' },
        { icon: 'ThumbsUp', label: 'Satisfaction Guaranteed' },
      ],
    },
  },

  // ========== CTA BLOCKS ==========
  'cta-banner': {
    type: 'cta-banner',
    name: 'CTA Banner',
    description: 'Full-width call-to-action banner',
    category: 'cta',
    icon: 'Megaphone',
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
      { key: 'ctaText', label: 'Button Text', type: 'text' },
      { key: 'ctaUrl', label: 'Button URL', type: 'url' },
      { key: 'backgroundImage', label: 'Background Image', type: 'image' },
    ],
    styles: [
      { key: 'backgroundColor', label: 'Background Color', type: 'color' },
    ],
    defaultContent: {
      title: 'Ready to Get Started?',
      subtitle: 'Join thousands of satisfied customers today',
      ctaText: 'Start Now',
      ctaUrl: '/contact',
    },
  },

  'cta-split': {
    type: 'cta-split',
    name: 'Split CTA',
    description: 'CTA with image and content side by side',
    category: 'cta',
    icon: 'SplitSquareHorizontal',
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'image', label: 'Image', type: 'image' },
      { key: 'ctaText', label: 'Button Text', type: 'text' },
      { key: 'ctaUrl', label: 'Button URL', type: 'url' },
      { key: 'imagePosition', label: 'Image Position', type: 'select', options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ] },
    ],
    styles: [],
    defaultContent: {
      title: 'Transform Your Business',
      description: 'Take the next step towards success',
      imagePosition: 'right',
      ctaText: 'Learn More',
      ctaUrl: '/services',
    },
  },

  // ========== TESTIMONIALS ==========
  'testimonials-carousel': {
    type: 'testimonials-carousel',
    name: 'Testimonials Carousel',
    description: 'Rotating testimonials slider',
    category: 'testimonials',
    icon: 'Quote',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text' },
      { key: 'testimonials', label: 'Testimonials', type: 'array', arrayFields: [
        { key: 'quote', label: 'Quote', type: 'textarea' },
        { key: 'author', label: 'Author Name', type: 'text' },
        { key: 'role', label: 'Role/Company', type: 'text' },
        { key: 'avatar', label: 'Avatar', type: 'image' },
        { key: 'rating', label: 'Rating (1-5)', type: 'number' },
      ] },
    ],
    styles: [],
    defaultContent: {
      title: 'What Our Clients Say',
      testimonials: [
        { quote: 'Exceptional service and outstanding results!', author: 'John Doe', role: 'CEO, Company Inc', rating: 5 },
      ],
    },
  },

  'testimonials-grid': {
    type: 'testimonials-grid',
    name: 'Testimonials Grid',
    description: 'Grid layout of testimonial cards',
    category: 'testimonials',
    icon: 'LayoutGrid',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text' },
      { key: 'testimonials', label: 'Testimonials', type: 'array', arrayFields: [
        { key: 'quote', label: 'Quote', type: 'textarea' },
        { key: 'author', label: 'Author Name', type: 'text' },
        { key: 'role', label: 'Role/Company', type: 'text' },
        { key: 'avatar', label: 'Avatar', type: 'image' },
      ] },
    ],
    styles: [],
    defaultContent: {
      title: 'Client Testimonials',
      testimonials: [],
    },
  },

  // ========== TEAM ==========
  'team-grid': {
    type: 'team-grid',
    name: 'Team Grid',
    description: 'Grid of team member cards',
    category: 'team',
    icon: 'Users',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text' },
      { key: 'subtitle', label: 'Section Subtitle', type: 'textarea' },
      { key: 'members', label: 'Team Members', type: 'array', arrayFields: [
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'role', label: 'Role', type: 'text' },
        { key: 'bio', label: 'Bio', type: 'textarea' },
        { key: 'image', label: 'Photo', type: 'image' },
        { key: 'linkedin', label: 'LinkedIn URL', type: 'url' },
        { key: 'twitter', label: 'Twitter URL', type: 'url' },
      ] },
    ],
    styles: [],
    defaultContent: {
      title: 'Meet Our Team',
      subtitle: 'The people behind our success',
      members: [],
    },
  },

  'team-carousel': {
    type: 'team-carousel',
    name: 'Team Carousel',
    description: 'Sliding team member showcase',
    category: 'team',
    icon: 'UserCircle',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text' },
      { key: 'members', label: 'Team Members', type: 'array', arrayFields: [
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'role', label: 'Role', type: 'text' },
        { key: 'image', label: 'Photo', type: 'image' },
      ] },
    ],
    styles: [],
    defaultContent: {
      title: 'Our Team',
      members: [],
    },
  },

  // ========== GALLERY ==========
  'gallery-grid': {
    type: 'gallery-grid',
    name: 'Image Gallery',
    description: 'Grid-based image gallery',
    category: 'gallery',
    icon: 'Image',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text' },
      { key: 'images', label: 'Images', type: 'array', arrayFields: [
        { key: 'src', label: 'Image', type: 'image' },
        { key: 'alt', label: 'Alt Text', type: 'text' },
        { key: 'caption', label: 'Caption', type: 'text' },
      ] },
      { key: 'columns', label: 'Columns', type: 'select', options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ] },
    ],
    styles: [],
    defaultContent: {
      title: 'Gallery',
      columns: '3',
      images: [],
    },
  },

  'gallery-masonry': {
    type: 'gallery-masonry',
    name: 'Masonry Gallery',
    description: 'Pinterest-style masonry layout',
    category: 'gallery',
    icon: 'LayoutDashboard',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text' },
      { key: 'images', label: 'Images', type: 'array', arrayFields: [
        { key: 'src', label: 'Image', type: 'image' },
        { key: 'alt', label: 'Alt Text', type: 'text' },
      ] },
    ],
    styles: [],
    defaultContent: {
      title: 'Our Work',
      images: [],
    },
  },

  // ========== PRICING ==========
  'pricing-table': {
    type: 'pricing-table',
    name: 'Pricing Table',
    description: 'Comparison pricing table',
    category: 'pricing',
    icon: 'Table',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text' },
      { key: 'subtitle', label: 'Section Subtitle', type: 'textarea' },
      { key: 'plans', label: 'Plans', type: 'array', arrayFields: [
        { key: 'name', label: 'Plan Name', type: 'text' },
        { key: 'price', label: 'Price', type: 'text' },
        { key: 'period', label: 'Period', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'features', label: 'Features (comma separated)', type: 'textarea' },
        { key: 'ctaText', label: 'Button Text', type: 'text' },
        { key: 'ctaUrl', label: 'Button URL', type: 'url' },
        { key: 'isPopular', label: 'Popular Badge', type: 'boolean' },
      ] },
    ],
    styles: [],
    defaultContent: {
      title: 'Pricing Plans',
      subtitle: 'Choose the plan that works for you',
      plans: [
        { name: 'Basic', price: '$29', period: '/month', features: 'Feature 1, Feature 2, Feature 3', ctaText: 'Get Started', isPopular: false },
        { name: 'Pro', price: '$79', period: '/month', features: 'Everything in Basic, Feature 4, Feature 5', ctaText: 'Get Started', isPopular: true },
      ],
    },
  },

  'pricing-cards': {
    type: 'pricing-cards',
    name: 'Pricing Cards',
    description: 'Card-style pricing display',
    category: 'pricing',
    icon: 'CreditCard',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text' },
      { key: 'plans', label: 'Plans', type: 'array', arrayFields: [
        { key: 'name', label: 'Plan Name', type: 'text' },
        { key: 'price', label: 'Price', type: 'text' },
        { key: 'features', label: 'Features (comma separated)', type: 'textarea' },
        { key: 'ctaText', label: 'Button Text', type: 'text' },
      ] },
    ],
    styles: [],
    defaultContent: {
      title: 'Our Pricing',
      plans: [],
    },
  },

  // ========== CONTACT ==========
  'contact-form': {
    type: 'contact-form',
    name: 'Contact Form',
    description: 'Simple contact form',
    category: 'contact',
    icon: 'Mail',
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
      { key: 'submitText', label: 'Submit Button Text', type: 'text' },
      { key: 'successMessage', label: 'Success Message', type: 'text' },
      { key: 'emailTo', label: 'Send Emails To', type: 'text' },
    ],
    styles: [
      { key: 'backgroundColor', label: 'Background', type: 'color' },
    ],
    defaultContent: {
      title: 'Get in Touch',
      subtitle: 'We\'d love to hear from you',
      submitText: 'Send Message',
      successMessage: 'Thank you! We\'ll be in touch soon.',
    },
  },

  'contact-split': {
    type: 'contact-split',
    name: 'Contact Split',
    description: 'Contact form with info sidebar',
    category: 'contact',
    icon: 'MessageSquare',
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'email', label: 'Email', type: 'text' },
      { key: 'phone', label: 'Phone', type: 'text' },
      { key: 'address', label: 'Address', type: 'textarea' },
      { key: 'mapEmbed', label: 'Google Maps Embed URL', type: 'url' },
    ],
    styles: [],
    defaultContent: {
      title: 'Contact Us',
      description: 'Have questions? We\'re here to help.',
      email: 'hello@example.com',
      phone: '+1 234 567 890',
    },
  },

  // ========== CONTENT ==========
  'faq-accordion': {
    type: 'faq-accordion',
    name: 'FAQ Accordion',
    description: 'Expandable FAQ section',
    category: 'content',
    icon: 'HelpCircle',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
      { key: 'faqs', label: 'FAQs', type: 'array', arrayFields: [
        { key: 'question', label: 'Question', type: 'text' },
        { key: 'answer', label: 'Answer', type: 'textarea' },
      ] },
    ],
    styles: [],
    defaultContent: {
      title: 'Frequently Asked Questions',
      faqs: [
        { question: 'What services do you offer?', answer: 'We offer a wide range of professional services...' },
      ],
    },
  },

  'stats-counter': {
    type: 'stats-counter',
    name: 'Stats Counter',
    description: 'Animated statistics display',
    category: 'content',
    icon: 'BarChart3',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text' },
      { key: 'stats', label: 'Statistics', type: 'array', arrayFields: [
        { key: 'value', label: 'Number', type: 'text' },
        { key: 'label', label: 'Label', type: 'text' },
        { key: 'suffix', label: 'Suffix (+, %, etc)', type: 'text' },
      ] },
    ],
    styles: [
      { key: 'backgroundColor', label: 'Background', type: 'color' },
    ],
    defaultContent: {
      stats: [
        { value: '500', label: 'Happy Clients', suffix: '+' },
        { value: '10', label: 'Years Experience', suffix: '+' },
        { value: '99', label: 'Success Rate', suffix: '%' },
      ],
    },
  },

  'logo-cloud': {
    type: 'logo-cloud',
    name: 'Logo Cloud',
    description: 'Display partner/client logos',
    category: 'content',
    icon: 'Building',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text' },
      { key: 'logos', label: 'Logos', type: 'array', arrayFields: [
        { key: 'image', label: 'Logo Image', type: 'image' },
        { key: 'name', label: 'Company Name', type: 'text' },
        { key: 'url', label: 'Website URL', type: 'url' },
      ] },
    ],
    styles: [],
    defaultContent: {
      title: 'Trusted By',
      logos: [],
    },
  },

  'text-content': {
    type: 'text-content',
    name: 'Text Content',
    description: 'Rich text content block',
    category: 'content',
    icon: 'FileText',
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'content', label: 'Content', type: 'richtext' },
    ],
    styles: [
      { key: 'maxWidth', label: 'Max Width', type: 'select', options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Full', value: 'full' },
      ] },
      { key: 'alignment', label: 'Text Align', type: 'alignment' },
    ],
    defaultContent: {
      title: '',
      content: '<p>Add your content here...</p>',
    },
  },

  'image-text': {
    type: 'image-text',
    name: 'Image + Text',
    description: 'Image with text side by side',
    category: 'content',
    icon: 'LayoutPanelLeft',
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'content', label: 'Content', type: 'textarea' },
      { key: 'image', label: 'Image', type: 'image' },
      { key: 'imagePosition', label: 'Image Position', type: 'select', options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ] },
      { key: 'ctaText', label: 'Button Text', type: 'text' },
      { key: 'ctaUrl', label: 'Button URL', type: 'url' },
    ],
    styles: [],
    defaultContent: {
      title: 'About Us',
      content: 'Tell your story here...',
      imagePosition: 'right',
    },
  },

  'video-embed': {
    type: 'video-embed',
    name: 'Video Embed',
    description: 'Embedded video player',
    category: 'content',
    icon: 'PlayCircle',
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'videoUrl', label: 'Video URL (YouTube/Vimeo)', type: 'url' },
      { key: 'caption', label: 'Caption', type: 'text' },
    ],
    styles: [],
    defaultContent: {
      title: 'Watch Our Video',
      videoUrl: '',
    },
  },

  // ========== LAYOUT ==========
  'divider': {
    type: 'divider',
    name: 'Divider',
    description: 'Section divider line',
    category: 'layout',
    icon: 'Minus',
    fields: [
      { key: 'style', label: 'Style', type: 'select', options: [
        { label: 'Line', value: 'line' },
        { label: 'Dashed', value: 'dashed' },
        { label: 'Dotted', value: 'dotted' },
        { label: 'Gradient', value: 'gradient' },
      ] },
    ],
    styles: [
      { key: 'color', label: 'Color', type: 'color' },
      { key: 'spacing', label: 'Spacing', type: 'spacing' },
    ],
    defaultContent: {
      style: 'line',
    },
  },

  'spacer': {
    type: 'spacer',
    name: 'Spacer',
    description: 'Vertical space between sections',
    category: 'layout',
    icon: 'MoveVertical',
    fields: [
      { key: 'height', label: 'Height', type: 'select', options: [
        { label: 'Small (32px)', value: 'sm' },
        { label: 'Medium (64px)', value: 'md' },
        { label: 'Large (96px)', value: 'lg' },
        { label: 'Extra Large (128px)', value: 'xl' },
      ] },
    ],
    styles: [],
    defaultContent: {
      height: 'md',
    },
  },

  'cards-grid': {
    type: 'cards-grid',
    name: 'Cards Grid',
    description: 'Flexible card grid layout',
    category: 'content',
    icon: 'LayoutGrid',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text' },
      { key: 'cards', label: 'Cards', type: 'array', arrayFields: [
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'image', label: 'Image', type: 'image' },
        { key: 'link', label: 'Link URL', type: 'url' },
      ] },
      { key: 'columns', label: 'Columns', type: 'select', options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ] },
    ],
    styles: [],
    defaultContent: {
      title: 'Our Services',
      columns: '3',
      cards: [],
    },
  },

  'newsletter': {
    type: 'newsletter',
    name: 'Newsletter',
    description: 'Email signup form',
    category: 'cta',
    icon: 'Newspaper',
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
      { key: 'placeholder', label: 'Input Placeholder', type: 'text' },
      { key: 'buttonText', label: 'Button Text', type: 'text' },
      { key: 'successMessage', label: 'Success Message', type: 'text' },
    ],
    styles: [
      { key: 'backgroundColor', label: 'Background', type: 'color' },
    ],
    defaultContent: {
      title: 'Subscribe to Our Newsletter',
      subtitle: 'Get the latest updates delivered to your inbox',
      placeholder: 'Enter your email',
      buttonText: 'Subscribe',
      successMessage: 'Thanks for subscribing!',
    },
  },

  // ========== NAVIGATION ==========
  'header': {
    type: 'header',
    name: 'Header',
    description: 'Page header/navigation bar',
    category: 'navigation',
    icon: 'PanelTop',
    fields: [
      { key: 'logo', label: 'Logo', type: 'image' },
      { key: 'logoText', label: 'Logo Text', type: 'text' },
      { key: 'links', label: 'Navigation Links', type: 'array', arrayFields: [
        { key: 'label', label: 'Label', type: 'text' },
        { key: 'url', label: 'URL', type: 'url' },
      ] },
      { key: 'ctaText', label: 'CTA Button Text', type: 'text' },
      { key: 'ctaUrl', label: 'CTA Button URL', type: 'url' },
      { key: 'sticky', label: 'Sticky Header', type: 'boolean' },
    ],
    styles: [
      { key: 'backgroundColor', label: 'Background', type: 'color' },
    ],
    defaultContent: {
      logoText: 'Your Brand',
      links: [
        { label: 'Home', url: '/' },
        { label: 'About', url: '/about' },
        { label: 'Services', url: '/services' },
        { label: 'Contact', url: '/contact' },
      ],
      ctaText: 'Get Started',
      ctaUrl: '/contact',
      sticky: true,
    },
  },

  'footer': {
    type: 'footer',
    name: 'Footer',
    description: 'Page footer with links and info',
    category: 'navigation',
    icon: 'PanelBottom',
    fields: [
      { key: 'logo', label: 'Logo', type: 'image' },
      { key: 'description', label: 'Company Description', type: 'textarea' },
      { key: 'columns', label: 'Link Columns', type: 'array', arrayFields: [
        { key: 'title', label: 'Column Title', type: 'text' },
        { key: 'links', label: 'Links (title|url, one per line)', type: 'textarea' },
      ] },
      { key: 'socialLinks', label: 'Social Links', type: 'array', arrayFields: [
        { key: 'platform', label: 'Platform', type: 'select', options: [
          { label: 'Facebook', value: 'facebook' },
          { label: 'Twitter', value: 'twitter' },
          { label: 'Instagram', value: 'instagram' },
          { label: 'LinkedIn', value: 'linkedin' },
          { label: 'YouTube', value: 'youtube' },
        ] },
        { key: 'url', label: 'URL', type: 'url' },
      ] },
      { key: 'copyright', label: 'Copyright Text', type: 'text' },
    ],
    styles: [
      { key: 'backgroundColor', label: 'Background', type: 'color' },
    ],
    defaultContent: {
      description: 'Your company description here',
      columns: [],
      socialLinks: [],
      copyright: '© 2024 Your Company. All rights reserved.',
    },
  },
};

// Get blocks by category
export const getBlocksByCategory = (category: string): BlockDefinition[] => {
  return Object.values(blockRegistry).filter(block => block.category === category);
};

// Get all categories
export const getBlockCategories = (): { id: string; name: string; icon: string }[] => [
  { id: 'hero', name: 'Hero Sections', icon: 'Layout' },
  { id: 'features', name: 'Features', icon: 'Grid3x3' },
  { id: 'cta', name: 'Call to Action', icon: 'Megaphone' },
  { id: 'testimonials', name: 'Testimonials', icon: 'Quote' },
  { id: 'team', name: 'Team', icon: 'Users' },
  { id: 'gallery', name: 'Gallery', icon: 'Image' },
  { id: 'pricing', name: 'Pricing', icon: 'CreditCard' },
  { id: 'contact', name: 'Contact', icon: 'Mail' },
  { id: 'content', name: 'Content', icon: 'FileText' },
  { id: 'layout', name: 'Layout', icon: 'LayoutDashboard' },
  { id: 'navigation', name: 'Navigation', icon: 'Menu' },
];

// Search blocks
export const searchBlocks = (query: string): BlockDefinition[] => {
  const lowerQuery = query.toLowerCase();
  return Object.values(blockRegistry).filter(
    block =>
      block.name.toLowerCase().includes(lowerQuery) ||
      block.description.toLowerCase().includes(lowerQuery) ||
      block.category.toLowerCase().includes(lowerQuery)
  );
};
