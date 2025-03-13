
import { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import ChatBot from './ChatBot';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                onClick={() => setIsOpen(true)} 
                className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90"
                aria-label="Chat with Recipe Assistant"
              >
                <MessageSquare className="h-6 w-6 text-white" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Chat with Recipe Assistant</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px] p-0 h-[600px] max-h-[80vh]">
          <div className="h-full flex flex-col">
            <ChatBot isPopup={true} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatButton;
