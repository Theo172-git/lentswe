import React, { useState, useEffect } from 'react';
import { BlockInstance, BlockDefinition, BlockField, BlockStyle } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, Plus, Trash2, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlockSettingsPanelProps {
  block: BlockInstance;
  definition: BlockDefinition;
  onUpdate: (updates: Partial<BlockInstance>) => void;
  onClose: () => void;
}

export const BlockSettingsPanel: React.FC<BlockSettingsPanelProps> = ({
  block,
  definition,
  onUpdate,
  onClose,
}) => {
  const [localContent, setLocalContent] = useState<Record<string, any>>({ ...block.content });
  const [localStyles, setLocalStyles] = useState<Record<string, any>>({ ...block.styles });

  // Sync local state with block changes
  useEffect(() => {
    setLocalContent({ ...block.content });
    setLocalStyles({ ...block.styles });
  }, [block.id]);

  const handleContentChange = (key: string, value: any) => {
    const newContent = { ...localContent, [key]: value };
    setLocalContent(newContent);
    onUpdate({ content: newContent });
  };

  const handleStyleChange = (key: string, value: any) => {
    const newStyles = { ...localStyles, [key]: value };
    setLocalStyles(newStyles);
    onUpdate({ styles: newStyles });
  };

  const handleArrayItemChange = (arrayKey: string, index: number, fieldKey: string, value: any) => {
    const array = [...(localContent[arrayKey] || [])];
    array[index] = { ...array[index], [fieldKey]: value };
    handleContentChange(arrayKey, array);
  };

  const handleAddArrayItem = (arrayKey: string, fields: BlockField[]) => {
    const array = [...(localContent[arrayKey] || [])];
    const newItem: Record<string, any> = {};
    fields.forEach(f => {
      newItem[f.key] = f.defaultValue || '';
    });
    array.push(newItem);
    handleContentChange(arrayKey, array);
  };

  const handleRemoveArrayItem = (arrayKey: string, index: number) => {
    const array = [...(localContent[arrayKey] || [])];
    array.splice(index, 1);
    handleContentChange(arrayKey, array);
  };

  const renderField = (field: BlockField, value: any, onChange: (value: any) => void) => {
    switch (field.type) {
      case 'text':
        return (
          <Input
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
          />
        );
      
      case 'textarea':
        return (
          <Textarea
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            className="min-h-[80px]"
          />
        );
      
      case 'number':
        return (
          <Input
            type="number"
            value={value || ''}
            onChange={(e) => onChange(parseInt(e.target.value) || 0)}
          />
        );
      
      case 'url':
        return (
          <Input
            type="url"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder || 'https://...'}
          />
        );
      
      case 'image':
        return (
          <div className="space-y-2">
            <Input
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Image URL..."
            />
            {value && (
              <img src={value} alt="" className="w-full h-24 object-cover rounded-md" />
            )}
          </div>
        );
      
      case 'color':
        return (
          <div className="flex gap-2">
            <input
              type="color"
              value={value || '#000000'}
              onChange={(e) => onChange(e.target.value)}
              className="w-10 h-10 rounded cursor-pointer border"
            />
            <Input
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder="#000000"
              className="flex-1"
            />
          </div>
        );
      
      case 'select':
        return (
          <Select value={value || ''} onValueChange={onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      case 'boolean':
        return (
          <Switch
            checked={value || false}
            onCheckedChange={onChange}
          />
        );
      
      case 'icon':
        return (
          <Select value={value || ''} onValueChange={onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select icon..." />
            </SelectTrigger>
            <SelectContent>
              {['Zap', 'Shield', 'Users', 'Clock', 'Award', 'ThumbsUp', 'Star', 'Mail', 'Phone', 'MapPin', 'Check', 'ArrowRight'].map((icon) => (
                <SelectItem key={icon} value={icon}>
                  {icon}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      default:
        return (
          <Input
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
          />
        );
    }
  };

  const renderStyleField = (field: BlockStyle, value: any, onChange: (value: any) => void) => {
    switch (field.type) {
      case 'color':
        return (
          <div className="flex gap-2">
            <input
              type="color"
              value={value || '#000000'}
              onChange={(e) => onChange(e.target.value)}
              className="w-10 h-10 rounded cursor-pointer border"
            />
            <Input
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder="#000000"
              className="flex-1"
            />
          </div>
        );
      
      case 'alignment':
        return (
          <Select value={value || 'center'} onValueChange={onChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Left</SelectItem>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="right">Right</SelectItem>
            </SelectContent>
          </Select>
        );
      
      case 'select':
        return (
          <Select value={value || ''} onValueChange={onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      case 'spacing':
      case 'border':
      case 'shadow':
        return (
          <Input
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.type === 'spacing' ? '16px' : field.type === 'shadow' ? '0 4px 6px rgba(0,0,0,0.1)' : '1px solid #ccc'}
          />
        );
      
      default:
        return (
          <Input
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
          />
        );
    }
  };

  const renderArrayField = (field: BlockField) => {
    const items = localContent[field.key] || [];
    const arrayFields = field.arrayFields || [];

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">{field.label}</Label>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleAddArrayItem(field.key, arrayFields)}
          >
            <Plus className="w-4 h-4 mr-1" /> Add
          </Button>
        </div>
        
        <div className="space-y-3">
          {items.map((item: any, index: number) => (
            <div key={index} className="bg-muted/50 rounded-lg p-3 relative group">
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <GripVertical className="w-4 h-4 text-muted-foreground" />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute -right-2 -top-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleRemoveArrayItem(field.key, index)}
              >
                <Trash2 className="w-3 h-3 text-destructive" />
              </Button>
              
              <div className="space-y-2">
                {arrayFields.map((subField) => (
                  <div key={subField.key}>
                    <Label className="text-xs text-muted-foreground">{subField.label}</Label>
                    {renderField(
                      subField,
                      item[subField.key],
                      (value) => handleArrayItemChange(field.key, index, subField.key, value)
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-80 border-l bg-card flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <h3 className="font-semibold">{definition.name}</h3>
          <p className="text-xs text-muted-foreground">Edit block settings</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="content" className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-2">
          <TabsTrigger value="content" className="flex-1">Content</TabsTrigger>
          <TabsTrigger value="style" className="flex-1">Style</TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1">
          <TabsContent value="content" className="p-4 space-y-4 mt-0">
            {definition.fields.map((field) => (
              <div key={field.key} className="space-y-2">
                {field.type === 'array' ? (
                  renderArrayField(field)
                ) : (
                  <>
                    <Label className="text-sm font-medium">
                      {field.label}
                      {field.required && <span className="text-destructive ml-1">*</span>}
                    </Label>
                    {renderField(
                      field,
                      localContent[field.key],
                      (value) => handleContentChange(field.key, value)
                    )}
                  </>
                )}
              </div>
            ))}
          </TabsContent>

          <TabsContent value="style" className="p-4 space-y-4 mt-0">
            {definition.styles.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No style options for this block
              </p>
            ) : (
              definition.styles.map((field) => (
                <div key={field.key} className="space-y-2">
                  <Label className="text-sm font-medium">{field.label}</Label>
                  {renderStyleField(
                    field,
                    localStyles[field.key],
                    (value) => handleStyleChange(field.key, value)
                  )}
                </div>
              ))
            )}
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
};