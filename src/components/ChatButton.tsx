
import { MessagesSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const ChatButton = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to="/chat">
            <Button variant="ghost" size="icon" className="relative">
              <MessagesSquare className="h-5 w-5" />
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>Chat with Recipe Assistant</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ChatButton;
