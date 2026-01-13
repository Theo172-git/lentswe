import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sparkles, Send, Loader2, X, Wand2, LayoutTemplate, Palette, Type } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BlockInstance } from './types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AIAssistantProps {
  currentBlocks: BlockInstance[];
  onApplyBlocks: (blocks: BlockInstance[]) => void;
  onClose: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  blocks?: BlockInstance[];
}

const suggestionPrompts = [
  { icon: LayoutTemplate, label: "Create a landing page", prompt: "Create a complete landing page with hero, features, testimonials, and contact sections" },
  { icon: Wand2, label: "Add a hero section", prompt: "Add an eye-catching hero section with a compelling headline and call-to-action" },
  { icon: Palette, label: "Add testimonials", prompt: "Add a testimonials section with 3 customer reviews" },
  { icon: Type, label: "Add pricing table", prompt: "Create a pricing section with 3 plans: Basic, Pro, and Enterprise" },
];

export const AIAssistant: React.FC<AIAssistantProps> = ({
  currentBlocks,
  onApplyBlocks,
  onClose,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm your AI page builder assistant. Tell me what kind of page or sections you want to create, and I'll help you build it. You can describe your business, the purpose of the page, or specific sections you need."
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (prompt: string) => {
    if (!prompt.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: prompt };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-page-builder', {
        body: {
          prompt,
          currentBlocks,
          action: currentBlocks.length > 0 ? 'modify' : 'create'
        }
      });

      if (error) throw error;

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message || "Here's what I created for you:",
        blocks: data.blocks
      };

      setMessages(prev => [...prev, assistantMessage]);

      if (data.blocks && data.blocks.length > 0) {
        toast.success(`Generated ${data.blocks.length} block(s)`);
      }
    } catch (error) {
      console.error('AI assistant error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to get AI response';
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Sorry, I encountered an error: ${errorMessage}. Please try again.`
      }]);
      
      toast.error('AI assistant error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyBlocks = (blocks: BlockInstance[]) => {
    // Ensure blocks have unique IDs and proper order
    const processedBlocks = blocks.map((block, index) => ({
      ...block,
      id: `block-${Date.now()}-${index}`,
      order: currentBlocks.length + index
    }));
    
    onApplyBlocks([...currentBlocks, ...processedBlocks]);
    toast.success(`Applied ${processedBlocks.length} block(s) to your page`);
  };

  const handleReplaceBlocks = (blocks: BlockInstance[]) => {
    const processedBlocks = blocks.map((block, index) => ({
      ...block,
      id: `block-${Date.now()}-${index}`,
      order: index
    }));
    
    onApplyBlocks(processedBlocks);
    toast.success(`Replaced page with ${processedBlocks.length} block(s)`);
  };

  return (
    <div className="w-96 border-l bg-card flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-primary/10 to-transparent">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">AI Assistant</h3>
            <p className="text-xs text-muted-foreground">Build pages with prompts</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex flex-col gap-2",
                message.role === 'user' && "items-end"
              )}
            >
              <div
                className={cn(
                  "max-w-[90%] rounded-lg p-3 text-sm",
                  message.role === 'user'
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {message.content}
              </div>
              
              {message.blocks && message.blocks.length > 0 && (
                <div className="max-w-[90%] bg-muted/50 rounded-lg p-3 space-y-2">
                  <p className="text-xs text-muted-foreground">
                    Generated {message.blocks.length} block(s):
                  </p>
                  <ul className="text-xs space-y-1">
                    {message.blocks.map((block, i) => (
                      <li key={i} className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {block.type}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-xs"
                      onClick={() => handleApplyBlocks(message.blocks!)}
                    >
                      Add to Page
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 text-xs"
                      onClick={() => handleReplaceBlocks(message.blocks!)}
                    >
                      Replace Page
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Generating...</span>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Quick Suggestions */}
      {messages.length <= 1 && (
        <div className="p-4 border-t space-y-2">
          <p className="text-xs text-muted-foreground mb-2">Quick suggestions:</p>
          <div className="grid grid-cols-2 gap-2">
            {suggestionPrompts.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="justify-start text-xs h-auto py-2"
                onClick={() => sendMessage(suggestion.prompt)}
                disabled={isLoading}
              >
                <suggestion.icon className="w-3 h-3 mr-1.5 flex-shrink-0" />
                <span className="truncate">{suggestion.label}</span>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe what you want to build..."
            className="min-h-[60px] resize-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage(input);
              }
            }}
          />
          <Button
            size="icon"
            className="h-auto"
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};