import React, { useState, useCallback, useEffect } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { BlockPalette } from './BlockPalette';
import { BuilderCanvas } from './BuilderCanvas';
import { BlockSettingsPanel } from './BlockSettingsPanel';
import { AIAssistant } from './AIAssistant';
import { PagesList } from './PagesList';
import { blockRegistry } from './block-registry';
import { BlockInstance, BlockType } from './types';
import { useBuilderPages, BuilderPage } from '@/hooks/use-builder-pages';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Monitor, Tablet, Smartphone, Eye, Save, Undo, Redo,
  ChevronLeft, Sparkles, Globe, GlobeLock, Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface PageBuilderProps {
  initialPageId?: string;
}

export const PageBuilder: React.FC<PageBuilderProps> = ({
  initialPageId,
}) => {
  const {
    pages,
    loading,
    saving,
    createPage,
    savePage,
    publishPage,
    unpublishPage,
    deletePage,
    getPage,
  } = useBuilderPages();

  const [currentPage, setCurrentPage] = useState<BuilderPage | null>(null);
  const [blocks, setBlocks] = useState<BlockInstance[]>([]);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [hoveredBlockId, setHoveredBlockId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [history, setHistory] = useState<BlockInstance[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const selectedBlock = selectedBlockId ? blocks.find(b => b.id === selectedBlockId) : null;
  const selectedBlockDefinition = selectedBlock ? blockRegistry[selectedBlock.type] : null;

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // Load initial page if provided
  useEffect(() => {
    if (initialPageId && pages.length > 0) {
      const page = getPage(initialPageId);
      if (page) {
        setCurrentPage(page);
        setBlocks(page.blocks);
        setHistory([page.blocks]);
        setHistoryIndex(0);
      }
    }
  }, [initialPageId, pages, getPage]);

  const saveToHistory = useCallback((newBlocks: BlockInstance[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newBlocks);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setHasUnsavedChanges(true);
  }, [history, historyIndex]);

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setBlocks(history[historyIndex - 1]);
      setHasUnsavedChanges(true);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setBlocks(history[historyIndex + 1]);
      setHasUnsavedChanges(true);
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    // Adding new block from palette
    if (active.id.toString().startsWith('palette-')) {
      const blockType = active.data.current?.blockType as BlockType;
      const definition = blockRegistry[blockType];
      
      const newBlock: BlockInstance = {
        id: `block-${Date.now()}`,
        type: blockType,
        content: { ...definition.defaultContent },
        styles: {},
        order: blocks.length,
      };

      const newBlocks = [...blocks, newBlock];
      setBlocks(newBlocks);
      saveToHistory(newBlocks);
      setSelectedBlockId(newBlock.id);
      toast.success(`Added ${definition.name} block`);
      return;
    }

    // Reordering existing blocks
    if (active.id !== over.id) {
      const oldIndex = blocks.findIndex((b) => b.id === active.id);
      const newIndex = blocks.findIndex((b) => b.id === over.id);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        const newBlocks = arrayMove(blocks, oldIndex, newIndex).map((b, i) => ({
          ...b,
          order: i,
        }));
        setBlocks(newBlocks);
        saveToHistory(newBlocks);
      }
    }
  };

  const handleDeleteBlock = (id: string) => {
    const newBlocks = blocks.filter((b) => b.id !== id);
    setBlocks(newBlocks);
    saveToHistory(newBlocks);
    if (selectedBlockId === id) setSelectedBlockId(null);
    toast.success('Block deleted');
  };

  const handleDuplicateBlock = (id: string) => {
    const block = blocks.find((b) => b.id === id);
    if (!block) return;

    const newBlock: BlockInstance = {
      ...block,
      id: `block-${Date.now()}`,
      order: block.order + 0.5,
    };

    const newBlocks = [...blocks, newBlock]
      .sort((a, b) => a.order - b.order)
      .map((b, i) => ({ ...b, order: i }));
    
    setBlocks(newBlocks);
    saveToHistory(newBlocks);
    setSelectedBlockId(newBlock.id);
    toast.success('Block duplicated');
  };

  const handleToggleVisibility = (id: string) => {
    const newBlocks = blocks.map((b) =>
      b.id === id ? { ...b, isHidden: !b.isHidden } : b
    );
    setBlocks(newBlocks);
    saveToHistory(newBlocks);
  };

  const handleMoveBlock = (id: string, direction: 'up' | 'down') => {
    const index = blocks.findIndex((b) => b.id === id);
    if (index === -1) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= blocks.length) return;

    const newBlocks = arrayMove(blocks, index, newIndex).map((b, i) => ({
      ...b,
      order: i,
    }));
    setBlocks(newBlocks);
    saveToHistory(newBlocks);
  };

  const handleUpdateBlock = (id: string, updates: Partial<BlockInstance>) => {
    const newBlocks = blocks.map((b) =>
      b.id === id ? { ...b, ...updates } : b
    );
    setBlocks(newBlocks);
    saveToHistory(newBlocks);
  };

  const handleSave = async () => {
    if (!currentPage) return;
    
    const success = await savePage(currentPage.id, blocks);
    if (success) {
      setHasUnsavedChanges(false);
      toast.success('Page saved');
    }
  };

  const handlePublish = async () => {
    if (!currentPage) return;
    
    // Save first
    const saveSuccess = await savePage(currentPage.id, blocks);
    if (!saveSuccess) return;
    
    const success = await publishPage(currentPage.id);
    if (success) {
      setCurrentPage({ ...currentPage, is_published: true });
      setHasUnsavedChanges(false);
    }
  };

  const handleEditPage = (page: BuilderPage) => {
    setCurrentPage(page);
    setBlocks(page.blocks);
    setHistory([page.blocks]);
    setHistoryIndex(0);
    setHasUnsavedChanges(false);
    setSelectedBlockId(null);
  };

  const handleBackToList = () => {
    if (hasUnsavedChanges) {
      if (!confirm('You have unsaved changes. Are you sure you want to leave?')) {
        return;
      }
    }
    setCurrentPage(null);
    setBlocks([]);
    setHistory([[]]);
    setHistoryIndex(0);
    setHasUnsavedChanges(false);
    setSelectedBlockId(null);
  };

  const handleApplyAIBlocks = (newBlocks: BlockInstance[]) => {
    setBlocks(newBlocks);
    saveToHistory(newBlocks);
  };

  // Show pages list if no page is selected
  if (!currentPage) {
    return (
      <PagesList
        pages={pages}
        loading={loading}
        saving={saving}
        onCreatePage={createPage}
        onEditPage={handleEditPage}
        onDeletePage={deletePage}
        onPublishPage={publishPage}
        onUnpublishPage={unpublishPage}
      />
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="h-[calc(100vh-200px)] min-h-[600px] flex flex-col bg-background">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-2 border-b bg-card">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleBackToList}>
              <ChevronLeft className="w-4 h-4 mr-1" /> Pages
            </Button>
            <div className="w-px h-6 bg-border mx-2" />
            <div className="flex items-center gap-2">
              <span className="font-medium">{currentPage.title}</span>
              {currentPage.is_published ? (
                <span className="flex items-center text-xs text-green-600">
                  <Globe className="w-3 h-3 mr-1" /> Live
                </span>
              ) : (
                <span className="flex items-center text-xs text-muted-foreground">
                  <GlobeLock className="w-3 h-3 mr-1" /> Draft
                </span>
              )}
              {hasUnsavedChanges && (
                <span className="text-xs text-orange-500">• Unsaved</span>
              )}
            </div>
            <div className="w-px h-6 bg-border mx-2" />
            <Button variant="ghost" size="icon" onClick={handleUndo} disabled={historyIndex === 0}>
              <Undo className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleRedo} disabled={historyIndex === history.length - 1}>
              <Redo className="w-4 h-4" />
            </Button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === 'desktop' ? 'secondary' : 'ghost'}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode('desktop')}
            >
              <Monitor className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'tablet' ? 'secondary' : 'ghost'}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode('tablet')}
            >
              <Tablet className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'mobile' ? 'secondary' : 'ghost'}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode('mobile')}
            >
              <Smartphone className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={showAIAssistant ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => setShowAIAssistant(!showAIAssistant)}
            >
              <Sparkles className="w-4 h-4 mr-2" /> AI Assistant
            </Button>
            <Button variant="outline" size="sm" onClick={handleSave} disabled={saving || !hasUnsavedChanges}>
              {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save
            </Button>
            <Button size="sm" onClick={handlePublish} disabled={saving}>
              {currentPage.is_published ? (
                <>
                  <Eye className="w-4 h-4 mr-2" /> Update
                </>
              ) : (
                <>
                  <Globe className="w-4 h-4 mr-2" /> Publish
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Block Palette */}
          <div className="w-72 border-r bg-card overflow-hidden flex-shrink-0">
            <BlockPalette />
          </div>

          {/* Canvas */}
          <BuilderCanvas
            blocks={blocks}
            selectedBlockId={selectedBlockId}
            hoveredBlockId={hoveredBlockId}
            viewMode={viewMode}
            onSelectBlock={setSelectedBlockId}
            onHoverBlock={setHoveredBlockId}
            onDeleteBlock={handleDeleteBlock}
            onDuplicateBlock={handleDuplicateBlock}
            onToggleBlockVisibility={handleToggleVisibility}
            onMoveBlock={handleMoveBlock}
            onOpenBlockSettings={(id) => setSelectedBlockId(id)}
          />

          {/* Settings Panel or AI Assistant */}
          {showAIAssistant ? (
            <AIAssistant
              currentBlocks={blocks}
              onApplyBlocks={handleApplyAIBlocks}
              onClose={() => setShowAIAssistant(false)}
            />
          ) : selectedBlock && selectedBlockDefinition ? (
            <BlockSettingsPanel
              block={selectedBlock}
              definition={selectedBlockDefinition}
              onUpdate={(updates) => handleUpdateBlock(selectedBlock.id, updates)}
              onClose={() => setSelectedBlockId(null)}
            />
          ) : null}
        </div>
      </div>
    </DndContext>
  );
};

export default PageBuilder;