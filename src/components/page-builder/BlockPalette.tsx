import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { blockRegistry, getBlockCategories, searchBlocks } from './block-registry';
import { BlockDefinition, BlockType } from './types';
import { 
  Search, Layout, Columns, Video, Grid3x3, List, Sparkles,
  Megaphone, SplitSquareHorizontal, Quote, LayoutGrid, Users,
  UserCircle, Image, LayoutDashboard, Table, CreditCard, Mail,
  MessageSquare, HelpCircle, BarChart3, Building, FileText,
  LayoutPanelLeft, PlayCircle, Minus, MoveVertical, Newspaper,
  PanelTop, PanelBottom, Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ElementType> = {
  Layout, Columns, Video, Grid3x3, List, Sparkles,
  Megaphone, SplitSquareHorizontal, Quote, LayoutGrid, Users,
  UserCircle, Image, LayoutDashboard, Table, CreditCard, Mail,
  MessageSquare, HelpCircle, BarChart3, Building, FileText,
  LayoutPanelLeft, PlayCircle, Minus, MoveVertical, Newspaper,
  PanelTop, PanelBottom, Menu
};

interface DraggableBlockProps {
  block: BlockDefinition;
}

const DraggableBlock: React.FC<DraggableBlockProps> = ({ block }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `palette-${block.type}`,
    data: {
      type: 'new-block',
      blockType: block.type,
      definition: block,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  const IconComponent = iconMap[block.icon] || Layout;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg border border-border/50 bg-card/50",
        "hover:border-primary/50 hover:bg-accent/50 cursor-grab active:cursor-grabbing",
        "transition-all duration-200 group",
        isDragging && "shadow-lg ring-2 ring-primary/30"
      )}
    >
      <div className="p-2 rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
        <IconComponent className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{block.name}</p>
        <p className="text-xs text-muted-foreground truncate">{block.description}</p>
      </div>
    </div>
  );
};

interface BlockPaletteProps {
  className?: string;
}

export const BlockPalette: React.FC<BlockPaletteProps> = ({ className }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const categories = getBlockCategories();

  const filteredBlocks = searchQuery.trim() 
    ? searchBlocks(searchQuery) 
    : null;

  const getCategoryIcon = (iconName: string) => {
    const Icon = iconMap[iconName] || Layout;
    return <Icon className="w-4 h-4" />;
  };

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Search */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search blocks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Blocks */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          {filteredBlocks ? (
            // Search Results
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground mb-3">
                {filteredBlocks.length} blocks found
              </p>
              {filteredBlocks.map((block) => (
                <DraggableBlock key={block.type} block={block} />
              ))}
              {filteredBlocks.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No blocks match your search
                </p>
              )}
            </div>
          ) : (
            // Categorized View
            <Accordion type="multiple" defaultValue={['hero', 'features', 'cta']} className="space-y-2">
              {categories.map((category) => {
                const categoryBlocks = Object.values(blockRegistry).filter(
                  (block) => block.category === category.id
                );

                return (
                  <AccordionItem 
                    key={category.id} 
                    value={category.id}
                    className="border rounded-lg px-3"
                  >
                    <AccordionTrigger className="hover:no-underline py-3">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(category.icon)}
                        <span className="text-sm font-medium">{category.name}</span>
                        <span className="text-xs text-muted-foreground ml-1">
                          ({categoryBlocks.length})
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pb-2">
                        {categoryBlocks.map((block) => (
                          <DraggableBlock key={block.type} block={block} />
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          )}
        </div>
      </ScrollArea>

      {/* Helper Text */}
      <div className="p-4 border-t border-border bg-muted/30">
        <p className="text-xs text-muted-foreground text-center">
          Drag blocks to the canvas to build your page
        </p>
      </div>
    </div>
  );
};
