'use client'
import { Bar, BarChart, Rectangle, XAxis } from 'recharts'
import { ChartContainer } from '@/components//ui/chart'
export const ChartDemo02 = () => {
  return (
    <ChartContainer
      config={{
        steps: {
          label: 'Steps',
          color: 'hsl(var(--chart-2))',
        },
      }}
      className="ml-auto w-[72px]"
    >
      <BarChart
        accessibilityLayer
        margin={{
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
        data={[
          {
            date: '2024-01-01',
            steps: 2000,
          },
          {
            date: '2024-01-02',
            steps: 2100,
          },
          {
            date: '2024-01-03',
            steps: 2200,
          },
          {
            date: '2024-01-04',
            steps: 1300,
          },
          {
            date: '2024-01-05',
            steps: 1400,
          },
          {
            date: '2024-01-06',
            steps: 2500,
          },
          {
            date: '2024-01-07',
            steps: 1600,
          },
        ]}
      >
        <Bar
          dataKey="steps"
          fill="var(--color-steps)"
          radius={2}
          fillOpacity={0.2}
          activeIndex={6}
          activeBar={<Rectangle fillOpacity={0.8} />}
        />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={4}
          hide
        />
      </BarChart>
    </ChartContainer>
  )
}
