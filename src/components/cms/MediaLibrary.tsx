import { useState, useRef, useCallback } from "react";
import { useCmsMedia, CmsMedia } from "@/hooks/use-cms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  Upload, 
  Trash2, 
  Check, 
  X, 
  Image as ImageIcon, 
  Search,
  Loader2,
  Grid,
  List,
  MoreVertical,
  Edit,
  Copy,
  ExternalLink
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface MediaLibraryProps {
  onSelect?: (media: CmsMedia) => void;
  onMultiSelect?: (media: CmsMedia[]) => void;
  selectionMode?: "single" | "multiple" | "none";
  selectedIds?: string[];
  className?: string;
}

export function MediaLibrary({
  onSelect,
  onMultiSelect,
  selectionMode = "none",
  selectedIds = [],
  className,
}: MediaLibraryProps) {
  const { media, loading, uploadMedia, deleteMedia, updateMedia } = useCmsMedia();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [uploading, setUploading] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>(selectedIds);
  const [editingMedia, setEditingMedia] = useState<CmsMedia | null>(null);
  const [editForm, setEditForm] = useState({ alt_text: "", caption: "" });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredMedia = media.filter((m) =>
    m.original_filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.alt_text?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.caption?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) {
          toast.error(`${file.name} is not an image`);
          continue;
        }
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name} is too large (max 5MB)`);
          continue;
        }
        await uploadMedia(file);
      }
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSelect = useCallback(
    (item: CmsMedia) => {
      if (selectionMode === "none") return;

      if (selectionMode === "single") {
        setSelectedItems([item.id]);
        onSelect?.(item);
      } else {
        setSelectedItems((prev) => {
          const newSelection = prev.includes(item.id)
            ? prev.filter((id) => id !== item.id)
            : [...prev, item.id];
          
          onMultiSelect?.(media.filter((m) => newSelection.includes(m.id)));
          return newSelection;
        });
      }
    },
    [selectionMode, onSelect, onMultiSelect, media]
  );

  const handleDelete = async (item: CmsMedia) => {
    if (!confirm(`Delete "${item.original_filename}"?`)) return;
    await deleteMedia(item);
    setSelectedItems((prev) => prev.filter((id) => id !== item.id));
  };

  const handleEdit = (item: CmsMedia) => {
    setEditingMedia(item);
    setEditForm({
      alt_text: item.alt_text || "",
      caption: item.caption || "",
    });
  };

  const handleSaveEdit = async () => {
    if (!editingMedia) return;
    await updateMedia(editingMedia.id, editForm);
    setEditingMedia(null);
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL copied to clipboard");
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search media..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode("grid")}
            className={viewMode === "grid" ? "bg-muted" : ""}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode("list")}
            className={viewMode === "list" ? "bg-muted" : ""}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileUpload}
        />
        <Button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="bg-primary hover:bg-primary/90"
        >
          {uploading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Upload className="w-4 h-4 mr-2" />
          )}
          Upload
        </Button>
      </div>

      {/* Media Grid/List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <ImageIcon className="w-12 h-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            {searchQuery ? "No media found matching your search" : "No media uploaded yet"}
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload your first image
          </Button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className={cn(
                "group relative aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer",
                selectedItems.includes(item.id)
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border hover:border-primary/50"
              )}
              onClick={() => handleSelect(item)}
            >
              <img
                src={item.file_url}
                alt={item.alt_text || item.original_filename}
                className="w-full h-full object-cover"
              />
              
              {/* Selection overlay */}
              {selectionMode !== "none" && selectedItems.includes(item.id) && (
                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>
              )}

              {/* Hover actions */}
              <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-xs text-white truncate">{item.original_filename}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6 text-white hover:bg-white/20"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(item);
                    }}
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6 text-white hover:bg-white/20"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(item.file_url);
                    }}
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6 text-white hover:bg-red-500/50"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item);
                    }}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className={cn(
                "flex items-center gap-4 p-3 rounded-lg border transition-all cursor-pointer",
                selectedItems.includes(item.id)
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              )}
              onClick={() => handleSelect(item)}
            >
              <img
                src={item.file_url}
                alt={item.alt_text || item.original_filename}
                className="w-16 h-16 rounded object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{item.original_filename}</p>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(item.file_size)} • {new Date(item.created_at).toLocaleDateString()}
                </p>
                {item.alt_text && (
                  <p className="text-sm text-muted-foreground truncate">
                    Alt: {item.alt_text}
                  </p>
                )}
              </div>

              {selectionMode !== "none" && selectedItems.includes(item.id) && (
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleEdit(item)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => copyToClipboard(item.file_url)}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy URL
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => window.open(item.file_url, "_blank")}>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open in new tab
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleDelete(item)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={!!editingMedia} onOpenChange={() => setEditingMedia(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Media Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {editingMedia && (
              <img
                src={editingMedia.file_url}
                alt={editingMedia.alt_text || ""}
                className="w-full max-h-48 object-contain rounded-lg bg-muted"
              />
            )}
            <div>
              <label className="text-sm font-medium mb-1.5 block">Alt Text</label>
              <Input
                value={editForm.alt_text}
                onChange={(e) => setEditForm((prev) => ({ ...prev, alt_text: e.target.value }))}
                placeholder="Describe the image for accessibility"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Caption</label>
              <Input
                value={editForm.caption}
                onChange={(e) => setEditForm((prev) => ({ ...prev, caption: e.target.value }))}
                placeholder="Optional caption"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingMedia(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Media Picker - A simplified dialog for selecting media
interface MediaPickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (media: CmsMedia) => void;
  multiple?: boolean;
}

export function MediaPicker({ open, onOpenChange, onSelect, multiple = false }: MediaPickerProps) {
  const [selected, setSelected] = useState<CmsMedia | null>(null);

  const handleSelect = (media: CmsMedia) => {
    setSelected(media);
  };

  const handleConfirm = () => {
    if (selected) {
      onSelect(selected);
      onOpenChange(false);
      setSelected(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Select Image</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto py-4">
          <MediaLibrary
            selectionMode="single"
            onSelect={handleSelect}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!selected}>
            Select Image
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
