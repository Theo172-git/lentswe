-- Create storage bucket for CMS media library
INSERT INTO storage.buckets (id, name, public) VALUES ('cms-media', 'cms-media', true);

-- Create storage policies for cms-media bucket
CREATE POLICY "Admins can upload media" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'cms-media' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update media" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'cms-media' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete media" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'cms-media' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view cms media" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'cms-media');

-- Create CMS media library table
CREATE TABLE public.cms_media (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  filename TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  mime_type TEXT NOT NULL,
  alt_text TEXT,
  caption TEXT,
  tags TEXT[],
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.cms_media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage media" ON public.cms_media FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Anyone can view media" ON public.cms_media FOR SELECT USING (true);

-- Create CMS page content table
CREATE TABLE public.cms_page_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_slug TEXT NOT NULL,
  section_key TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}',
  is_published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id),
  UNIQUE(page_slug, section_key)
);

ALTER TABLE public.cms_page_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage page content" ON public.cms_page_content FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Anyone can view published content" ON public.cms_page_content FOR SELECT USING (is_published = true);

-- Create CMS site settings table
CREATE TABLE public.cms_site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value JSONB NOT NULL DEFAULT '{}',
  setting_type TEXT NOT NULL DEFAULT 'text',
  category TEXT NOT NULL DEFAULT 'general',
  label TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.cms_site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage settings" ON public.cms_site_settings FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Anyone can view settings" ON public.cms_site_settings FOR SELECT USING (true);

-- Insert default site settings
INSERT INTO public.cms_site_settings (setting_key, setting_value, setting_type, category, label, description) VALUES
  ('site_name', '"Lentswe Holdings"', 'text', 'general', 'Site Name', 'The name of your website'),
  ('site_tagline', '"Material Handling Solutions"', 'text', 'general', 'Site Tagline', 'Short description of your business'),
  ('contact_email', '"Info@Lentsweholding.com"', 'email', 'contact', 'Primary Email', 'Main contact email'),
  ('accounts_email', '"Accounts@Lentsweholding.com"', 'email', 'contact', 'Accounts Email', 'Accounts department email'),
  ('contact_phone', '"+27 12 345 6789"', 'phone', 'contact', 'Phone Number', 'Primary contact number'),
  ('contact_address', '"Geelhoutpark, Rustenburg"', 'textarea', 'contact', 'Address', 'Physical address'),
  ('social_facebook', '""', 'url', 'social', 'Facebook URL', 'Facebook page link'),
  ('social_linkedin', '""', 'url', 'social', 'LinkedIn URL', 'LinkedIn company page'),
  ('social_instagram', '""', 'url', 'social', 'Instagram URL', 'Instagram profile link'),
  ('primary_color', '"#f97316"', 'color', 'branding', 'Primary Color', 'Main brand color'),
  ('secondary_color', '"#1e3a5f"', 'color', 'branding', 'Secondary Color', 'Secondary brand color');

-- Create triggers for updated_at
CREATE TRIGGER update_cms_media_updated_at BEFORE UPDATE ON public.cms_media FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_cms_page_content_updated_at BEFORE UPDATE ON public.cms_page_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_cms_site_settings_updated_at BEFORE UPDATE ON public.cms_site_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();