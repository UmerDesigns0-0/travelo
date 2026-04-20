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

type ComboChartProps = {
  chartHeading?: string;
  data?: { name: string; value: number }[];
  tooltipValue?: string;
  className?: string;
  isLoading?: boolean;
};

const ComboChart = ({
  chartHeading,
  data,
  tooltipValue,
  className,
  isLoading,
}: ComboChartProps) => {
  const sampleData = [
    { name: "January 25", value: 1000 },
    { name: "February 28", value: 1288 },
    { name: "March 4", value: 800 },
    { name: "April 8", value: 900 },
    { name: "May 13", value: 1400 },
    { name: "June 17", value: 1200 },
    { name: "July 21", value: 1600 },
    { name: "August 24", value: 1100 },
  ];

  const formatedData = sampleData.slice(0, 6);

  const DynamicBar = (props: any) => {
    const { x, y, width, height, value, data } = props;

    const maxValue = Math.max(...(data ?? []).map((d: any) => d.value));
    const ratio = value / maxValue;

    const segments = ratio > 0.75 ? 4 : ratio > 0.5 ? 3 : ratio > 0.25 ? 2 : 1;
    // const colors = ["#bfdbfe", "#93c5fd", "#60a5fa", "#3b82f6"];
    const colors = ["#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"];
    const segHeight = height / segments;
    const r = 8;

    const topColor = colors[4 - segments]; // lightest visible color (top segment)
    const bottomColor = colors[3]; // always darkest (bottom segment)

    return (
      <g>
        {/* Clip to rounded rect so segments don't overflow */}
        <clipPath id={`bar-clip-${x}`}>
          <rect x={x} y={y} width={width} height={height} rx={r} ry={r} />
        </clipPath>

        <g clipPath={`url(#bar-clip-${x})`}>
          {Array.from({ length: segments }).map((_, i) => (
            <rect
              key={i}
              x={x}
              y={y + i * segHeight}
              width={width}
              height={segHeight + 1}
              fill={colors[4 - segments + i]}
            />
          ))}
        </g>
      </g>
    );
  };

if (isLoading) {
  return (
    <div className="w-full mx-auto">
      <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-slate-900">
        {chartHeading && (
          <h3 className="mb-4 text-lg font-semibold text-slate-800">
            {chartHeading}
          </h3>
        )}

        {/* Skeleton bars container */}
        <div
          className={`${className} h-54 flex items-end justify-between gap-2 p-4`}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 bg-slate-300 rounded-sm animate-pulse overflow-hidden"
              style={{
                height: `${30 + Math.random() * 80}%`, // staggered heights for realism
                width: 1
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

  return (
    <div className="w-full mx-auto">
      <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-slate-900">
        {chartHeading && (
          <h3 className="mb-4 text-lg font-semibold text-slate-800">
            {chartHeading}
          </h3>
        )}

        <div className={`${className}`}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={formatedData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                {/* gradient for line shadow area */}
                <linearGradient
                  id="lineShadowGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#93c5fd" stopOpacity={0.75} />
                  <stop offset="40%" stopColor="#bfdbfe" stopOpacity={0.65} />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity={0.5} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="4 4"
                strokeOpacity={0.5}
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
                cursor={{ stroke: "none" }}
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
                // fill="url(#barGradient)"
                radius={8}
                shape={(props: any) => (
                  <DynamicBar {...props} data={formatedData} />
                )}
              />

              <Area
                type="monotone"
                dataKey="value"
                stroke="none"
                fill="url(#lineShadowGradient)"
                // filter="url(#softBlur)"
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
