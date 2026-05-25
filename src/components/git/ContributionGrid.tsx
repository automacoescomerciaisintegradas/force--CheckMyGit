import React from 'react';
import { generateContributionData } from '@shared/mock-data';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
const LEVEL_COLORS = {
  0: 'bg-muted dark:bg-zinc-800',
  1: 'bg-blue-200 dark:bg-blue-900',
  2: 'bg-blue-400 dark:bg-blue-700',
  3: 'bg-blue-600 dark:bg-blue-500',
  4: 'bg-blue-800 dark:bg-blue-300',
};
export function ContributionGrid() {
  const data = React.useMemo(() => generateContributionData(), []);
  // Group into weeks
  const weeks = [];
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }
  const dayLabels = ['Mon', '', 'Wed', '', 'Fri', '', ''];
  return (
    <div className="space-y-4">
      <TooltipProvider delayDuration={0}>
        <ScrollArea className="w-full pb-4">
          <div className="flex gap-1.5 p-1 min-w-max">
            <div className="flex flex-col gap-1.5 mr-2 pt-6">
              {dayLabels.map((label, i) => (
                <span key={i} className="text-[10px] text-muted-foreground h-3 leading-3">{label}</span>
              ))}
            </div>
            {weeks.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-1.5">
                {wIdx % 4 === 0 && (
                  <span className="text-[10px] text-muted-foreground h-4 mb-0.5">
                    {new Date(week[0].date).toLocaleString('default', { month: 'short' })}
                  </span>
                )}
                {wIdx % 4 !== 0 && <span className="h-4 mb-0.5" />}
                {week.map((day, dIdx) => (
                  <Tooltip key={day.date}>
                    <TooltipTrigger asChild>
                      <div
                        className={cn(
                          "w-3 h-3 rounded-sm transition-colors",
                          LEVEL_COLORS[day.level]
                        )}
                      />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="text-xs p-2">
                      <span className="font-semibold">{day.count} contributions</span> on {new Date(day.date).toLocaleDateString()}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </TooltipProvider>
      <div className="flex items-center gap-2 text-[10px] text-muted-foreground justify-end">
        <span>Less</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map(l => (
            <div key={l} className={cn("w-3 h-3 rounded-sm", LEVEL_COLORS[l as keyof typeof LEVEL_COLORS])} />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
}