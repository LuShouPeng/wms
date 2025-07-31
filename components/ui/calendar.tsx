import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from './utils';
import { Button } from './button';

interface CalendarProps {
  mode?: 'single' | 'multiple' | 'range';
  selected?: Date | Date[] | { from: Date; to: Date };
  onSelect?: (date: Date | Date[] | { from: Date; to: Date } | undefined) => void;
  className?: string;
  disabled?: (date: Date) => boolean;
  initialFocus?: boolean;
  locale?: any;
}

// Simple calendar component without react-day-picker dependency
export function Calendar({
  mode = 'single',
  selected,
  onSelect,
  className,
  disabled,
  ...props
}: CalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  
  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  
  const daysInMonth = lastDayOfMonth.getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  
  const days = [];
  
  // Previous month days
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    days.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
      isToday: false,
      date: new Date(year, month - 1, daysInPrevMonth - i)
    });
  }
  
  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    days.push({
      day,
      isCurrentMonth: true,
      isToday: date.toDateString() === today.toDateString(),
      date
    });
  }
  
  // Next month days to fill the grid
  const remainingDays = 42 - days.length;
  for (let day = 1; day <= remainingDays; day++) {
    days.push({
      day,
      isCurrentMonth: false,
      isToday: false,
      date: new Date(year, month + 1, day)
    });
  }
  
  const monthNames = [
    '1月', '2月', '3月', '4月', '5月', '6月',
    '7月', '8月', '9月', '10月', '11月', '12月'
  ];
  
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  
  const goToPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };
  
  const handleDayClick = (date: Date) => {
    if (disabled && disabled(date)) return;
    
    if (onSelect) {
      if (mode === 'single') {
        onSelect(date);
      }
    }
  };
  
  const isSelected = (date: Date) => {
    if (!selected) return false;
    
    if (mode === 'single' && selected instanceof Date) {
      return date.toDateString() === selected.toDateString();
    }
    
    return false;
  };
  
  return (
    <div className={cn('p-3 w-full', className)} {...props}>
      {/* Header */}
      <div className="flex justify-center items-center relative mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={goToPrevMonth}
          className="absolute left-0 h-7 w-7 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <div className="text-sm font-medium">
          {year}年{monthNames[month]}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={goToNextMonth}
          className="absolute right-0 h-7 w-7 p-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Week days header */}
      <div className="grid grid-cols-7 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-normal text-muted-foreground p-2"
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* Days grid */}
      <div className="grid grid-cols-7 gap-0">
        {days.map((dayObj, index) => {
          const isDisabled = disabled && disabled(dayObj.date);
          const selected = isSelected(dayObj.date);
          
          return (
            <Button
              key={index}
              variant={selected ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleDayClick(dayObj.date)}
              disabled={isDisabled}
              className={cn(
                'h-8 w-8 p-0 font-normal',
                !dayObj.isCurrentMonth && 'text-muted-foreground opacity-50',
                dayObj.isToday && !selected && 'bg-accent text-accent-foreground',
                selected && 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
                isDisabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              {dayObj.day}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export { Calendar };