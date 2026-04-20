import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "~/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const Chart = () => {
  return (
    <div>
      <ChartContainer config={{}}>
        <BarChart data={[]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <ChartTooltip content={<ChartTooltipContent />} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

export default Chart
