import React from 'react';
import { SearchIcon } from 'lucide-react';
import { cn } from './utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './dialog';

// Simple command components without cmdk dependency
interface CommandProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface CommandDialogProps extends React.ComponentProps<typeof Dialog> {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

interface CommandInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

interface CommandListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface CommandEmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface CommandGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  heading?: string;
  children: React.ReactNode;
}

interface CommandItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
}

function Command({ className, children, ...props }: CommandProps) {
  return (
    <div
      className={cn(
        'bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function CommandDialog({
  title = 'Command Palette',
  description = 'Search for a command to run...',
  children,
  ...props
}: CommandDialogProps) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent className="overflow-hidden p-0">
        <Command>
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
}

function CommandInput({ className, ...props }: CommandInputProps) {
  return (
    <div className="flex h-9 items-center gap-2 border-b px-3">
      <SearchIcon className="size-4 shrink-0 opacity-50" />
      <input
        className={cn(
          'placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    </div>
  );
}

function CommandList({ className, children, ...props }: CommandListProps) {
  return (
    <div
      className={cn(
        'max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function CommandEmpty({ children, ...props }: CommandEmptyProps) {
  return (
    <div className="py-6 text-center text-sm" {...props}>
      {children}
    </div>
  );
}

function CommandGroup({ className, heading, children, ...props }: CommandGroupProps) {
  return (
    <div
      className={cn(
        'text-foreground overflow-hidden p-1',
        className
      )}
      {...props}
    >
      {heading && (
        <div className="text-muted-foreground px-2 py-1.5 text-xs font-medium">
          {heading}
        </div>
      )}
      {children}
    </div>
  );
}

function CommandSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('bg-border -mx-1 h-px', className)}
      {...props}
    />
  );
}

function CommandItem({ 
  className, 
  children, 
  onSelect, 
  disabled, 
  ...props 
}: CommandItemProps) {
  const handleClick = () => {
    if (!disabled && onSelect) {
      onSelect();
    }
  };

  return (
    <div
      className={cn(
        'hover:bg-accent hover:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none',
        disabled && 'pointer-events-none opacity-50',
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </div>
  );
}

function CommandShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'text-muted-foreground ml-auto text-xs tracking-widest',
        className
      )}
      {...props}
    />
  );
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};