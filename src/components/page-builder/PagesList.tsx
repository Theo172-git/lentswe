import React, { useState } from 'react';
import { BuilderPage } from '@/hooks/use-builder-pages';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Plus, FileText, MoreVertical, Edit, Trash2, 
  Globe, GlobeLock, ExternalLink, Loader2, Search
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface PagesListProps {
  pages: BuilderPage[];
  loading: boolean;
  saving: boolean;
  onCreatePage: (title: string, slug: string) => Promise<BuilderPage | null>;
  onEditPage: (page: BuilderPage) => void;
  onDeletePage: (id: string) => Promise<boolean>;
  onPublishPage: (id: string) => Promise<boolean>;
  onUnpublishPage: (id: string) => Promise<boolean>;
}

export const PagesList: React.FC<PagesListProps> = ({
  pages,
  loading,
  saving,
  onCreatePage,
  onEditPage,
  onDeletePage,
  onPublishPage,
  onUnpublishPage,
}) => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState('');
  const [newPageSlug, setNewPageSlug] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [deletePageId, setDeletePageId] = useState<string | null>(null);

  const handleCreatePage = async () => {
    if (!newPageTitle.trim() || !newPageSlug.trim()) return;
    
    const page = await onCreatePage(newPageTitle, newPageSlug);
    if (page) {
      setShowCreateDialog(false);
      setNewPageTitle('');
      setNewPageSlug('');
      onEditPage(page);
    }
  };

  const handleTitleChange = (value: string) => {
    setNewPageTitle(value);
    // Auto-generate slug from title
    if (!newPageSlug || newPageSlug === generateSlug(newPageTitle)) {
      setNewPageSlug(generateSlug(value));
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const filteredPages = pages.filter(page => 
    page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteConfirm = async () => {
    if (deletePageId) {
      await onDeletePage(deletePageId);
      setDeletePageId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Pages</h2>
          <p className="text-muted-foreground">Create and manage your website pages</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Page
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search pages..."
          className="pl-9"
        />
      </div>

      {/* Pages Grid */}
      {filteredPages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">
            {searchQuery ? 'No pages found' : 'No pages yet'}
          </h3>
          <p className="text-muted-foreground mb-4 max-w-sm">
            {searchQuery 
              ? 'Try a different search term'
              : 'Create your first page to start building your website'}
          </p>
          {!searchQuery && (
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Page
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPages.map((page) => (
            <Card 
              key={page.id} 
              className={cn(
                "group cursor-pointer transition-all hover:shadow-md",
                page.is_published && "border-primary/30"
              )}
              onClick={() => onEditPage(page)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold truncate">{page.title}</h3>
                      {page.is_published ? (
                        <Badge variant="default" className="shrink-0">
                          <Globe className="w-3 h-3 mr-1" />
                          Live
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="shrink-0">
                          <GlobeLock className="w-3 h-3 mr-1" />
                          Draft
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">/{page.slug}</p>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEditPage(page); }}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      {page.is_published ? (
                        <>
                          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); window.open(`/p/${page.slug}`, '_blank'); }}>
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Live
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onUnpublishPage(page.id); }}>
                            <GlobeLock className="w-4 h-4 mr-2" />
                            Unpublish
                          </DropdownMenuItem>
                        </>
                      ) : (
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onPublishPage(page.id); }}>
                          <Globe className="w-4 h-4 mr-2" />
                          Publish
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-destructive"
                        onClick={(e) => { e.stopPropagation(); setDeletePageId(page.id); }}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{page.blocks.length} block(s)</span>
                  <span>Updated {format(new Date(page.updated_at), 'MMM d, yyyy')}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create Page Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Page</DialogTitle>
            <DialogDescription>
              Give your page a title and URL slug
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Page Title</Label>
              <Input
                id="title"
                value={newPageTitle}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g., About Us"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug</Label>
              <div className="flex items-center">
                <span className="text-muted-foreground text-sm mr-1">/</span>
                <Input
                  id="slug"
                  value={newPageSlug}
                  onChange={(e) => setNewPageSlug(generateSlug(e.target.value))}
                  placeholder="about-us"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleCreatePage}
              disabled={!newPageTitle.trim() || !newPageSlug.trim() || saving}
            >
              {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Create Page
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deletePageId} onOpenChange={() => setDeletePageId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Page</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this page? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeletePageId(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm} disabled={saving}>
              {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};