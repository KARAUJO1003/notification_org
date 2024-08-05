import { ComponentProps } from 'react'
import { cn } from '@/lib/utils'
import { Badge } from './ui/badge'

export function NotificationCard() {
  return (
    <div className="flex flex-col gap-2 p-4 max-w-sm">
      <button
        className={cn(
          'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all bg-background/60 backdrop-blur-lg hover:bg-accent',
        )}
      >
        <div className="flex w-full flex-col gap-1 ">
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <div className="font-semibold">John Doe</div>
              <span className="flex h-2 w-2 rounded-full bg-blue-600" />
            </div>
            <div className={cn('ml-auto text-xs')}>10 months ago</div>
          </div>
          <div className="text-xs font-medium">Meeting Tomorrow</div>
        </div>
        <div className="line-clamp-2 text-xs text-muted-foreground">
          Hi, let&apos;s have a meeting tomorrow to discuss the project.
          I&apos;ve been reviewing the project details and have some ideas
          I&apos;d like to share.
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={getBadgeVariantFromLabel('meeting')}>meeting</Badge>
          <Badge variant={getBadgeVariantFromLabel('work')}>work</Badge>
          <Badge variant={getBadgeVariantFromLabel('personal')}>personal</Badge>
        </div>
      </button>
    </div>
  )
}

function getBadgeVariantFromLabel(
  label: string,
): ComponentProps<typeof Badge>['variant'] {
  if (['work'].includes(label.toLowerCase())) {
    return 'default'
  }

  if (['personal'].includes(label.toLowerCase())) {
    return 'outline'
  }

  return 'secondary'
}
