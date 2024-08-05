import { DataTableDemo } from '@/components/data-table-demo'
import { ChartDemo02 } from './components/charts/chart-02'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components//ui/card'

export default function Organization() {
  return (
    <main className=" flex flex-col min-h-screen px-8 py-4">
      <div className="flex items-center gap-2 justify-between">
        <Card
          className="flex flex-col justify-around bg-muted/20"
          x-chunk="charts-01-chunk-3"
        >
          <CardHeader className="p-4 pb-0">
            <CardTitle>Active Energy</CardTitle>
            <CardDescription>
              Over the last 7 days, your distance walked and run was 12.5 miles
              per day.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-0">
            <div className="flex items-baseline gap-1 text-3xl font-bold tabular-nums leading-none">
              12.5
              <span className="text-sm font-normal text-muted-foreground">
                miles/day
              </span>
            </div>
            <ChartDemo02 />
          </CardContent>
        </Card>
        <Card
          className="flex flex-col justify-around bg-muted/20"
          x-chunk="charts-01-chunk-3"
        >
          <CardHeader className="p-4 pb-0">
            <CardTitle>Walking Distance</CardTitle>
            <CardDescription>
              Over the last 7 days, your distance walked and run was 12.5 miles
              per day.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-0">
            <div className="flex items-baseline gap-1 text-3xl font-bold tabular-nums leading-none">
              16.1
              <span className="text-sm font-normal text-muted-foreground">
                miles/day
              </span>
            </div>
            <ChartDemo02 />
          </CardContent>
        </Card>
        <Card
          className="flex flex-col justify-around bg-muted/20"
          x-chunk="charts-01-chunk-3"
        >
          <CardHeader className="p-4 pb-0">
            <CardTitle>Progress</CardTitle>
            <CardDescription>
              Over the last 7 days, your distance walked and run was 12.5 miles
              per day.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-0">
            <div className="flex items-baseline gap-1 text-3xl font-bold tabular-nums leading-none">
              9.3
              <span className="text-sm font-normal text-muted-foreground">
                miles/day
              </span>
            </div>
            <ChartDemo02 />
          </CardContent>
        </Card>
      </div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-foreground mt-8">
          Welcome back!
        </h2>
        <p className="text-muted-foreground mt-2">
          This is a demo of a data table using the DataTable component.
        </p>
      </div>
      <DataTableDemo />
    </main>
  )
}
