import React from 'react';
import { BlockInstance } from './types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Layout, Users, Mail, FileText, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PageTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  category: 'landing' | 'about' | 'contact' | 'services' | 'blank';
  thumbnail?: string;
  blocks: Omit<BlockInstance, 'id'>[];
}

// Pre-built page templates with rich content
export const pageTemplates: PageTemplate[] = [
  {
    id: 'blank',
    name: 'Blank Page',
    description: 'Start from scratch with an empty canvas',
    icon: FileText,
    category: 'blank',
    blocks: [],
  },
  {
    id: 'landing-modern',
    name: 'Modern Landing Page',
    description: 'A complete landing page with hero, features, testimonials, and CTA',
    icon: Layout,
    category: 'landing',
    blocks: [
      {
        type: 'hero',
        content: {
          title: 'Transform Your Business Today',
          subtitle: 'We provide innovative solutions that help you achieve your goals faster and more efficiently than ever before.',
          ctaText: 'Get Started',
          ctaUrl: '/contact',
          secondaryCtaText: 'Learn More',
          secondaryCtaUrl: '/about',
          overlayOpacity: 50,
        },
        styles: { height: 'lg', alignment: 'center', textColor: '#ffffff' },
        order: 0,
      },
      {
        type: 'features-grid',
        content: {
          title: 'Why Choose Us',
          subtitle: 'Discover the advantages that set us apart from the competition',
          columns: '3',
          features: [
            { icon: 'Zap', title: 'Lightning Fast', description: 'Experience blazing fast performance that keeps you ahead of the competition' },
            { icon: 'Shield', title: 'Enterprise Security', description: 'Bank-level security protocols protect your data 24/7' },
            { icon: 'Users', title: 'Dedicated Support', description: 'Our expert team is available around the clock to assist you' },
            { icon: 'Award', title: 'Award Winning', description: 'Recognized industry leader with multiple accolades' },
            { icon: 'TrendingUp', title: 'Scalable Solutions', description: 'Grow your business with solutions that scale with your needs' },
            { icon: 'Heart', title: 'Customer First', description: 'Your success is our priority - we go above and beyond' },
          ],
        },
        styles: {},
        order: 1,
      },
      {
        type: 'stats-counter',
        content: {
          title: 'Our Impact in Numbers',
          stats: [
            { value: '500+', label: 'Happy Clients' },
            { value: '1000+', label: 'Projects Completed' },
            { value: '99%', label: 'Satisfaction Rate' },
            { value: '24/7', label: 'Support Available' },
          ],
        },
        styles: {},
        order: 2,
      },
      {
        type: 'testimonials-carousel',
        content: {
          title: 'What Our Clients Say',
          testimonials: [
            { quote: 'Working with this team has been an absolute pleasure. They delivered beyond our expectations!', author: 'Sarah Johnson', role: 'CEO, TechStart', rating: 5 },
            { quote: 'The level of professionalism and attention to detail is unmatched. Highly recommend!', author: 'Michael Chen', role: 'Founder, InnovateCo', rating: 5 },
            { quote: 'They transformed our business completely. We saw a 200% increase in efficiency.', author: 'Emily Rodriguez', role: 'Operations Director, GrowthLab', rating: 5 },
          ],
        },
        styles: {},
        order: 3,
      },
      {
        type: 'cta-banner',
        content: {
          title: 'Ready to Get Started?',
          subtitle: 'Join thousands of satisfied customers and take your business to the next level',
          ctaText: 'Contact Us Today',
          ctaUrl: '/contact',
        },
        styles: {},
        order: 4,
      },
    ],
  },
  {
    id: 'about-company',
    name: 'About Us Page',
    description: 'Company story, mission, values, and team showcase',
    icon: Users,
    category: 'about',
    blocks: [
      {
        type: 'hero',
        content: {
          title: 'About Our Company',
          subtitle: 'Learn about our journey, mission, and the team behind our success',
          overlayOpacity: 60,
        },
        styles: { height: 'md', alignment: 'center', textColor: '#ffffff' },
        order: 0,
      },
      {
        type: 'text-content',
        content: {
          title: 'Our Story',
          content: 'Founded with a vision to transform industries, we have grown from a small startup to a leading provider of innovative solutions. Our journey has been marked by continuous learning, adaptation, and an unwavering commitment to our clients\' success.\n\nOver the years, we have built lasting partnerships with businesses of all sizes, helping them navigate challenges and seize opportunities in an ever-evolving market.',
          alignment: 'left',
        },
        styles: {},
        order: 1,
      },
      {
        type: 'features-grid',
        content: {
          title: 'Our Core Values',
          subtitle: 'The principles that guide everything we do',
          columns: '3',
          features: [
            { icon: 'Target', title: 'Excellence', description: 'We strive for excellence in every project we undertake' },
            { icon: 'Users', title: 'Collaboration', description: 'Working together to achieve remarkable results' },
            { icon: 'Lightbulb', title: 'Innovation', description: 'Continuously pushing boundaries and exploring new ideas' },
            { icon: 'Shield', title: 'Integrity', description: 'Honest and transparent in all our dealings' },
            { icon: 'Heart', title: 'Passion', description: 'Driven by passion and dedication to our craft' },
            { icon: 'TrendingUp', title: 'Growth', description: 'Committed to continuous improvement and learning' },
          ],
        },
        styles: {},
        order: 2,
      },
      {
        type: 'team-grid',
        content: {
          title: 'Meet Our Team',
          subtitle: 'The talented people who make it all happen',
          members: [
            { name: 'John Smith', role: 'CEO & Founder', bio: 'Visionary leader with 15+ years of industry experience' },
            { name: 'Sarah Williams', role: 'Chief Technology Officer', bio: 'Tech innovator driving our digital transformation' },
            { name: 'David Brown', role: 'Head of Operations', bio: 'Ensuring seamless execution of all projects' },
            { name: 'Lisa Chen', role: 'Creative Director', bio: 'Bringing creativity and design excellence to our work' },
          ],
        },
        styles: {},
        order: 3,
      },
      {
        type: 'stats-counter',
        content: {
          title: 'Our Achievements',
          stats: [
            { value: '10+', label: 'Years of Experience' },
            { value: '50+', label: 'Team Members' },
            { value: '500+', label: 'Projects Delivered' },
            { value: '15', label: 'Countries Served' },
          ],
        },
        styles: {},
        order: 4,
      },
    ],
  },
  {
    id: 'contact-full',
    name: 'Contact Page',
    description: 'Contact form with company information and map',
    icon: Mail,
    category: 'contact',
    blocks: [
      {
        type: 'hero',
        content: {
          title: 'Get In Touch',
          subtitle: 'We\'d love to hear from you. Reach out to us anytime.',
          overlayOpacity: 60,
        },
        styles: { height: 'sm', alignment: 'center', textColor: '#ffffff' },
        order: 0,
      },
      {
        type: 'contact-split',
        content: {
          title: 'Contact Information',
          description: 'Have a question or want to work together? Fill out the form or use our contact details below.',
          email: 'hello@yourcompany.com',
          phone: '+1 (555) 123-4567',
          address: '123 Business Street\nCity, State 12345\nUnited States',
        },
        styles: {},
        order: 1,
      },
      {
        type: 'faq-accordion',
        content: {
          title: 'Frequently Asked Questions',
          questions: [
            { question: 'What are your business hours?', answer: 'We are open Monday through Friday, 9 AM to 6 PM EST. Weekend support is available for urgent matters.' },
            { question: 'How quickly can I expect a response?', answer: 'We aim to respond to all inquiries within 24 business hours.' },
            { question: 'Do you offer phone consultations?', answer: 'Yes! You can schedule a free 30-minute consultation call through our booking system.' },
            { question: 'What services do you provide?', answer: 'We offer a comprehensive range of services tailored to your business needs. Contact us for a detailed discussion.' },
          ],
        },
        styles: {},
        order: 2,
      },
    ],
  },
  {
    id: 'services-showcase',
    name: 'Services Page',
    description: 'Showcase your services with detailed descriptions and pricing',
    icon: Sparkles,
    category: 'services',
    blocks: [
      {
        type: 'hero',
        content: {
          title: 'Our Services',
          subtitle: 'Comprehensive solutions tailored to your unique business needs',
          ctaText: 'Get a Quote',
          ctaUrl: '/contact',
          overlayOpacity: 55,
        },
        styles: { height: 'md', alignment: 'center', textColor: '#ffffff' },
        order: 0,
      },
      {
        type: 'features-grid',
        content: {
          title: 'What We Offer',
          subtitle: 'Explore our range of professional services',
          columns: '3',
          features: [
            { icon: 'Briefcase', title: 'Consulting', description: 'Expert guidance to help you make informed decisions and optimize your operations' },
            { icon: 'Code', title: 'Development', description: 'Custom software solutions built with cutting-edge technologies' },
            { icon: 'Palette', title: 'Design', description: 'Beautiful, user-centered designs that elevate your brand' },
            { icon: 'BarChart', title: 'Analytics', description: 'Data-driven insights to fuel your business growth' },
            { icon: 'Headphones', title: 'Support', description: '24/7 dedicated support to keep your systems running smoothly' },
            { icon: 'Rocket', title: 'Training', description: 'Empower your team with expert-led training programs' },
          ],
        },
        styles: {},
        order: 1,
      },
      {
        type: 'pricing-table',
        content: {
          title: 'Pricing Plans',
          subtitle: 'Flexible options to fit your budget and requirements',
          plans: [
            { name: 'Starter', price: '$99', period: '/month', description: 'Perfect for small businesses', features: 'Basic features, Email support, 5 projects, 1 user', ctaText: 'Get Started', ctaUrl: '/contact', isPopular: false },
            { name: 'Professional', price: '$299', period: '/month', description: 'Ideal for growing teams', features: 'All starter features, Priority support, Unlimited projects, 10 users, Analytics', ctaText: 'Get Started', ctaUrl: '/contact', isPopular: true },
            { name: 'Enterprise', price: 'Custom', period: '', description: 'For large organizations', features: 'All pro features, Dedicated account manager, Custom integrations, Unlimited users, SLA', ctaText: 'Contact Sales', ctaUrl: '/contact', isPopular: false },
          ],
        },
        styles: {},
        order: 2,
      },
      {
        type: 'cta-banner',
        content: {
          title: 'Need a Custom Solution?',
          subtitle: 'Contact us to discuss your specific requirements',
          ctaText: 'Schedule a Call',
          ctaUrl: '/contact',
        },
        styles: {},
        order: 3,
      },
    ],
  },
];

