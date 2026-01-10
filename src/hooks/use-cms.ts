import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Types
export interface CmsMedia {
  id: string;
  filename: string;
  original_filename: string;
  file_path: string;
  file_url: string;
  file_size: number;
  mime_type: string;
  alt_text: string | null;
  caption: string | null;
  tags: string[] | null;
  uploaded_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface CmsPageContent {
  id: string;
  page_slug: string;
  section_key: string;
  content: Record<string, any>;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  updated_by: string | null;
}

export interface CmsSiteSetting {
  id: string;
  setting_key: string;
  setting_value: any;
  setting_type: string;
  category: string;
  label: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

// CMS Page/Section Configuration
export interface PageSection {
  key: string;
  label: string;
  fields: SectionField[];
}

export interface SectionField {
  key: string;
  label: string;
  type: "text" | "textarea" | "richtext" | "image" | "images" | "color" | "url" | "number" | "boolean" | "array";
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
}

export interface PageConfig {
  slug: string;
  label: string;
  icon?: string;
  sections: PageSection[];
}

// CMS Pages Configuration
export const CMS_PAGES: PageConfig[] = [
  {
    slug: "home",
    label: "Home Page",
    sections: [
      {
        key: "hero",
        label: "Hero Section",
        fields: [
          { key: "badge_text", label: "Badge Text", type: "text", placeholder: "e.g., Industry Leader" },
          { key: "title", label: "Main Title", type: "text", placeholder: "Main headline", required: true },
          { key: "subtitle", label: "Subtitle", type: "textarea", placeholder: "Supporting text" },
          { key: "cta_primary_text", label: "Primary Button Text", type: "text", placeholder: "e.g., Get Started" },
          { key: "cta_primary_url", label: "Primary Button URL", type: "url", placeholder: "/products" },
          { key: "cta_secondary_text", label: "Secondary Button Text", type: "text" },
          { key: "cta_secondary_url", label: "Secondary Button URL", type: "url" },
          { key: "background_image", label: "Background Image", type: "image" },
        ],
      },
      {
        key: "stats",
        label: "Statistics",
        fields: [
          { key: "stat_1_value", label: "Stat 1 Value", type: "text", placeholder: "e.g., 500+" },
          { key: "stat_1_label", label: "Stat 1 Label", type: "text", placeholder: "e.g., Happy Clients" },
          { key: "stat_2_value", label: "Stat 2 Value", type: "text" },
          { key: "stat_2_label", label: "Stat 2 Label", type: "text" },
          { key: "stat_3_value", label: "Stat 3 Value", type: "text" },
          { key: "stat_3_label", label: "Stat 3 Label", type: "text" },
          { key: "stat_4_value", label: "Stat 4 Value", type: "text" },
          { key: "stat_4_label", label: "Stat 4 Label", type: "text" },
        ],
      },
      {
        key: "services_preview",
        label: "Services Preview",
        fields: [
          { key: "title", label: "Section Title", type: "text" },
          { key: "subtitle", label: "Section Subtitle", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ],
      },
      {
        key: "partners",
        label: "Partners Section",
        fields: [
          { key: "title", label: "Section Title", type: "text" },
          { key: "subtitle", label: "Subtitle", type: "text" },
          { key: "partner_logos", label: "Partner Logos", type: "images" },
        ],
      },
    ],
  },
  {
    slug: "about",
    label: "About Page",
    sections: [
      {
        key: "hero",
        label: "Hero Banner",
        fields: [
          { key: "title", label: "Page Title", type: "text", required: true },
          { key: "subtitle", label: "Subtitle", type: "textarea" },
          { key: "background_image", label: "Background Image", type: "image" },
        ],
      },
      {
        key: "story",
        label: "Our Story",
        fields: [
          { key: "title", label: "Section Title", type: "text" },
          { key: "content", label: "Story Content", type: "richtext" },
          { key: "image", label: "Story Image", type: "image" },
        ],
      },
      {
        key: "mission",
        label: "Mission & Vision",
        fields: [
          { key: "mission_title", label: "Mission Title", type: "text" },
          { key: "mission_text", label: "Mission Statement", type: "textarea" },
          { key: "vision_title", label: "Vision Title", type: "text" },
          { key: "vision_text", label: "Vision Statement", type: "textarea" },
        ],
      },
      {
        key: "values",
        label: "Core Values",
        fields: [
          { key: "title", label: "Section Title", type: "text" },
          { key: "values_list", label: "Values (one per line)", type: "textarea" },
        ],
      },
    ],
  },
  {
    slug: "services",
    label: "Services Page",
    sections: [
      {
        key: "hero",
        label: "Hero Banner",
        fields: [
          { key: "title", label: "Page Title", type: "text", required: true },
          { key: "subtitle", label: "Subtitle", type: "textarea" },
          { key: "background_image", label: "Background Image", type: "image" },
        ],
      },
      {
        key: "intro",
        label: "Introduction",
        fields: [
          { key: "title", label: "Section Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ],
      },
    ],
  },
  {
    slug: "products",
    label: "Products Page",
    sections: [
      {
        key: "hero",
        label: "Hero Banner",
        fields: [
          { key: "title", label: "Page Title", type: "text", required: true },
          { key: "subtitle", label: "Subtitle", type: "textarea" },
          { key: "background_image", label: "Background Image", type: "image" },
        ],
      },
      {
        key: "intro",
        label: "Introduction",
        fields: [
          { key: "title", label: "Section Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ],
      },
    ],
  },
  {
    slug: "team",
    label: "Team Page",
    sections: [
      {
        key: "hero",
        label: "Hero Banner",
        fields: [
          { key: "title", label: "Page Title", type: "text", required: true },
          { key: "subtitle", label: "Subtitle", type: "textarea" },
        ],
      },
      {
        key: "intro",
        label: "Introduction",
        fields: [
          { key: "title", label: "Section Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ],
      },
    ],
  },
  {
    slug: "contact",
    label: "Contact Page",
    sections: [
      {
        key: "hero",
        label: "Hero Banner",
        fields: [
          { key: "title", label: "Page Title", type: "text", required: true },
          { key: "subtitle", label: "Subtitle", type: "textarea" },
        ],
      },
      {
        key: "form",
        label: "Contact Form",
        fields: [
          { key: "form_title", label: "Form Title", type: "text" },
          { key: "form_description", label: "Form Description", type: "textarea" },
          { key: "success_message", label: "Success Message", type: "text" },
        ],
      },
    ],
  },
];

// Hook for CMS Media Library
export function useCmsMedia() {
  const [media, setMedia] = useState<CmsMedia[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMedia = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("cms_media")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMedia((data as CmsMedia[]) || []);
    } catch (error: any) {
      console.error("Error fetching media:", error);
      toast.error("Failed to load media library");
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadMedia = async (file: File): Promise<CmsMedia | null> => {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from("cms-media")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("cms-media")
        .getPublicUrl(filePath);

      // Save to database
      const { data, error } = await supabase
        .from("cms_media")
        .insert({
          filename: fileName,
          original_filename: file.name,
          file_path: filePath,
          file_url: urlData.publicUrl,
          file_size: file.size,
          mime_type: file.type,
        })
        .select()
        .single();

      if (error) throw error;

      toast.success("Image uploaded successfully");
      await fetchMedia();
      return data as CmsMedia;
    } catch (error: any) {
      console.error("Error uploading:", error);
      toast.error(error.message || "Failed to upload image");
      return null;
    }
  };

  const deleteMedia = async (mediaItem: CmsMedia): Promise<boolean> => {
    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from("cms-media")
        .remove([mediaItem.file_path]);

      if (storageError) throw storageError;

      // Delete from database
      const { error } = await supabase
        .from("cms_media")
        .delete()
        .eq("id", mediaItem.id);

      if (error) throw error;

      toast.success("Media deleted");
      await fetchMedia();
      return true;
    } catch (error: any) {
      console.error("Error deleting:", error);
      toast.error("Failed to delete media");
      return false;
    }
  };

  const updateMedia = async (id: string, updates: Partial<CmsMedia>): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from("cms_media")
        .update(updates)
        .eq("id", id);

      if (error) throw error;
      toast.success("Media updated");
      await fetchMedia();
      return true;
    } catch (error: any) {
      console.error("Error updating:", error);
      toast.error("Failed to update media");
      return false;
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  return { media, loading, fetchMedia, uploadMedia, deleteMedia, updateMedia };
}

// Hook for CMS Page Content
export function useCmsContent() {
  const [content, setContent] = useState<CmsPageContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchContent = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("cms_page_content")
        .select("*")
        .order("page_slug");

      if (error) throw error;
      setContent((data as CmsPageContent[]) || []);
    } catch (error: any) {
      console.error("Error fetching content:", error);
      toast.error("Failed to load page content");
    } finally {
      setLoading(false);
    }
  }, []);

  const getPageContent = useCallback(
    (pageSlug: string, sectionKey: string): Record<string, any> => {
      const item = content.find(
        (c) => c.page_slug === pageSlug && c.section_key === sectionKey
      );
      return item?.content || {};
    },
    [content]
  );

  const saveContent = async (
    pageSlug: string,
    sectionKey: string,
    newContent: Record<string, any>,
    publish: boolean = false
  ): Promise<boolean> => {
    setSaving(true);
    try {
      const existing = content.find(
        (c) => c.page_slug === pageSlug && c.section_key === sectionKey
      );

      const updateData = {
        page_slug: pageSlug,
        section_key: sectionKey,
        content: newContent,
        is_published: publish,
        published_at: publish ? new Date().toISOString() : existing?.published_at,
      };

      if (existing) {
        const { error } = await supabase
          .from("cms_page_content")
          .update(updateData)
          .eq("id", existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("cms_page_content")
          .insert(updateData);
        if (error) throw error;
      }

      toast.success(publish ? "Content published!" : "Content saved as draft");
      await fetchContent();
      return true;
    } catch (error: any) {
      console.error("Error saving content:", error);
      toast.error("Failed to save content");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const publishPage = async (pageSlug: string): Promise<boolean> => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("cms_page_content")
        .update({ is_published: true, published_at: new Date().toISOString() })
        .eq("page_slug", pageSlug);

      if (error) throw error;
      toast.success("Page published!");
      await fetchContent();
      return true;
    } catch (error: any) {
      console.error("Error publishing:", error);
      toast.error("Failed to publish page");
      return false;
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return { content, loading, saving, fetchContent, getPageContent, saveContent, publishPage };
}

// Hook for CMS Site Settings
export function useCmsSettings() {
  const [settings, setSettings] = useState<CmsSiteSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("cms_site_settings")
        .select("*")
        .order("category");

      if (error) throw error;
      setSettings((data as CmsSiteSetting[]) || []);
    } catch (error: any) {
      console.error("Error fetching settings:", error);
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  }, []);

  const getSetting = useCallback(
    (key: string): any => {
      const setting = settings.find((s) => s.setting_key === key);
      return setting?.setting_value;
    },
    [settings]
  );

  const updateSetting = async (key: string, value: any): Promise<boolean> => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("cms_site_settings")
        .update({ setting_value: value })
        .eq("setting_key", key);

      if (error) throw error;
      await fetchSettings();
      return true;
    } catch (error: any) {
      console.error("Error updating setting:", error);
      toast.error("Failed to update setting");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const saveAllSettings = async (updates: Record<string, any>): Promise<boolean> => {
    setSaving(true);
    try {
      const promises = Object.entries(updates).map(([key, value]) =>
        supabase.from("cms_site_settings").update({ setting_value: value }).eq("setting_key", key)
      );

      const results = await Promise.all(promises);
      const hasError = results.some((r) => r.error);

      if (hasError) throw new Error("Some settings failed to save");

      toast.success("Settings saved!");
      await fetchSettings();
      return true;
    } catch (error: any) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const addSetting = async (setting: Omit<CmsSiteSetting, "id" | "created_at" | "updated_at">): Promise<boolean> => {
    try {
      const { error } = await supabase.from("cms_site_settings").insert(setting);
      if (error) throw error;
      toast.success("Setting added");
      await fetchSettings();
      return true;
    } catch (error: any) {
      console.error("Error adding setting:", error);
      toast.error("Failed to add setting");
      return false;
    }
  };

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return { settings, loading, saving, fetchSettings, getSetting, updateSetting, saveAllSettings, addSetting };
}
