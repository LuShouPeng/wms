import React from 'react';
import { cn } from './utils';

interface PopoverProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface PopoverContentProps {
  children: React.ReactNode;
  className?: string;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'bottom' | 'left' | 'right';
  sideOffset?: number;
}

interface PopoverTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

// Simple popover context
const PopoverContext = React.createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}>({
  open: false,
  onOpenChange: () => {},
});

function Popover({ children, open = false, onOpenChange = () => {}, ...props }: PopoverProps) {
  return (
    <PopoverContext.Provider value={{ open, onOpenChange }}>
      <div className="relative inline-block" {...props}>
        {children}
      </div>
    </PopoverContext.Provider>
  );
}

function PopoverTrigger({ children, asChild = false, ...props }: PopoverTriggerProps) {
  const { open, onOpenChange } = React.useContext(PopoverContext);
  
  const handleClick = () => {
    onOpenChange(!open);
  };
  
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      onClick: handleClick,
    });
  }
  
  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
}

function PopoverContent({ 
  children, 
  className, 
  align = 'center',
  side = 'bottom',
  sideOffset = 4,
  ...props 
}: PopoverContentProps) {
  const { open, onOpenChange } = React.useContext(PopoverContext);
  const contentRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
        onOpenChange(false);
      }
    };
    
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [open, onOpenChange]);
  
  if (!open) return null;
  
  // Simple positioning based on side and align
  const getPositionClasses = () => {
    const positions = {
      top: 'bottom-full mb-2',
      bottom: 'top-full mt-2',
      left: 'right-full mr-2',
      right: 'left-full ml-2',
    };
    
    const alignments = {
      start: side === 'top' || side === 'bottom' ? 'left-0' : 'top-0',
      center: side === 'top' || side === 'bottom' ? 'left-1/2 -translate-x-1/2' : 'top-1/2 -translate-y-1/2',
      end: side === 'top' || side === 'bottom' ? 'right-0' : 'bottom-0',
    };
    
    return `${positions[side]} ${alignments[align]}`;
  };
  
  return (
    <div
      ref={contentRef}
      className={cn(
        'absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-4 text-popover-foreground shadow-md',
        'animate-in fade-in-0 zoom-in-95',
        getPositionClasses(),
        className
      )}
      style={{ marginTop: side === 'bottom' ? sideOffset : undefined }}
      {...props}
    >
      {children}
    </div>
  );
}

function PopoverAnchor({ children, ...props }: { children: React.ReactNode }) {
  return <div {...props}>{children}</div>;
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };