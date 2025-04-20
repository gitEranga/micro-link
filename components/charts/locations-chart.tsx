"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { country: "United States", clicks: 420 },
  { country: "United Kingdom", clicks: 240 },
  { country: "Germany", clicks: 180 },
  { country: "Canada", clicks: 150 },
  { country: "France", clicks: 120 },
  { country: "Australia", clicks: 90 },
  { country: "Japan", clicks: 45 },
]

export function LocationsChart() {
  return (
    <ChartContainer
      config={{
        clicks: {
          label: "Clicks",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-full w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 10,
            right: 10,
            left: 80,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
          <XAxis type="number" tickLine={false} axisLine={false} />
          <YAxis type="category" dataKey="country" tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent indicator="bar" />} />
          <Bar dataKey="clicks" fill="var(--color-clicks)" radius={[0, 4, 4, 0]} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
