import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "~/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { formatYAxisValue, pluralize } from "~/lib/myutils";

type chartProps = {
  chartHeading?: string;
  data?: { name: string; value: number }[];
  tooltipValue?: string;
};

const Chart = ({ chartHeading, data = [], tooltipValue }: chartProps) => {
  // const chartData = [
  //   { month: "January", desktop: 186 },
  //   { month: "February", desktop: 305 },
  //   { month: "March", desktop: 237 },
  //   { month: "April", desktop: 73 },
  //   { month: "May", desktop: 209 },
  //   { month: "June", desktop: 214 },
  // ];

  // const chartConfig = {
  //   desktop: {
  //     label: "Desktop",
  //     color: "#2563eb",
  //   },
  // } satisfies ChartConfig;

  return (
    <div className="w-full mx-auto">
      <div className="rounded-2xl bg-white p-6 shadow-md">
        {chartHeading && (
          <h3 className="mb-4 text-lg font-semibold text-slate-800">
            {chartHeading}
          </h3>
        )}

        <BarChart accessibilityLayer data={data}>
          <CartesianGrid
            strokeDasharray="4 4"
            strokeOpacity={0.9}
            vertical={false}
          />

          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
            tick={{ fontSize: 12 }}
          />

          <YAxis
            tickLine={false}
            axisLine={false}
            tickFormatter={formatYAxisValue}
            tick={{ fontSize: 12 }}
            width={40}
          />

          <ChartTooltip
            content={<ChartTooltipContent />}
            separator=" "
            formatter={(value) => {
              const count = value as number;
              const label = tooltipValue ? pluralize(count, tooltipValue) : "";
              return [`${count}`, label]; // value first, label second
            }}
            // formatter={(value) => [
            //   `${formatYAxisValue(value as number)} Trips`,
            // ]}
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              backgroundColor: "white",
              fontSize: "14px",
            }}
            labelStyle={{
              color: "#64748b",
              fontSize: "12px",
              fontWeight: 500,
            }}
            itemStyle={{
              color: "#2563eb",
              fontSize: "14px",
              fontWeight: 600,
            }}
          />

          <Bar dataKey="value" fill="#60a5fa" barSize={40} radius={8} />
        </BarChart>
      </div>
    </div>
  );
};

export default Chart;
