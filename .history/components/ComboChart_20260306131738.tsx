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
    color: "#8884d8",
  },
  growth: {
    label: "Growth",
    color: "#ff7300",
  },
} satisfies ChartConfig;

export function ComboChart() {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" />

        <Bar dataKey="sales" fill="#8884d8" radius={6}/>
        <Line type="monotone" dataKey="growth" stroke="#ff7300" radius={6} />

        <ChartTooltip content={<ChartTooltipContent />} />
      </BarChart>
    </ChartContainer>
  );
}

export default ComboChart;


const CustomBar = (props: any) => {
  const { x, y, width, height, fill } = props

  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={fill} />
      
      {/* cap line */}
      <line
        x1={x}
        x2={x + width}
        y1={y}
        y2={y}
        stroke="black"
        strokeWidth={2}
      />
    </g>
  )
}
