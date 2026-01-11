import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { BlockInstance, BlockDefinition } from './types';
import { blockRegistry } from './block-registry';
import { BlockRenderer } from './BlockRenderer';
import { cn } from '@/lib/utils';
import { 
  GripVertical, Trash2, Copy, Eye, EyeOff, 
  ChevronUp, ChevronDown, Settings 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface SortableBlockProps {
  block: BlockInstance;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onToggleVisibility: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onOpenSettings: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
  viewMode: 'desktop' | 'tablet' | 'mobile';
}

const SortableBlock: React.FC<SortableBlockProps> = ({
  block,
  isSelected,
  isHovered,
  onSelect,
  onDelete,
  onDuplicate,
  onToggleVisibility,
  onMoveUp,
  onMoveDown,
  onOpenSettings,
  canMoveUp,
  canMoveDown,
  viewMode,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : block.isHidden ? 0.4 : 1,
  };

  const definition = blockRegistry[block.type];

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative group",
        isDragging && "z-50",
        isSelected && "ring-2 ring-primary ring-offset-2",
        isHovered && !isSelected && "ring-2 ring-primary/30",
        block.isHidden && "opacity-50"
      )}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      {/* Block Controls */}
      <div 
        className={cn(
          "absolute -left-12 top-0 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10",
          isSelected && "opacity-100"
        )}
      >
        <TooltipProvider delayDuration={0}>
          {/* Drag Handle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 cursor-grab active:cursor-grabbing bg-background"
                {...attributes}
                {...listeners}
              >
                <GripVertical className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Drag to reorder</TooltipContent>
          </Tooltip>

          {/* Settings */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-background"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenSettings();
                }}
              >
                <Settings className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Edit settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Top Controls */}
      <div 
        className={cn(
          "absolute -top-10 left-1/2 -translate-x-1/2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10",
          isSelected && "opacity-100"
        )}
      >
        <TooltipProvider delayDuration={0}>
          <div className="flex items-center gap-1 bg-background border rounded-lg p-1 shadow-lg">
            {/* Block Type Label */}
            <span className="px-2 text-xs font-medium text-muted-foreground">
              {definition?.name || block.type}
            </span>

            <div className="w-px h-4 bg-border" />

            {/* Move Up */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoveUp();
                  }}
                  disabled={!canMoveUp}
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Move up</TooltipContent>
            </Tooltip>

            {/* Move Down */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoveDown();
                  }}
                  disabled={!canMoveDown}
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Move down</TooltipContent>
            </Tooltip>

            <div className="w-px h-4 bg-border" />

            {/* Toggle Visibility */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleVisibility();
                  }}
                >
                  {block.isHidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{block.isHidden ? 'Show' : 'Hide'}</TooltipContent>
            </Tooltip>

            {/* Duplicate */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDuplicate();
                  }}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Duplicate</TooltipContent>
            </Tooltip>

            {/* Delete */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-destructive hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>

      {/* Block Content */}
      <div className={cn(
        "border-2 border-transparent transition-colors",
        isSelected && "border-primary",
        isHovered && !isSelected && "border-dashed border-primary/30"
      )}>
        <BlockRenderer 
          block={block} 
          definition={definition} 
          viewMode={viewMode}
          isEditing={isSelected}
        />
      </div>
    </div>
  );
};

interface BuilderCanvasProps {
  blocks: BlockInstance[];
  selectedBlockId: string | null;
  hoveredBlockId: string | null;
  viewMode: 'desktop' | 'tablet' | 'mobile';
  onSelectBlock: (id: string | null) => void;
  onHoverBlock: (id: string | null) => void;
  onDeleteBlock: (id: string) => void;
  onDuplicateBlock: (id: string) => void;
  onToggleBlockVisibility: (id: string) => void;
  onMoveBlock: (id: string, direction: 'up' | 'down') => void;
  onOpenBlockSettings: (id: string) => void;
}

export const BuilderCanvas: React.FC<BuilderCanvasProps> = ({
  blocks,
  selectedBlockId,
  hoveredBlockId,
  viewMode,
  onSelectBlock,
  onHoverBlock,
  onDeleteBlock,
  onDuplicateBlock,
  onToggleBlockVisibility,
  onMoveBlock,
  onOpenBlockSettings,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas',
  });

  const sortedBlocks = [...blocks].sort((a, b) => a.order - b.order);

  const getCanvasWidth = () => {
    switch (viewMode) {
      case 'mobile': return 'max-w-[375px]';
      case 'tablet': return 'max-w-[768px]';
      default: return 'max-w-full';
    }
  };

  return (
    <div 
      className="flex-1 overflow-auto bg-muted/30 p-8"
      onClick={() => onSelectBlock(null)}
    >
      <div 
        ref={setNodeRef}
        className={cn(
          "min-h-[600px] mx-auto bg-background rounded-lg shadow-sm border transition-all",
          getCanvasWidth(),
          isOver && "ring-2 ring-primary ring-dashed"
        )}
      >
        {blocks.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center h-[600px] text-center p-8">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Start Building</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Drag blocks from the left panel to start creating your page. 
              You can rearrange, edit, and customize each block.
            </p>
          </div>
        ) : (
          <SortableContext items={sortedBlocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-0 pl-14 pr-4 py-12">
              {sortedBlocks.map((block, index) => (
                <div 
                  key={block.id}
                  onMouseEnter={() => onHoverBlock(block.id)}
                  onMouseLeave={() => onHoverBlock(null)}
                >
                  <SortableBlock
                    block={block}
                    isSelected={selectedBlockId === block.id}
                    isHovered={hoveredBlockId === block.id}
                    onSelect={() => onSelectBlock(block.id)}
                    onDelete={() => onDeleteBlock(block.id)}
                    onDuplicate={() => onDuplicateBlock(block.id)}
                    onToggleVisibility={() => onToggleBlockVisibility(block.id)}
                    onMoveUp={() => onMoveBlock(block.id, 'up')}
                    onMoveDown={() => onMoveBlock(block.id, 'down')}
                    onOpenSettings={() => onOpenBlockSettings(block.id)}
                    canMoveUp={index > 0}
                    canMoveDown={index < sortedBlocks.length - 1}
                    viewMode={viewMode}
                  />
                </div>
              ))}
            </div>
          </SortableContext>
        )}
      </div>
    </div>
  );
};
