import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "~/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { formatYAxisValue } from "~/lib/myutils";

const Chart = ({ chartHeading }: { chartHeading?: string }) => {
  const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  return (
    <div className="w-full mx-auto">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {chartHeading && (
          <h3 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">
            {chartHeading}
          </h3>
        )}

        <ChartContainer config={chartConfig} className="h-50 w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid
              strokeDasharray="4 4"
              strokeOpacity={0.3}
              vertical={false}
            />

            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              tick={{ fontSize: 12 }}
            />

            <YAxis
              dataKey="desktop"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={formatYAxisValue}
              tick={{ fontSize: 12 }}
              width={40}
            />

            <ChartTooltip
              content={<ChartTooltipContent />}
              formatter={(value) => formatYAxisValue(value as number)}
            />

            <Bar
              dataKey="desktop"
              fill="var(--color-desktop)"
              barSize={40}
              radius={8}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default Chart;