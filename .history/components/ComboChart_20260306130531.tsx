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
  type ChartConfig,
} from "~/components/ui/chart"

const data = [
  { month: "Jan", sales: 4000, growth: 20 },
  { month: "Feb", sales: 3000, growth: 25 },
  { month: "Mar", sales: 5000, growth: 35 },
]

const chartConfig = {
  sales: {
    label: "Sales",
    color: "#8884d8",
  },
  growth: {
    label: "Growth",
    color: "#ff7300",
  },
} satisfies ChartConfig

export function SalesChart() {
  return (
    <ChartContainer config={chartConfig}>
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

export default SalesChart