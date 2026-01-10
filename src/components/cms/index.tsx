import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MediaLibrary } from "./MediaLibrary";
import { PageContentEditor } from "./PageContentEditor";
import { SiteSettingsEditor } from "./SiteSettingsEditor";
import { FileText, Image, Settings, Layout } from "lucide-react";
import { cn } from "@/lib/utils";

interface CMSPanelProps {
  className?: string;
}

export function CMSPanel({ className }: CMSPanelProps) {
  const [activeTab, setActiveTab] = useState("pages");

  return (
    <div className={cn("space-y-6", className)}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full max-w-lg grid-cols-3">
          <TabsTrigger value="pages" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Page Content
          </TabsTrigger>
          <TabsTrigger value="media" className="flex items-center gap-2">
            <Image className="w-4 h-4" />
            Media Library
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Site Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pages" className="mt-6">
          <PageContentEditor />
        </TabsContent>

        <TabsContent value="media" className="mt-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold">Media Library</h2>
              <p className="text-sm text-muted-foreground">
                Upload, manage, and organize images for use across your website
              </p>
            </div>
            <MediaLibrary selectionMode="none" />
          </div>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <SiteSettingsEditor />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export { MediaLibrary } from "./MediaLibrary";
export { PageContentEditor } from "./PageContentEditor";
export { SiteSettingsEditor } from "./SiteSettingsEditor";
