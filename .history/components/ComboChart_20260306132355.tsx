import { Bar, BarChart, Line, LineChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "~/components/ui/chart";

const data = [
  { month: "Jan", sales: 4000, growth: 20 },
  { month: "Feb", sales: 3000, growth: 25 },
  { month: "Mar", sales: 5000, growth: 35 },
  { month: "Apr", sales: 4000, growth: 30 },
  { month: "May", sales: 6000, growth: 40 },
  { month: "Jun", sales: 7000, growth: 45 },
];

const chartConfig = {
  sales: {
    label: "Sales",
    color: "#0000000",
  },
  growth: {
    label: "Growth",
    color: "#00000",
  },
} satisfies ChartConfig;

export function ComboChart() {
  return (
    <ChartContainer config={chartConfig} className="bg-white rounded-lg shadow-md p-4 min-h-50 w-full">
      <BarChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)} />

        <Bar dataKey="sales" fill="#8884d8" radius={6}/>
        <Line type="monotone" dataKey="growth" stroke="#ff7300" radius={6} />

        <ChartTooltip content={<ChartTooltipContent />} />
      </BarChart>
    </ChartContainer>
  );
}

export default ComboChart;



