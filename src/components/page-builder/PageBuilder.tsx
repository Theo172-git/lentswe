import React, { useState, useCallback } from 'react';
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
import { blockRegistry } from './block-registry';
import { BlockInstance, BlockType } from './types';
import { Button } from '@/components/ui/button';
import { 
  Monitor, Tablet, Smartphone, Eye, Save, Undo, Redo,
  Settings, ChevronLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface PageBuilderProps {
  pageId?: string;
  onSave?: (blocks: BlockInstance[]) => void;
  onPreview?: (blocks: BlockInstance[]) => void;
  onBack?: () => void;
}

export const PageBuilder: React.FC<PageBuilderProps> = ({
  pageId,
  onSave,
  onPreview,
  onBack,
}) => {
  const [blocks, setBlocks] = useState<BlockInstance[]>([]);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [hoveredBlockId, setHoveredBlockId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [history, setHistory] = useState<BlockInstance[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const saveToHistory = useCallback((newBlocks: BlockInstance[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newBlocks);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setBlocks(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setBlocks(history[historyIndex + 1]);
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

  const handleSave = () => {
    onSave?.(blocks);
    toast.success('Page saved successfully');
  };

  const handlePreview = () => {
    onPreview?.(blocks);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="h-full flex flex-col bg-background">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-2 border-b bg-card">
          <div className="flex items-center gap-2">
            {onBack && (
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ChevronLeft className="w-4 h-4 mr-1" /> Back
              </Button>
            )}
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
            <Button variant="outline" size="sm" onClick={handlePreview}>
              <Eye className="w-4 h-4 mr-2" /> Preview
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" /> Save
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Block Palette */}
          <div className="w-80 border-r bg-card overflow-hidden">
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
        </div>
      </div>
    </DndContext>
  );
};

export default PageBuilder;
