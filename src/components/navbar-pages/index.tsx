'use client'
import { useShowNavBar } from './useShowNavbar'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { Bell, LogOut, PanelTopClose, PanelTopOpen } from 'lucide-react'
import { ReactNode } from 'react'
import { Button } from '../ui/button'
import clsx from 'clsx'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Card, CardHeader } from '../ui/card'
import { NotificationCard } from '../notification'
import { ScrollArea } from '../ui/scroll-area'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'
import { Badge } from '../ui/badge'
import { Switch } from '../ui/switch'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'

const ContextMenuHeader = ({ children }: { children: ReactNode }) => {
  const { setShowNavBar, showNavBar } = useShowNavBar()

  return (
    <ContextMenu>
      <ContextMenuTrigger
        className={clsx({
          '-translate-y-full opacity-0 !min-h-0 overflow-hidden  transition-all duration-500':
            !showNavBar,
        })}
      >
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => setShowNavBar(!showNavBar)}>
          <PanelTopClose className="size-4 mr-2" />
          Esconder Header
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export const NavBarHeaderPages = () => {
  const { setShowNavBar, showNavBar } = useShowNavBar()
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  return (
    <>
      <ContextMenuHeader>
        <header
          className={clsx(
            'flex z-10 sticky shadow-md transition-all mb-4 delay-100 duration-500 top-4 min-h-12 mx-8 rounded-lg border bg-muted/20  items-center justify-between px-4 backdrop-blur-lg',
            { ['-translate-y-0 opacity-1 ']: showNavBar },
            {
              ['-translate-y-full opacity-0 w-[95%] min-h-0 overflow-hidden hidden sr-only']:
                !showNavBar,
            },
          )}
        >
          <div className="flex items-center gap-4 h-full">
            <h1 className=" font-bold capitalize text-sm text-muted-foreground">
              {pathname === '/' ? 'Dashboard' : pathname.replace('/', '')}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-foreground">John Doe</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  {' '}
                  <Avatar className="size-6">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback className="text-xs">CN</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Logout
                  <LogOut className="size-4 ml-auto" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Separator orientation="vertical" className="w-0.5 h-8" />
            <Switch
              onCheckedChange={() =>
                theme === 'dark' ? setTheme('light') : setTheme('dark')
              }
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="ml-auto h-8 w-8 relative"
                >
                  <Bell className="h-4 w-4" />
                  <span className="sr-only">Toggle notifications</span>
                  <Badge className="bg-emerald-500 absolute -top-1 -right-1 flex items-center justify-center text-[0.425rem] rounded-full p-1.5 max-h-1 max-w-1 text-background">
                    3
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" asChild>
                <Card className="pb-4 bg-background/60 backdrop-blur-lg">
                  <CardHeader className="border-b">
                    <Input placeholder="Search..." />
                  </CardHeader>
                  <ScrollArea className="h-96">
                    <NotificationCard />
                    <NotificationCard />
                    <NotificationCard />
                    <NotificationCard />
                    <NotificationCard />
                    <NotificationCard />
                  </ScrollArea>
                </Card>
              </DropdownMenuContent>
            </DropdownMenu>

            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    className={clsx(' size-8')}
                    onClick={() => setShowNavBar(!showNavBar)}
                  >
                    <PanelTopClose className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent align="end">Esconder header</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </header>
      </ContextMenuHeader>
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className={clsx('fixed top-4 right-8 z-10 size-8', {
                'opacity-0 sr-only delay-200': showNavBar,
              })}
              onClick={() => setShowNavBar(!showNavBar)}
            >
              <PanelTopOpen className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent align="end">Mostrar header</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  )
}
