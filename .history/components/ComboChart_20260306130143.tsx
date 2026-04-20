import {
  Bar,
  BarChart,
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
} from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart"

const data = [
  { month: "Jan", sales: 4000, growth: 20 },
  { month: "Feb", sales: 3000, growth: 25 },
  { month: "Mar", sales: 5000, growth: 35 },
]

export function SalesChart() {
  return (
    <ChartContainer>
      <BarChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" />

        <Bar dataKey="sales" fill="#8884d8" />
        <Line type="monotone" dataKey="growth" stroke="#ff7300" />

        <ChartTooltip content={<ChartTooltipContent />} />
      </BarChart>
    </ChartContainer>
  )
}