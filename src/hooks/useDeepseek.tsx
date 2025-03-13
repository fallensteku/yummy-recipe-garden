
import { useState } from 'react';
import { toast } from 'sonner';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface DeepseekResponse {
  choices: {
    message: {
      role: string;
      content: string;
    };
  }[];
}

export const useDeepseek = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;
    
    // Add user message to chat
    const userMessage: Message = { role: 'user', content: message };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Prepare conversation history for the API
      const conversationHistory = [
        { 
          role: 'system', 
          content: 'You are a helpful cooking assistant. You can answer questions about recipes, cooking techniques, ingredient substitutions, and other food-related topics. Keep responses concise and helpful. If asked about specific recipes, try to suggest similar recipes from the website.'
        },
        ...messages,
        userMessage
      ];

      // Call DeepSeek API
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY || ''}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: conversationHistory,
          temperature: 0.7,
          max_tokens: 500
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'API request failed');
      }

      const responseData: DeepseekResponse = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: responseData.choices[0].message.content
      };

      // Add assistant message to chat
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling DeepSeek API:', error);
      toast.error('Failed to get a response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages
  };
};