interface PageTemplatesProps {
  onSelectTemplate: (template: PageTemplate) => void;
  onClose: () => void;
}

export const PageTemplates: React.FC<PageTemplatesProps> = ({
  onSelectTemplate,
  onClose,
}) => {
  const categories = [
    { id: 'blank', name: 'Blank', icon: FileText },
    { id: 'landing', name: 'Landing Pages', icon: Layout },
    { id: 'about', name: 'About Pages', icon: Users },
    { id: 'contact', name: 'Contact Pages', icon: Mail },
    { id: 'services', name: 'Services Pages', icon: Sparkles },
  ];

  const [activeCategory, setActiveCategory] = React.useState<string>('landing');

  const filteredTemplates = activeCategory === 'all' 
    ? pageTemplates 
    : pageTemplates.filter(t => t.category === activeCategory);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Choose a Template</h2>
          <p className="text-muted-foreground">Start with a pre-designed template or create from scratch</p>
        </div>
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 border-b pb-4">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setActiveCategory(category.id)}
              className="gap-2"
            >
              <Icon className="w-4 h-4" />
              {category.name}
            </Button>
          );
        })}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => {
          const Icon = template.icon;
          return (
            <Card
              key={template.id}
              className={cn(
                "cursor-pointer transition-all hover:border-primary hover:shadow-md group",
                template.id === 'blank' && "border-dashed"
              )}
              onClick={() => onSelectTemplate(template)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{template.name}</CardTitle>
                    <CardDescription className="text-xs">
                      {template.blocks.length} blocks
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{template.description}</p>
                {template.blocks.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {template.blocks.slice(0, 4).map((block, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-0.5 bg-muted rounded"
                      >
                        {block.type}
                      </span>
                    ))}
                    {template.blocks.length > 4 && (
                      <span className="text-xs px-2 py-0.5 bg-muted rounded">
                        +{template.blocks.length - 4} more
                      </span>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PageTemplates;
