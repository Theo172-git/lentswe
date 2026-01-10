import { useState, useEffect } from "react";
import { useCmsSettings, CmsSiteSetting } from "@/hooks/use-cms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Loader2, Settings, Mail, Globe, Palette, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface SiteSettingsEditorProps {
  className?: string;
}

const CATEGORY_INFO: Record<string, { icon: React.ReactNode; label: string; description: string }> = {
  general: {
    icon: <Settings className="w-4 h-4" />,
    label: "General",
    description: "Basic site information",
  },
  contact: {
    icon: <Mail className="w-4 h-4" />,
    label: "Contact",
    description: "Contact details and addresses",
  },
  social: {
    icon: <Globe className="w-4 h-4" />,
    label: "Social Media",
    description: "Social media links",
  },
  branding: {
    icon: <Palette className="w-4 h-4" />,
    label: "Branding",
    description: "Colors and visual identity",
  },
};

export function SiteSettingsEditor({ className }: SiteSettingsEditorProps) {
  const { settings, loading, saving, saveAllSettings, addSetting } = useCmsSettings();
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [hasChanges, setHasChanges] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newSetting, setNewSetting] = useState({
    setting_key: "",
    label: "",
    description: "",
    setting_type: "text",
    category: "general",
    setting_value: "",
  });

  // Group settings by category
  const groupedSettings = settings.reduce((acc, setting) => {
    const category = setting.category || "general";
    if (!acc[category]) acc[category] = [];
    acc[category].push(setting);
    return acc;
  }, {} as Record<string, CmsSiteSetting[]>);

  const categories = Object.keys(groupedSettings);

  // Load settings into form
  useEffect(() => {
    const data: Record<string, any> = {};
    settings.forEach((setting) => {
      data[setting.setting_key] = setting.setting_value;
    });
    setFormData(data);
    setHasChanges(false);
  }, [settings]);

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    await saveAllSettings(formData);
    setHasChanges(false);
  };

  const handleAddSetting = async () => {
    if (!newSetting.setting_key || !newSetting.label) {
      toast.error("Key and label are required");
      return;
    }

    await addSetting({
      setting_key: newSetting.setting_key,
      label: newSetting.label,
      description: newSetting.description,
      setting_type: newSetting.setting_type,
      category: newSetting.category,
      setting_value: newSetting.setting_value || "",
    });

    setAddDialogOpen(false);
    setNewSetting({
      setting_key: "",
      label: "",
      description: "",
      setting_type: "text",
      category: "general",
      setting_value: "",
    });
  };

  const renderSettingInput = (setting: CmsSiteSetting) => {
    const value = formData[setting.setting_key] ?? "";

    switch (setting.setting_type) {
      case "textarea":
        return (
          <Textarea
            value={value}
            onChange={(e) => handleChange(setting.setting_key, e.target.value)}
            rows={3}
            className="resize-y"
          />
        );

      case "color":
        return (
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={value || "#000000"}
              onChange={(e) => handleChange(setting.setting_key, e.target.value)}
              className="w-12 h-10 rounded border cursor-pointer"
            />
            <Input
              value={value}
              onChange={(e) => handleChange(setting.setting_key, e.target.value)}
              placeholder="#000000"
              className="flex-1"
            />
          </div>
        );

      case "url":
        return (
          <Input
            type="url"
            value={value}
            onChange={(e) => handleChange(setting.setting_key, e.target.value)}
            placeholder="https://..."
          />
        );

      case "email":
        return (
          <Input
            type="email"
            value={value}
            onChange={(e) => handleChange(setting.setting_key, e.target.value)}
            placeholder="email@example.com"
          />
        );

      case "phone":
        return (
          <Input
            type="tel"
            value={value}
            onChange={(e) => handleChange(setting.setting_key, e.target.value)}
            placeholder="+27..."
          />
        );

      case "number":
        return (
          <Input
            type="number"
            value={value}
            onChange={(e) => handleChange(setting.setting_key, e.target.value)}
          />
        );

      default:
        return (
          <Input
            value={value}
            onChange={(e) => handleChange(setting.setting_key, e.target.value)}
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
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b">
        <div>
          <h2 className="text-2xl font-bold">Site Settings</h2>
          <p className="text-sm text-muted-foreground">
            Manage global settings that apply across your entire website
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setAddDialogOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Setting
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving || !hasChanges}
          >
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Changes
          </Button>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue={categories[0]} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          {categories.map((category) => {
            const info = CATEGORY_INFO[category] || { icon: <Settings className="w-4 h-4" />, label: category };
            return (
              <TabsTrigger key={category} value={category} className="flex items-center gap-2">
                {info.icon}
                {info.label}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {categories.map((category) => {
          const info = CATEGORY_INFO[category] || { description: "" };
          return (
            <TabsContent key={category} value={category} className="space-y-6">
              {info.description && (
                <p className="text-sm text-muted-foreground">{info.description}</p>
              )}
              
              <div className="grid gap-6 md:grid-cols-2">
                {groupedSettings[category].map((setting) => (
                  <div key={setting.setting_key} className="space-y-2">
                    <label className="text-sm font-medium">{setting.label}</label>
                    {setting.description && (
                      <p className="text-xs text-muted-foreground">{setting.description}</p>
                    )}
                    {renderSettingInput(setting)}
                  </div>
                ))}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>

      {/* Add Setting Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Setting</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Setting Key</label>
              <Input
                value={newSetting.setting_key}
                onChange={(e) => setNewSetting((prev) => ({
                  ...prev,
                  setting_key: e.target.value.toLowerCase().replace(/\s+/g, "_"),
                }))}
                placeholder="e.g., footer_text"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Label</label>
              <Input
                value={newSetting.label}
                onChange={(e) => setNewSetting((prev) => ({ ...prev, label: e.target.value }))}
                placeholder="e.g., Footer Text"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Description</label>
              <Input
                value={newSetting.description}
                onChange={(e) => setNewSetting((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Optional description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Type</label>
                <Select
                  value={newSetting.setting_type}
                  onValueChange={(value) => setNewSetting((prev) => ({ ...prev, setting_type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="textarea">Long Text</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="url">URL</SelectItem>
                    <SelectItem value="color">Color</SelectItem>
                    <SelectItem value="number">Number</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Category</label>
                <Select
                  value={newSetting.category}
                  onValueChange={(value) => setNewSetting((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="contact">Contact</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                    <SelectItem value="branding">Branding</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Default Value</label>
              <Input
                value={newSetting.setting_value}
                onChange={(e) => setNewSetting((prev) => ({ ...prev, setting_value: e.target.value }))}
                placeholder="Optional default value"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddSetting}>Add Setting</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
