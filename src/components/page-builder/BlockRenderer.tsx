import React from 'react';
import { BlockInstance, BlockDefinition } from './types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Zap, Shield, Users, Clock, Award, ThumbsUp, Star,
  Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube,
  Quote, ArrowRight, Check
} from 'lucide-react';

interface BlockRendererProps {
  block: BlockInstance;
  definition: BlockDefinition;
  viewMode: 'desktop' | 'tablet' | 'mobile';
  isEditing?: boolean;
}

const iconMap: Record<string, React.ElementType> = {
  Zap, Shield, Users, Clock, Award, ThumbsUp, Star,
  Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube,
  Quote, ArrowRight, Check
};

const getIcon = (iconName: string) => {
  return iconMap[iconName] || Zap;
};

export const BlockRenderer: React.FC<BlockRendererProps> = ({ 
  block, 
  definition, 
  viewMode,
  isEditing 
}) => {
  const content = block.content;
  const styles = block.styles || {};

  // Helper to get height class
  const getHeightClass = (height: string) => {
    switch (height) {
      case 'sm': return 'min-h-[300px]';
      case 'md': return 'min-h-[400px]';
      case 'lg': return 'min-h-[500px]';
      case 'full': return 'min-h-screen';
      default: return 'min-h-[400px]';
    }
  };

  // Render based on block type
  switch (block.type) {
    // ========== HERO BLOCKS ==========
    case 'hero':
      return (
        <div 
          className={cn(
            "relative flex items-center justify-center bg-cover bg-center",
            getHeightClass(styles.height || 'lg')
          )}
          style={{ backgroundImage: content.backgroundImage ? `url(${content.backgroundImage})` : undefined }}
        >
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/50"
            style={{ opacity: (content.overlayOpacity || 50) / 100 }}
          />
          
          {/* Content */}
          <div className={cn(
            "relative z-10 text-center px-4 max-w-4xl mx-auto",
            styles.alignment === 'left' && 'text-left',
            styles.alignment === 'right' && 'text-right'
          )}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {content.title || 'Welcome'}
            </h1>
            {content.subtitle && (
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                {content.subtitle}
              </p>
            )}
            <div className="flex flex-wrap gap-4 justify-center">
              {content.ctaText && (
                <Button size="lg" className="text-lg px-8">
                  {content.ctaText}
                </Button>
              )}
              {content.secondaryCtaText && (
                <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent text-white border-white hover:bg-white hover:text-black">
                  {content.secondaryCtaText}
                </Button>
              )}
            </div>
          </div>
        </div>
      );

    case 'hero-split':
      const imageLeft = content.imagePosition === 'left';
      return (
        <div className="grid md:grid-cols-2 min-h-[500px]">
          {imageLeft && content.image && (
            <div className="bg-cover bg-center" style={{ backgroundImage: `url(${content.image})` }} />
          )}
          <div className="flex items-center p-8 md:p-12 lg:p-16" style={{ backgroundColor: styles.backgroundColor }}>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.title}</h2>
              {content.subtitle && (
                <p className="text-lg text-muted-foreground mb-6">{content.subtitle}</p>
              )}
              {content.ctaText && (
                <Button size="lg">{content.ctaText}</Button>
              )}
            </div>
          </div>
          {!imageLeft && content.image && (
            <div className="bg-cover bg-center" style={{ backgroundImage: `url(${content.image})` }} />
          )}
        </div>
      );

    // ========== FEATURES BLOCKS ==========
    case 'features-grid':
      const columns = content.columns || '3';
      const gridCols = columns === '2' ? 'md:grid-cols-2' : columns === '4' ? 'md:grid-cols-4' : 'md:grid-cols-3';
      return (
        <section className="py-16 px-4" style={{ backgroundColor: styles.backgroundColor }}>
          <div className="max-w-6xl mx-auto">
            {content.title && (
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.title}</h2>
                {content.subtitle && (
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{content.subtitle}</p>
                )}
              </div>
            )}
            <div className={cn("grid gap-8", gridCols)}>
              {(content.features || []).map((feature: any, index: number) => {
                const Icon = getIcon(feature.icon);
                return (
                  <Card key={index} className="text-center p-6">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      );

    case 'features-icons':
      return (
        <div className="py-8 border-y bg-muted/30">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {(content.features || []).map((feature: any, index: number) => {
                const Icon = getIcon(feature.icon);
                return (
                  <div key={index} className="flex items-center gap-2 text-muted-foreground">
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{feature.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );

    // ========== CTA BLOCKS ==========
    case 'cta-banner':
      return (
        <section 
          className="relative py-16 md:py-24 px-4 bg-cover bg-center"
          style={{ 
            backgroundImage: content.backgroundImage ? `url(${content.backgroundImage})` : undefined,
            backgroundColor: !content.backgroundImage ? (styles.backgroundColor || 'hsl(var(--primary))') : undefined
          }}
        >
          {content.backgroundImage && <div className="absolute inset-0 bg-black/50" />}
          <div className="relative max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{content.title}</h2>
            {content.subtitle && (
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">{content.subtitle}</p>
            )}
            {content.ctaText && (
              <Button size="lg" variant="secondary" className="text-lg px-8">
                {content.ctaText}
              </Button>
            )}
          </div>
        </section>
      );

    case 'cta-split':
      const ctaImageLeft = content.imagePosition === 'left';
      return (
        <div className="grid md:grid-cols-2 gap-8 p-8 items-center">
          {ctaImageLeft && content.image && (
            <img src={content.image} alt="" className="rounded-lg shadow-lg w-full h-80 object-cover" />
          )}
          <div className={cn(!ctaImageLeft && "order-first md:order-none")}>
            <h2 className="text-3xl font-bold mb-4">{content.title}</h2>
            {content.description && (
              <p className="text-lg text-muted-foreground mb-6">{content.description}</p>
            )}
            {content.ctaText && (
              <Button size="lg">{content.ctaText} <ArrowRight className="ml-2 w-5 h-5" /></Button>
            )}
          </div>
          {!ctaImageLeft && content.image && (
            <img src={content.image} alt="" className="rounded-lg shadow-lg w-full h-80 object-cover" />
          )}
        </div>
      );

    // ========== TESTIMONIALS ==========
    case 'testimonials-grid':
      return (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            {content.title && (
              <h2 className="text-3xl font-bold text-center mb-12">{content.title}</h2>
            )}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(content.testimonials || []).map((testimonial: any, index: number) => (
                <Card key={index} className="p-6">
                  <Quote className="w-8 h-8 text-primary/30 mb-4" />
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    {testimonial.avatar && (
                      <img src={testimonial.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                    )}
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      );

    // ========== TEAM ==========
    case 'team-grid':
      return (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            {content.title && (
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">{content.title}</h2>
                {content.subtitle && (
                  <p className="text-lg text-muted-foreground">{content.subtitle}</p>
                )}
              </div>
            )}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {(content.members || []).map((member: any, index: number) => (
                <Card key={index} className="overflow-hidden">
                  {member.image && (
                    <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
                  )}
                  <CardContent className="p-4 text-center">
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{member.role}</p>
                    {member.bio && (
                      <p className="text-sm text-muted-foreground line-clamp-3">{member.bio}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      );

    // ========== GALLERY ==========
    case 'gallery-grid':
      const galleryCols = content.columns === '2' ? 'md:grid-cols-2' : content.columns === '4' ? 'md:grid-cols-4' : 'md:grid-cols-3';
      return (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            {content.title && (
              <h2 className="text-3xl font-bold text-center mb-12">{content.title}</h2>
            )}
            <div className={cn("grid gap-4", galleryCols)}>
              {(content.images || []).map((image: any, index: number) => (
                <div key={index} className="relative group overflow-hidden rounded-lg">
                  <img 
                    src={image.src} 
                    alt={image.alt || ''} 
                    className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                  />
                  {image.caption && (
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-white text-center px-4">{image.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    // ========== PRICING ==========
    case 'pricing-table':
      return (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            {content.title && (
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">{content.title}</h2>
                {content.subtitle && (
                  <p className="text-lg text-muted-foreground">{content.subtitle}</p>
                )}
              </div>
            )}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(content.plans || []).map((plan: any, index: number) => (
                <Card key={index} className={cn("p-6 relative", plan.isPopular && "border-primary shadow-lg")}>
                  {plan.isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      Popular
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <div className="text-4xl font-bold">
                      {plan.price}
                      <span className="text-lg font-normal text-muted-foreground">{plan.period}</span>
                    </div>
                  </div>
                  {plan.description && (
                    <p className="text-muted-foreground text-center mb-6">{plan.description}</p>
                  )}
                  <ul className="space-y-3 mb-6">
                    {(plan.features || '').split(',').map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-primary" />
                        <span>{feature.trim()}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.isPopular ? 'default' : 'outline'}>
                    {plan.ctaText || 'Get Started'}
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>
      );

    // ========== CONTACT ==========
    case 'contact-form':
      return (
        <section className="py-16 px-4" style={{ backgroundColor: styles.backgroundColor }}>
          <div className="max-w-xl mx-auto">
            {content.title && (
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">{content.title}</h2>
                {content.subtitle && (
                  <p className="text-muted-foreground">{content.subtitle}</p>
                )}
              </div>
            )}
            <form className="space-y-4">
              <Input placeholder="Your Name" />
              <Input type="email" placeholder="Your Email" />
              <Input placeholder="Subject" />
              <textarea 
                className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Your Message"
              />
              <Button className="w-full">{content.submitText || 'Send Message'}</Button>
            </form>
          </div>
        </section>
      );

    case 'contact-split':
      return (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">{content.title}</h2>
              {content.description && (
                <p className="text-muted-foreground mb-8">{content.description}</p>
              )}
              <div className="space-y-4">
                {content.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <span>{content.email}</span>
                  </div>
                )}
                {content.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <span>{content.phone}</span>
                  </div>
                )}
                {content.address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-1" />
                    <span>{content.address}</span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <form className="space-y-4">
                <Input placeholder="Your Name" />
                <Input type="email" placeholder="Your Email" />
                <textarea 
                  className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="Your Message"
                />
                <Button className="w-full">Send Message</Button>
              </form>
            </div>
          </div>
        </section>
      );

    // ========== CONTENT ==========
    case 'faq-accordion':
      return (
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            {content.title && (
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">{content.title}</h2>
                {content.subtitle && (
                  <p className="text-muted-foreground">{content.subtitle}</p>
                )}
              </div>
            )}
            <Accordion type="single" collapsible className="w-full">
              {(content.faqs || []).map((faq: any, index: number) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      );

    case 'stats-counter':
      return (
        <section className="py-16 px-4" style={{ backgroundColor: styles.backgroundColor }}>
          <div className="max-w-6xl mx-auto">
            {content.title && (
              <h2 className="text-3xl font-bold text-center mb-12">{content.title}</h2>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {(content.stats || []).map((stat: any, index: number) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'logo-cloud':
      return (
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            {content.title && (
              <p className="text-center text-muted-foreground mb-8">{content.title}</p>
            )}
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              {(content.logos || []).map((logo: any, index: number) => (
                <img 
                  key={index} 
                  src={logo.image} 
                  alt={logo.name || ''} 
                  className="h-8 md:h-12 object-contain grayscale hover:grayscale-0 transition-all"
                />
              ))}
            </div>
          </div>
        </section>
      );

    case 'text-content':
      return (
        <section className={cn(
          "py-16 px-4",
          styles.maxWidth === 'sm' && 'max-w-2xl mx-auto',
          styles.maxWidth === 'md' && 'max-w-4xl mx-auto',
          styles.maxWidth === 'lg' && 'max-w-6xl mx-auto',
          styles.alignment === 'center' && 'text-center',
          styles.alignment === 'right' && 'text-right'
        )}>
          {content.title && <h2 className="text-3xl font-bold mb-6">{content.title}</h2>}
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: content.content || '' }}
          />
        </section>
      );

    case 'image-text':
      const imgTextLeft = content.imagePosition === 'left';
      return (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            {imgTextLeft && content.image && (
              <img src={content.image} alt="" className="rounded-lg shadow-lg w-full h-80 object-cover" />
            )}
            <div className={cn(!imgTextLeft && "order-first md:order-none")}>
              {content.title && <h2 className="text-3xl font-bold mb-4">{content.title}</h2>}
              {content.content && <p className="text-muted-foreground mb-6">{content.content}</p>}
              {content.ctaText && (
                <Button>{content.ctaText}</Button>
              )}
            </div>
            {!imgTextLeft && content.image && (
              <img src={content.image} alt="" className="rounded-lg shadow-lg w-full h-80 object-cover" />
            )}
          </div>
        </section>
      );

    case 'video-embed':
      return (
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            {content.title && (
              <h2 className="text-3xl font-bold text-center mb-8">{content.title}</h2>
            )}
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              {content.videoUrl ? (
                <iframe
                  className="w-full h-full"
                  src={content.videoUrl.replace('watch?v=', 'embed/')}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  Add a video URL to display
                </div>
              )}
            </div>
            {content.caption && (
              <p className="text-center text-muted-foreground mt-4">{content.caption}</p>
            )}
          </div>
        </section>
      );

    // ========== LAYOUT ==========
    case 'divider':
      return (
        <div className="py-8 px-4">
          <div 
            className={cn(
              "max-w-6xl mx-auto border-t",
              content.style === 'dashed' && 'border-dashed',
              content.style === 'dotted' && 'border-dotted',
              content.style === 'gradient' && 'border-0 h-px bg-gradient-to-r from-transparent via-border to-transparent'
            )}
            style={{ borderColor: styles.color }}
          />
        </div>
      );

    case 'spacer':
      const spacerHeight = content.height === 'sm' ? 'h-8' : content.height === 'lg' ? 'h-24' : content.height === 'xl' ? 'h-32' : 'h-16';
      return <div className={spacerHeight} />;

    case 'newsletter':
      return (
        <section className="py-16 px-4" style={{ backgroundColor: styles.backgroundColor }}>
          <div className="max-w-xl mx-auto text-center">
            {content.title && <h2 className="text-3xl font-bold mb-4">{content.title}</h2>}
            {content.subtitle && <p className="text-muted-foreground mb-8">{content.subtitle}</p>}
            <form className="flex gap-2 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder={content.placeholder || 'Enter your email'} 
                className="flex-1"
              />
              <Button>{content.buttonText || 'Subscribe'}</Button>
            </form>
          </div>
        </section>
      );

    // ========== NAVIGATION (simplified preview) ==========
    case 'header':
      return (
        <header className="py-4 px-6 border-b" style={{ backgroundColor: styles.backgroundColor }}>
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              {content.logo && <img src={content.logo} alt="" className="h-8" />}
              {content.logoText && <span className="font-bold text-xl">{content.logoText}</span>}
            </div>
            <nav className="hidden md:flex items-center gap-6">
              {(content.links || []).map((link: any, index: number) => (
                <a key={index} href={link.url} className="text-sm hover:text-primary transition-colors">
                  {link.label}
                </a>
              ))}
            </nav>
            {content.ctaText && <Button>{content.ctaText}</Button>}
          </div>
        </header>
      );

    case 'footer':
      return (
        <footer className="py-12 px-6" style={{ backgroundColor: styles.backgroundColor || 'hsl(var(--muted))' }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                {content.logo && <img src={content.logo} alt="" className="h-8 mb-4" />}
                {content.description && <p className="text-sm text-muted-foreground">{content.description}</p>}
              </div>
              {(content.columns || []).map((col: any, index: number) => (
                <div key={index}>
                  <h4 className="font-semibold mb-4">{col.title}</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {(col.links || '').split('\n').map((link: string, idx: number) => {
                      const [label, url] = link.split('|');
                      return label ? (
                        <li key={idx}>
                          <a href={url?.trim() || '#'} className="hover:text-foreground transition-colors">
                            {label.trim()}
                          </a>
                        </li>
                      ) : null;
                    })}
                  </ul>
                </div>
              ))}
            </div>
            <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">{content.copyright}</p>
              <div className="flex gap-4">
                {(content.socialLinks || []).map((social: any, index: number) => {
                  const Icon = iconMap[social.platform?.charAt(0).toUpperCase() + social.platform?.slice(1)] || Facebook;
                  return (
                    <a key={index} href={social.url} className="text-muted-foreground hover:text-foreground transition-colors">
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </footer>
      );

    default:
      return (
        <div className="p-8 text-center bg-muted/50 rounded-lg">
          <p className="text-muted-foreground">Block type "{block.type}" preview not available</p>
        </div>
      );
  }
};
