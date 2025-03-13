
import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, ArrowLeft, Trash2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDeepseek } from '../hooks/useDeepseek';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

interface ChatBotProps {
  isPopup?: boolean;
}

const ChatBot = ({ isPopup = false }: ChatBotProps) => {
  const { messages, isLoading, sendMessage, clearMessages } = useDeepseek();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to the bottom of the chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus the input field when the component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!import.meta.env.VITE_DEEPSEEK_API_KEY) {
      toast.error('DeepSeek API key is not configured. Please add your API key to the .env file.');
      return;
    }
    
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b py-3 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {!isPopup && (
            <Link to="/recipes" className="p-2 hover:bg-sand-100 rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          )}
          <h1 className="font-serif text-xl font-medium">Recipe Assistant</h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            clearMessages();
            toast.success('Chat history cleared');
          }}
          aria-label="Clear chat"
        >
          <Trash2 className="w-5 h-5" />
        </Button>
      </div>

      {/* Chat content */}
      <ScrollArea className="flex-1 p-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <div className="bg-sand-100 rounded-full p-4 mb-4">
              <img 
                src="/placeholder.svg" 
                alt="Chef Bot" 
                className="w-16 h-16"
              />
            </div>
            <h2 className="font-serif text-xl font-medium mb-2">
              Recipe Assistant
            </h2>
            <p className="text-muted-foreground max-w-md">
              Ask me anything about recipes, cooking techniques, ingredient substitutions, or food-related questions!
            </p>
            <div className="grid gap-2 mt-6">
              <Button 
                variant="outline" 
                className="text-left justify-start" 
                onClick={() => sendMessage("What's a good substitute for butter in baking?")}
              >
                What's a good substitute for butter in baking?
              </Button>
              <Button 
                variant="outline" 
                className="text-left justify-start" 
                onClick={() => sendMessage("How do I make a pasta sauce from scratch?")}
              >
                How do I make a pasta sauce from scratch?
              </Button>
              <Button 
                variant="outline" 
                className="text-left justify-start" 
                onClick={() => sendMessage("What's the best way to cook a perfect steak?")}
              >
                What's the best way to cook a perfect steak?
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
        {isLoading && (
          <div className="flex justify-start mt-4">
            <div className="bg-muted rounded-lg p-3">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
          </div>
        )}
      </ScrollArea>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about recipes, cooking tips..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatBot;
