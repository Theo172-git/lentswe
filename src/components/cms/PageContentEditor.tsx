import { useState, useEffect } from "react";
import { useCmsContent, CMS_PAGES, PageConfig, PageSection, SectionField } from "@/hooks/use-cms";
import { CmsMedia } from "@/hooks/use-cms";
import { MediaPicker } from "./MediaLibrary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Save,
  Eye,
  Loader2,
  FileText,
  Image as ImageIcon,
  X,
  ChevronRight,
  Globe,
  Check,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface PageContentEditorProps {
  className?: string;
}

export function PageContentEditor({ className }: PageContentEditorProps) {
  const { content, loading, saving, getPageContent, saveContent, publishPage } = useCmsContent();
  const [selectedPage, setSelectedPage] = useState<PageConfig | null>(CMS_PAGES[0]);
  const [formData, setFormData] = useState<Record<string, Record<string, any>>>({});
  const [hasChanges, setHasChanges] = useState(false);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [mediaPickerField, setMediaPickerField] = useState<{ section: string; field: string } | null>(null);
  const [openSections, setOpenSections] = useState<string[]>([]);

  // Load content when page changes
  useEffect(() => {
    if (selectedPage) {
      const pageData: Record<string, Record<string, any>> = {};
      selectedPage.sections.forEach((section) => {
        pageData[section.key] = getPageContent(selectedPage.slug, section.key);
      });
      setFormData(pageData);
      setHasChanges(false);
      // Open all sections by default
      setOpenSections(selectedPage.sections.map((s) => s.key));
    }
  }, [selectedPage, content, getPageContent]);

  const handleFieldChange = (sectionKey: string, fieldKey: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        [fieldKey]: value,
      },
    }));
    setHasChanges(true);
  };

  const handleSaveSection = async (sectionKey: string, publish: boolean = false) => {
    if (!selectedPage) return;
    await saveContent(selectedPage.slug, sectionKey, formData[sectionKey] || {}, publish);
    setHasChanges(false);
  };

  const handleSaveAllSections = async (publish: boolean = false) => {
    if (!selectedPage) return;
    
    let success = true;
    for (const section of selectedPage.sections) {
      const result = await saveContent(
        selectedPage.slug,
        section.key,
        formData[section.key] || {},
        publish
      );
      if (!result) success = false;
    }
    
    if (success) {
      setHasChanges(false);
      toast.success(publish ? "All sections published!" : "All sections saved!");
    }
  };

  const handlePublishPage = async () => {
    if (!selectedPage) return;
    await handleSaveAllSections(true);
  };

  const openMediaPicker = (sectionKey: string, fieldKey: string) => {
    setMediaPickerField({ section: sectionKey, field: fieldKey });
    setMediaPickerOpen(true);
  };

  const handleMediaSelect = (media: CmsMedia) => {
    if (mediaPickerField) {
      handleFieldChange(mediaPickerField.section, mediaPickerField.field, media.file_url);
    }
    setMediaPickerOpen(false);
    setMediaPickerField(null);
  };

  const getPagePublishStatus = (pageSlug: string): { published: boolean; lastPublished?: string } => {
    const pageContent = content.filter((c) => c.page_slug === pageSlug);
    const allPublished = pageContent.length > 0 && pageContent.every((c) => c.is_published);
    const lastPublished = pageContent
      .filter((c) => c.published_at)
      .sort((a, b) => new Date(b.published_at!).getTime() - new Date(a.published_at!).getTime())[0]?.published_at;
    
    return { published: allPublished, lastPublished };
  };

  const renderField = (section: PageSection, field: SectionField) => {
    const value = formData[section.key]?.[field.key] ?? "";

    switch (field.type) {
      case "text":
        return (
          <Input
            value={value}
            onChange={(e) => handleFieldChange(section.key, field.key, e.target.value)}
            placeholder={field.placeholder}
            maxLength={field.maxLength}
          />
        );

      case "textarea":
      case "richtext":
        return (
          <Textarea
            value={value}
            onChange={(e) => handleFieldChange(section.key, field.key, e.target.value)}
            placeholder={field.placeholder}
            rows={field.type === "richtext" ? 6 : 3}
            className="resize-y"
          />
        );

      case "image":
        return (
          <div className="space-y-2">
            {value ? (
              <div className="relative group">
                <img
                  src={value}
                  alt="Selected"
                  className="w-full max-h-40 object-cover rounded-lg border"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => openMediaPicker(section.key, field.key)}
                  >
                    Change
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleFieldChange(section.key, field.key, "")}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                variant="outline"
                className="w-full h-24 border-dashed"
                onClick={() => openMediaPicker(section.key, field.key)}
              >
                <ImageIcon className="w-5 h-5 mr-2" />
                Select Image
              </Button>
            )}
            <Input
              value={value}
              onChange={(e) => handleFieldChange(section.key, field.key, e.target.value)}
              placeholder="Or paste image URL"
              className="text-xs"
            />
          </div>
        );

      case "url":
        return (
          <Input
            type="url"
            value={value}
            onChange={(e) => handleFieldChange(section.key, field.key, e.target.value)}
            placeholder={field.placeholder || "https://..."}
          />
        );

      case "number":
        return (
          <Input
            type="number"
            value={value}
            onChange={(e) => handleFieldChange(section.key, field.key, e.target.value)}
            placeholder={field.placeholder}
          />
        );

      case "boolean":
        return (
          <div className="flex items-center gap-2">
            <Switch
              checked={!!value}
              onCheckedChange={(checked) => handleFieldChange(section.key, field.key, checked)}
            />
            <span className="text-sm text-muted-foreground">
              {value ? "Enabled" : "Disabled"}
            </span>
          </div>
        );

      case "color":
        return (
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={value || "#000000"}
              onChange={(e) => handleFieldChange(section.key, field.key, e.target.value)}
              className="w-10 h-10 rounded border cursor-pointer"
            />
            <Input
              value={value}
              onChange={(e) => handleFieldChange(section.key, field.key, e.target.value)}
              placeholder="#000000"
              className="flex-1"
            />
          </div>
        );

      default:
        return (
          <Input
            value={value}
            onChange={(e) => handleFieldChange(section.key, field.key, e.target.value)}
            placeholder={field.placeholder}
          />
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className={cn("flex gap-6", className)}>
      {/* Page Sidebar */}
      <div className="w-64 shrink-0 space-y-2">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-4">
          Pages
        </h3>
        {CMS_PAGES.map((page) => {
          const status = getPagePublishStatus(page.slug);
          return (
            <button
              key={page.slug}
              onClick={() => setSelectedPage(page)}
              className={cn(
                "w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors",
                selectedPage?.slug === page.slug
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span className="font-medium">{page.label}</span>
              </div>
              {status.published ? (
                <Globe className="w-4 h-4 text-emerald-500" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Content Editor */}
      <div className="flex-1 min-w-0">
        {selectedPage ? (
          <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between pb-4 border-b">
              <div>
                <h2 className="text-2xl font-bold">{selectedPage.label}</h2>
                <p className="text-sm text-muted-foreground">
                  Edit content for the {selectedPage.label.toLowerCase()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {hasChanges && (
                  <span className="text-sm text-amber-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    Unsaved changes
                  </span>
                )}
                <Button
                  variant="outline"
                  onClick={() => handleSaveAllSections(false)}
                  disabled={saving || !hasChanges}
                >
                  {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  Save Draft
                </Button>
                <Button
                  onClick={handlePublishPage}
                  disabled={saving}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Globe className="w-4 h-4 mr-2" />}
                  Publish
                </Button>
              </div>
            </div>

            {/* Sections Accordion */}
            <Accordion
              type="multiple"
              value={openSections}
              onValueChange={setOpenSections}
              className="space-y-4"
            >
              {selectedPage.sections.map((section) => {
                const sectionContent = content.find(
                  (c) => c.page_slug === selectedPage.slug && c.section_key === section.key
                );
                
                return (
                  <AccordionItem
                    key={section.key}
                    value={section.key}
                    className="border rounded-lg px-4"
                  >
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold">{section.label}</span>
                        {sectionContent?.is_published ? (
                          <span className="text-xs bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            Published
                          </span>
                        ) : sectionContent ? (
                          <span className="text-xs bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-full">
                            Draft
                          </span>
                        ) : (
                          <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                            Empty
                          </span>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                      <div className="space-y-4 pt-2">
                        {section.fields.map((field) => (
                          <div key={field.key} className="space-y-1.5">
                            <label className="text-sm font-medium flex items-center gap-1">
                              {field.label}
                              {field.required && <span className="text-destructive">*</span>}
                            </label>
                            {renderField(section, field)}
                          </div>
                        ))}
                        
                        <div className="flex justify-end gap-2 pt-4 border-t mt-6">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSaveSection(section.key, false)}
                            disabled={saving}
                          >
                            <Save className="w-4 h-4 mr-1" />
                            Save Section
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleSaveSection(section.key, true)}
                            disabled={saving}
                            className="bg-emerald-600 hover:bg-emerald-700"
                          >
                            <Globe className="w-4 h-4 mr-1" />
                            Publish Section
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        ) : (
          <div className="flex items-center justify-center py-12 text-muted-foreground">
            Select a page to edit
          </div>
        )}
      </div>

      {/* Media Picker Dialog */}
      <MediaPicker
        open={mediaPickerOpen}
        onOpenChange={setMediaPickerOpen}
        onSelect={handleMediaSelect}
      />
    </div>
  );
}
