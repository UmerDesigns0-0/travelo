import {
  ComposedChart,
  Line,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatYAxisValue, pluralize } from "~/lib/myutils";

type comboChartProps = {
  chartHeading?: string;
  data?: { name: string; value: number }[];
  tooltipValue?: string;
};

const ComboChart = ({ chartHeading, data, tooltipValue }: comboChartProps) => {
  const sampleData = [
    { name: "January 25", value: 1000 },
    { name: "February 28", value: 1288 },
    { name: "March 4", value: 800 },
    { name: "April 8", value: 400 },
    { name: "May 13", value: 1400 },
    { name: "June 17", value: 1200 },
    { name: "July 21", value: 1600 },
    { name: "August 24", value: 1100 },
  ];

  const formatedData = sampleData.slice(0, 6);

  return (
    <div className="w-full mx-auto">
      <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-slate-900">
        {chartHeading && (
          <h3 className="mb-4 text-lg font-semibold text-slate-800">
            {chartHeading}
          </h3>
        )}

        <div className="h-50 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={sampleData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                {/* gradient for bars */}
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="25%" stopColor="#3b82f6" />

                  <stop offset="25%" stopColor="#60a5fa" />
                  <stop offset="50%" stopColor="#60a5fa" />

                  <stop offset="50%" stopColor="#93c5fd" />
                  <stop offset="75%" stopColor="#93c5fd" />

                  <stop offset="75%" stopColor="#bfdbfe" />
                  <stop offset="100%" stopColor="#bfdbfe" />
                </linearGradient>

                {/* gradient for line shadow area */}
                <linearGradient
                  id="lineShadowGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  {/* near line */}
                  <stop offset="0%" stopColor="#a9d0fc" stopOpacity={5} />

                  {/* middle */}
                  <stop offset="50%" stopColor="#d4e6fa" stopOpacity={3} />

                  {/* bottom */}
                  <stop offset="100%" stopColor="#f5f8fc" stopOpacity={2} />
                </linearGradient>

                {/* blur for the area */}
                <filter id="softBlur" x="0%" y="0%" width="100%" height="140%">
                  <feOffset result="offOut" in="SourceGraphic" dx="0" dy="10" />
                  <feGaussianBlur stdDeviation="10" />
                </filter>
              </defs>
              <CartesianGrid
                strokeDasharray="4 4"
                strokeOpacity={0.3}
                vertical={false}
              />

              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />

              <YAxis
                width={40}
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={formatYAxisValue}
              />

              <Tooltip
                separator=" "
                // formatter={(value) => {
                //   const count = value as number;
                //   const label = tooltipValue
                //     ? pluralize(count, tooltipValue)
                //     : "";

                //   return [label, formatYAxisValue(count)];
                // }}
                formatter={(value) => [
                  `${formatYAxisValue(value as number)} Users`,
                ]}
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
              <Bar
                dataKey="value"
                barSize={40}
                fill="url(#barGradient)"
                radius={8}
              />

              <Area
                type="monotone"
                dataKey="value"
                stroke="none"
                fill="url(#lineShadowGradient)"
                filter="url(#softBlur)"
                baseValue="dataMin"
                tooltipType="none"
              />

              <Line
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2, fill: "white" }}
                activeDot={{ r: 7 }}
                tooltipType="none"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ComboChart;
