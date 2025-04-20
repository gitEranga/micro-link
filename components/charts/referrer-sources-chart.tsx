"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "Google", value: 42 },
  { name: "Twitter", value: 28 },
  { name: "Facebook", value: 15 },
  { name: "Direct", value: 10 },
  { name: "Others", value: 5 },
]

export function ReferrerSourcesChart() {
  return (
    <ChartContainer
      config={{
        google: {
          label: "Google",
          color: "hsl(var(--chart-1))",
        },
        twitter: {
          label: "Twitter",
          color: "hsl(var(--chart-2))",
        },
        facebook: {
          label: "Facebook",
          color: "hsl(var(--chart-3))",
        },
        direct: {
          label: "Direct",
          color: "hsl(var(--chart-4))",
        },
        others: {
          label: "Others",
          color: "hsl(var(--chart-5))",
        },
      }}
      className="h-full w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`var(--color-${entry.name.toLowerCase()})`} />
            ))}
          </Pie>
          <ChartTooltip content={<ChartTooltipContent indicator="circle" />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: `var(--color-${entry.name.toLowerCase()})` }}
            />
            <span className="text-sm">
              {entry.name}: {entry.value}%
            </span>
          </div>
        ))}
      </div>
    </ChartContainer>
  )
}
