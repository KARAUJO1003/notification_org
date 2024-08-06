'use client'
import { useState } from 'react'
import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Button, buttonVariants } from './ui/button'
import {
  ArrowUp,
  ChevronLeft,
  Earth,
  FolderTree,
  LucideIcon,
  Network,
} from 'lucide-react'
import clsx from 'clsx'
import { ScrollArea } from './ui/scroll-area'
import { PanelResizeHandle } from 'react-resizable-panels'
import { usePathname } from 'next/navigation'
import { DashboardIcon } from '@radix-ui/react-icons'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import Link from 'next/link'

interface INavItem {
  name: string
  icon: LucideIcon
  path: string
  group?: INavItem[]
}

export function SidebarResizable({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  const isActiveLink = (path: string) => pathname === path

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-screen w-full flex divide-x"
    >
      <ResizablePanel
        minSize={collapsed ? 3.5 : 14}
        maxSize={collapsed ? 3.5 : 14}
        defaultSize={collapsed ? 3.5 : 14}
        className="h-full relative transition-all duration-300"
      >
        <aside className="flex flex-col justify-between h-screen">
          <header className="flex px-2 border-b items-center w-full min-h-20">
            <Earth
              className={clsx(
                'size-8 text-emerald-500 mx-auto transition-all flex min-w-8 min-h-8 duration-700',
                {
                  '-translate-x-full opacity-0 invisible sr-only': !collapsed,
                },
              )}
            />
            <div
              className={clsx(
                'text-xl font-bold leading-8 flex line-clamp-1 text-nowrap text-ellipsis items-center gap-2 w-full transition-all duration-700',
                {
                  'translate-x-full opacity-0 invisible sr-only': collapsed,
                },
              )}
            >
              <Earth
                className={clsx(
                  'size-8 text-emerald-500 transition-all w-fit duration-700',
                )}
              />
              <span> Earth Code</span>
            </div>
          </header>
          <ScrollArea className="h-screen">
            <nav className="h-full w-full py-4 text-muted-foreground">
              <ul
                className={clsx('min-h-full px-2 mx-auto flex flex-col gap-2')}
              >
                <li className="flex items-center w-full gap-1 mx-auto">
                  <Link
                    href={'/'}
                    className={clsx(
                      'px-3 !justify-start  gap-2 w-full transition-all duration-300',
                      {
                        '!h-8': collapsed,
                        '!bg-muted text-foreground hover:text-foreground font-bold shadow-inner':
                          isActiveLink('/'),
                      },
                      buttonVariants({
                        size: collapsed ? 'icon' : 'sm',
                        variant: 'ghost',
                      }),
                    )}
                  >
                    <DashboardIcon className="min-w-4 min-h-4 size-4" />

                    <span
                      className={clsx({
                        'sr-only translate-x-full transition-all duration-500':
                          collapsed,
                      })}
                    >
                      Dashboard
                    </span>
                  </Link>
                </li>
                <li className="flex items-center w-full gap-1 mx-auto">
                  <Link
                    href={'/documents'}
                    className={clsx(
                      'px-3 !justify-start  gap-2 w-full transition-all duration-300',
                      {
                        '!h-8': collapsed,
                        '!bg-muted text-foreground hover:text-foreground font-bold shadow-inner':
                          isActiveLink('/documents'),
                      },

                      buttonVariants({
                        size: collapsed ? 'icon' : 'sm',
                        variant: 'ghost',
                      }),
                    )}
                  >
                    <FolderTree className="min-w-4 min-h-4 size-4" />

                    <span
                      className={clsx({
                        'sr-only translate-x-full transition-all duration-500':
                          collapsed,
                      })}
                    >
                      Documents
                    </span>
                  </Link>
                </li>
                <li className="flex items-center w-full gap-1 mx-auto">
                  <Link
                    href={'/organization'}
                    className={clsx(
                      'px-3 !justify-start  gap-2 w-full transition-all duration-300',
                      {
                        '!h-8': collapsed,
                        '!bg-muted text-foreground hover:text-foreground font-bold shadow-inner':
                          isActiveLink('/organization'),
                      },
                      buttonVariants({
                        size: collapsed ? 'icon' : 'sm',
                        variant: 'ghost',
                      }),
                    )}
                  >
                    <Network className="min-w-4 min-h-4 size-4" />

                    <span
                      className={clsx({
                        'sr-only translate-x-full transition-all duration-500':
                          collapsed,
                      })}
                    >
                      Organization
                    </span>
                  </Link>
                </li>
              </ul>
            </nav>
          </ScrollArea>
          <Card
            x-chunk="dashboard-02-chunk-0"
            className={clsx(
              [
                "mx-2 bg-card/20 overflow-clip transition-all duration-500 backdrop-blur-lg z-10 mb-4 relative before:content-[''] before:size-14 before:rounded-full before:blur-2xl before:bg-gradient-to-tr before:from-emerald-300/90 before:to-emerald-500/20 before:absolute before:-z-10 before:top-5 before:right-3",
              ],
              { 'translate-y-full opacity-0 sr-only': collapsed },
              { 'translate-y-0 opacity-1': !collapsed },
            )}
          >
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle className="text-nowrap line-clamp-1 text-ellipsis">
                Upgrade to Pro
              </CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button
                size="sm"
                className="w-full shadow-md font-bold text-black shadow-emerald-200/50 bg-emerald-300"
              >
                Upgrade <ArrowUp className="size-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </aside>
      </ResizablePanel>
      <PanelResizeHandle disabled className="relative">
        <Button
          variant={'outline'}
          className="ml-auto size-6 absolute top-[66px] right-0 translate-x-1/2 z-50"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronLeft
            className={clsx('size-4 transition-all duration-500 delay-100', {
              ['rotate-180']: collapsed,
            })}
          />
        </Button>
      </PanelResizeHandle>
      <ResizablePanel defaultSize={90} className="w-full">
        <ScrollArea className="h-screen min-w-full">{children}</ScrollArea>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
