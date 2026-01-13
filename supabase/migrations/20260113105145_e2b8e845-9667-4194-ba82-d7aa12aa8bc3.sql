-- Create builder_pages table for storing page builder pages
CREATE TABLE public.builder_pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  blocks JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.builder_pages ENABLE ROW LEVEL SECURITY;

-- Create policies - admins can manage pages
CREATE POLICY "Admins can manage builder pages"
ON public.builder_pages
FOR ALL
USING (EXISTS (
  SELECT 1 FROM public.user_roles
  WHERE user_roles.user_id = auth.uid()
  AND user_roles.role = 'admin'
));

-- Published pages are publicly viewable
CREATE POLICY "Anyone can view published pages"
ON public.builder_pages
FOR SELECT
USING (is_published = true);

-- Create trigger for updated_at
CREATE TRIGGER update_builder_pages_updated_at
BEFORE UPDATE ON public.builder_pages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for slug lookups
CREATE INDEX idx_builder_pages_slug ON public.builder_pages(slug);
CREATE INDEX idx_builder_pages_published ON public.builder_pages(is_published);