import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BlockInstance } from '@/components/page-builder/types';
import { toast } from 'sonner';

export interface BuilderPage {
  id: string;
  title: string;
  slug: string;
  blocks: BlockInstance[];
  is_published: boolean;
  published_at: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export const useBuilderPages = () => {
  const [pages, setPages] = useState<BuilderPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchPages = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('builder_pages')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;

      // Parse blocks from JSON
      const parsedPages = (data || []).map(page => ({
        ...page,
        blocks: (page.blocks as unknown as BlockInstance[]) || []
      }));

      setPages(parsedPages);
    } catch (error) {
      console.error('Error fetching pages:', error);
      toast.error('Failed to load pages');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  const createPage = async (title: string, slug: string): Promise<BuilderPage | null> => {
    try {
      setSaving(true);
      const { data: userData } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('builder_pages')
        .insert({
          title,
          slug,
          blocks: [],
          created_by: userData.user?.id
        })
        .select()
        .single();

      if (error) throw error;

      const newPage: BuilderPage = {
        ...data,
        blocks: []
      };

      setPages(prev => [newPage, ...prev]);
      toast.success('Page created');
      return newPage;
    } catch (error: any) {
      console.error('Error creating page:', error);
      if (error.code === '23505') {
        toast.error('A page with this slug already exists');
      } else {
        toast.error('Failed to create page');
      }
      return null;
    } finally {
      setSaving(false);
    }
  };

  const updatePage = async (id: string, updates: Partial<BuilderPage>): Promise<boolean> => {
    try {
      setSaving(true);
      
      const updateData: any = { ...updates };
      if (updates.blocks) {
        updateData.blocks = updates.blocks;
      }

      const { error } = await supabase
        .from('builder_pages')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;

      setPages(prev => prev.map(page => 
        page.id === id ? { ...page, ...updates } : page
      ));

      return true;
    } catch (error) {
      console.error('Error updating page:', error);
      toast.error('Failed to save page');
      return false;
    } finally {
      setSaving(false);
    }
  };

  const savePage = async (id: string, blocks: BlockInstance[]): Promise<boolean> => {
    return updatePage(id, { blocks });
  };

  const publishPage = async (id: string): Promise<boolean> => {
    try {
      setSaving(true);
      const { error } = await supabase
        .from('builder_pages')
        .update({
          is_published: true,
          published_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      setPages(prev => prev.map(page => 
        page.id === id ? { ...page, is_published: true, published_at: new Date().toISOString() } : page
      ));

      toast.success('Page published');
      return true;
    } catch (error) {
      console.error('Error publishing page:', error);
      toast.error('Failed to publish page');
      return false;
    } finally {
      setSaving(false);
    }
  };

  const unpublishPage = async (id: string): Promise<boolean> => {
    try {
      setSaving(true);
      const { error } = await supabase
        .from('builder_pages')
        .update({ is_published: false })
        .eq('id', id);

      if (error) throw error;

      setPages(prev => prev.map(page => 
        page.id === id ? { ...page, is_published: false } : page
      ));

      toast.success('Page unpublished');
      return true;
    } catch (error) {
      console.error('Error unpublishing page:', error);
      toast.error('Failed to unpublish page');
      return false;
    } finally {
      setSaving(false);
    }
  };

  const deletePage = async (id: string): Promise<boolean> => {
    try {
      setSaving(true);
      const { error } = await supabase
        .from('builder_pages')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setPages(prev => prev.filter(page => page.id !== id));
      toast.success('Page deleted');
      return true;
    } catch (error) {
      console.error('Error deleting page:', error);
      toast.error('Failed to delete page');
      return false;
    } finally {
      setSaving(false);
    }
  };

  const getPage = (id: string): BuilderPage | undefined => {
    return pages.find(page => page.id === id);
  };

  const getPageBySlug = async (slug: string): Promise<BuilderPage | null> => {
    try {
      const { data, error } = await supabase
        .from('builder_pages')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

      if (error) throw error;

      return {
        ...data,
        blocks: (data.blocks as unknown as BlockInstance[]) || []
      };
    } catch (error) {
      console.error('Error fetching page by slug:', error);
      return null;
    }
  };

  return {
    pages,
    loading,
    saving,
    fetchPages,
    createPage,
    updatePage,
    savePage,
    publishPage,
    unpublishPage,
    deletePage,
    getPage,
    getPageBySlug
  };
};